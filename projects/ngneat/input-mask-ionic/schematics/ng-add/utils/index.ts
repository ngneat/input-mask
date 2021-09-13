import * as ts from 'typescript';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import { Change, InsertChange } from '@schematics/angular/utility/change';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { getProjectMainFile } from './project-main-file';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import {
  WorkspaceProject,
  WorkspaceSchema,
} from '@schematics/angular/utility/workspace-models';
import { parse } from 'jsonc-parser';

export const installPackageJsonDependencies = (): Rule => (
  host: Tree,
  context: SchematicContext
) => {
  context.addTask(new NodePackageInstallTask());
  context.logger.log('info', `🔍 Installing packages...`);

  return host;
};

export const getProjectFromWorkspace = (
  workspace: WorkspaceSchema,
  projectName?: string
): WorkspaceProject => {
  const finalProjectName = projectName || workspace.defaultProject;
  if (finalProjectName) {
    const project = workspace.projects[finalProjectName];
    return project;
  } else {
    throw new Error(`Could not find project in workspace: ${projectName}`);
  }
};

export const getProjectTargetOptions = (
  project: WorkspaceProject,
  buildTarget: string
): Record<string, any> => {
  const targetConfig =
    (project.architect && project.architect[buildTarget]) ||
    (project.targets && project.targets[buildTarget]);

  if (targetConfig && targetConfig.options) {
    return targetConfig.options;
  }

  throw new Error(
    `Cannot determine project target configuration for: ${buildTarget}.`
  );
};

const sortObjectByKeys = (obj: {
  [key: string]: string;
}): Record<string, any> =>
  Object.keys(obj)
    .sort()
    .reduce((result: any, key: any) => (result[key] = obj[key]) && result, {});

export const addPackageToPackageJson = (
  host: Tree,
  pkg: string,
  version: string,
  type: 'dependencies' | 'devDependencies' = 'dependencies'
): Tree => {
  if (host.exists('package.json')) {
    const buff = host.read('package.json');
    if (buff) {
      const sourceText = buff.toString('utf-8');
      const json = JSON.parse(sourceText);

      if (!json.devDependencies) {
        json.devDependencies = {};
      }

      if (!json[type][pkg]) {
        json[type][pkg] = version;
        json[type] = sortObjectByKeys(json[type]);
      }

      host.overwrite('package.json', JSON.stringify(json, null, 2));
    }
  }

  return host;
};

export const addModuleImportToRootModule = (
  host: Tree,
  moduleName: string,
  src: string,
  project: WorkspaceProject
): void => {
  const modulePath = getAppModulePath(host, getProjectMainFile(project));
  addModuleImportToModule(host, modulePath, moduleName, src);
};

export const addModuleImportToModule = (
  host: Tree,
  modulePath: string,
  moduleName: string,
  src: string
): void => {
  const moduleSource = getSourceFile(host, modulePath);

  if (!moduleSource) {
    throw new SchematicsException(`Module not found: ${modulePath}`);
  }

  const changes: Change[] = addImportToModule(
    moduleSource,
    modulePath,
    moduleName,
    src
  );
  const recorder = host.beginUpdate(modulePath);

  changes.forEach((change: Change) => {
    if (change instanceof InsertChange) {
      recorder.insertLeft(change.pos, change.toAdd);
    }
  });

  host.commitUpdate(recorder);
};

export const getSourceFile = (host: Tree, path: string): ts.SourceFile => {
  const buffer = host.read(path);
  if (!buffer) {
    throw new SchematicsException(`Could not find file for path: ${path}`);
  }
  const content = buffer.toString();

  return ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);
};

export const getWorkspacePath = (host: Tree): string => {
  const possibleFiles = ['/angular.json', '/.angular.json'];
  const path = possibleFiles.filter((filePath) => host.exists(filePath))[0];
  return path;
};

export const getWorkspace = (host: Tree) => {
  const path = getWorkspacePath(host);
  const configBuffer = host.read(path);
  if (configBuffer === null) {
    throw new SchematicsException(`Could not find (${path})`);
  }
  const content = configBuffer.toString();
  return parse(content);
};
