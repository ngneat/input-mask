import {
  Rule,
  SchematicContext,
  Tree,
  SchematicsException,
  chain,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import {
  insertImport,
  isImported,
} from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';

import { Schema } from './schema';
import {
  addModuleImportToRootModule,
  addPackageToPackageJson,
  getProjectFromWorkspace,
  getSourceFile,
  getWorkspace,
} from './utils';
import { targetBuildNotFoundError } from './utils/project-targets';
import { hasNgModuleImport } from './utils/ng-module-imports';

const importModuleSet: {
  moduleName: string;
  importModuleStatement: string;
  importPath: string;
}[] = [
  {
    moduleName: 'InputMaskModule',
    importModuleStatement: 'InputMaskModule',
    importPath: '@ngneat/input-mask-ionic',
  },
];

export const ngAdd = (options: Schema): Rule => (tree: Tree) => {
  const workspaceConfig = tree.read('/angular.json');
  if (!workspaceConfig) {
    throw new SchematicsException(
      'Could not find Angular workspace configuration'
    );
  }
  return chain([
    addPackageJsonDependencies(),
    installPackageJsonDependencies(),
    injectImports(options),
    addModuleToImports(options),
  ]);
};

const addPackageJsonDependencies = (): Rule => (
  host: Tree,
  context: SchematicContext
) => {
  const dependencies: { name: string; version: string }[] = [
    { name: 'inputmask', version: '5.0.5' },
  ];

  dependencies.forEach((dependency) => {
    addPackageToPackageJson(host, dependency.name, `${dependency.version}`);
    context.logger.log('info', `✅️ Added "${dependency.name}`);
  });
  const devDependencies: { name: string; version: string }[] = [
    { name: '@types/inputmask', version: '5.0.0' },
  ];

  devDependencies.forEach((dependency) => {
    addPackageToPackageJson(
      host,
      dependency.name,
      `${dependency.version}`,
      'devDependencies'
    );
    context.logger.log('info', `✅️ Added "${dependency.name}`);
  });

  return host;
};

const installPackageJsonDependencies = (): Rule => (
  host: Tree,
  context: SchematicContext
) => {
  context.addTask(new NodePackageInstallTask());
  context.logger.log('info', `🔍 Installing packages...`);

  return host;
};

const injectImports = (options: Schema): Rule => (
  host: Tree,
  context: SchematicContext
) => {
  if (!options.skipImport) {
    const workspace = getWorkspace(host) as any;
    const project = getProjectFromWorkspace(
      workspace,
      options.project ? options.project : Object.keys(workspace.projects)[0]
    );

    if (!project || project.projectType !== 'application') {
      throw new SchematicsException(
        `A client project type of "application" is required.`
      );
    }

    if (
      !project.architect ||
      !project.architect.build ||
      !project.architect.build.options ||
      !project.architect.build.options.main
    ) {
      throw targetBuildNotFoundError();
    }

    const modulePath = getAppModulePath(
      host,
      project.architect.build.options.main
    );
    const moduleSource = getSourceFile(host, modulePath);

    importModuleSet.forEach((item) => {
      if (isImported(moduleSource, item.moduleName, item.importPath)) {
        context.logger.warn(
          `Could not import "${item.moduleName}" because it's already imported.`
        );
      } else {
        const change = insertImport(
          moduleSource,
          modulePath,
          item.moduleName,
          item.importPath
        );

        if (change) {
          const recorder = host.beginUpdate(modulePath);
          recorder.insertLeft(
            (change as InsertChange).pos,
            (change as InsertChange).toAdd
          );
          host.commitUpdate(recorder);
          context.logger.log(
            'info',
            '✅ Written import statement for "' + item.moduleName + '"'
          );
        }
      }
    });
    return host;
  }
};

const addModuleToImports = (options: Schema): Rule => (
  host: Tree,
  context: SchematicContext
) => {
  if (!options.skipImport) {
    const workspace = getWorkspace(host) as any;
    const project = getProjectFromWorkspace(
      workspace,
      options.project ? options.project : Object.keys(workspace.projects)[0]
    );

    if (!project || project.projectType !== 'application') {
      throw new SchematicsException(
        `A client project type of "application" is required.`
      );
    }
    if (!project.architect) {
      throw new SchematicsException(
        `Architect options not present for project.`
      );
    }
    if (!project.architect.build) {
      throw new SchematicsException(
        `Architect:Build options not present for project.`
      );
    }

    const modulePath = getAppModulePath(
      host,
      project.architect.build.options.main
    );

    importModuleSet.forEach((item) => {
      if (hasNgModuleImport(host, modulePath, item.moduleName)) {
        context.logger.warn(
          `Could not set up "${item.moduleName}" in "imports[]" because it's already imported.`
        );
      } else {
        addModuleImportToRootModule(
          host,
          item.importModuleStatement,
          null as any,
          project
        );
        context.logger.log(
          'info',
          '✅ Imported "' + item.moduleName + '" in imports'
        );
      }
    });
  }

  return host;
};
