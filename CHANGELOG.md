## [4.1.1](https://github.com/ngneat/input-mask/compare/v4.1.0...v4.1.1) (2022-03-12)


### Bug Fixes

* implement the `setDisabledState` on the `inputMask` value accessor ([fc1af91](https://github.com/ngneat/input-mask/commit/fc1af911103ad94b30a1c6cd65620a806f8d3774))

# [4.1.0](https://github.com/ngneat/input-mask/compare/v4.0.1...v4.1.0) (2022-01-05)


### Features

* updated version inputmask library ([d3cef3b](https://github.com/ngneat/input-mask/commit/d3cef3bd236426f7c860939c6f08d48d93cd85d1))

## [4.0.1](https://github.com/ngneat/input-mask/compare/v4.0.0...v4.0.1) (2021-11-15)


### Reverts

* Revert "feat: upgrade to Angular 13 and support modern package format" ([53aa975](https://github.com/ngneat/input-mask/commit/53aa97557432fb0667e10b36797219380279c6c4))

# [4.0.0](https://github.com/ngneat/input-mask/compare/v3.0.4...v4.0.0) (2021-11-12)


### Features

* upgrade to Angular 13 and support modern package format ([8d3da96](https://github.com/ngneat/input-mask/commit/8d3da96d4c7cede4a0f3750ecd2dada6cc4618a5))


### BREAKING CHANGES

* The `@ngneat/input-mask` is shipped with `.mjs` files,
following the APF (Angular Package Format) spec starting from Angular 13.
`.mjs` files are compatible only with Angular 13 version and higher.

## [3.0.4](https://github.com/ngneat/input-mask/compare/v3.0.3...v3.0.4) (2021-10-28)


### Bug Fixes

* **input-mask.directive:** check if inputMaskPlugin is defined in validate method ([c7aacb3](https://github.com/ngneat/input-mask/commit/c7aacb382c635fd313901a9ef5200a3fb8b3ad07)), closes [#34](https://github.com/ngneat/input-mask/issues/34)

## [3.0.3](https://github.com/ngneat/input-mask/compare/v3.0.2...v3.0.3) (2021-10-25)


### Performance Improvements

* reduce change detection cycles ([f810fcc](https://github.com/ngneat/input-mask/commit/f810fcc85e9c53a385acd2a26fe084eb5aa37afc))

## [3.0.2](https://github.com/ngneat/input-mask/compare/v3.0.1...v3.0.2) (2021-09-21)


### Bug Fixes

* **input-mask.directive:** keep existing validators of form-control ([4531e01](https://github.com/ngneat/input-mask/commit/4531e0177c6a8074f2912d040c6c92565fd21443))

## [3.0.1](https://github.com/ngneat/input-mask/compare/v3.0.0...v3.0.1) (2021-09-17)


### Bug Fixes

* **input-mask.directive:** disconnect mutation observer on destroy ([8458937](https://github.com/ngneat/input-mask/commit/8458937b714e02ee48f3440eae8fb6b92608f721))

# [3.0.0](https://github.com/ngneat/input-mask/compare/v2.0.0...v3.0.0) (2021-09-17)


### Bug Fixes

* **input-mask.directive:** handle validation when input field is empty ([2bb1299](https://github.com/ngneat/input-mask/commit/2bb12996c1374577fc2b40cf627eea34362a6bfa)), closes [#12](https://github.com/ngneat/input-mask/issues/12)
* **input-mask.directive:** if value is null, set blank string ([a32bdb2](https://github.com/ngneat/input-mask/commit/a32bdb22c064d0cf8addb5102ebd9ede1905607b)), closes [#6](https://github.com/ngneat/input-mask/issues/6)
* **input-mask.directive:** validation error is null if field value is balnk ([bf24dd8](https://github.com/ngneat/input-mask/commit/bf24dd8c6c4a2f0ece949e4af6ca44e9963b33f9)), closes [#12](https://github.com/ngneat/input-mask/issues/12)


### Features

* user can pass inputSelector if the host is not native input element ([d11601b](https://github.com/ngneat/input-mask/commit/d11601b962cc5023711947281b4824f80abc4e09)), closes [#19](https://github.com/ngneat/input-mask/issues/19)


### BREAKING CHANGES

* Fixed validation error value as per other standard angular form validation errors

# [2.0.0](https://github.com/ngneat/input-mask/compare/v1.2.0...v2.0.0) (2021-09-13)


### Bug Fixes

* revert ionic support ([35577b9](https://github.com/ngneat/input-mask/commit/35577b9e651e7242a55155cb164f776bd8583966))


### BREAKING CHANGES

* reverting ionic support

# [1.2.0](https://github.com/ngneat/input-mask/compare/v1.1.0...v1.2.0) (2021-09-10)


### Bug Fixes

* render initial value ([4d1f02e](https://github.com/ngneat/input-mask/commit/4d1f02e99ffbb47c454b1b656dfef0113f4484ac))


### Features

* add support for ionic input ([1857303](https://github.com/ngneat/input-mask/commit/185730395dc92ab03e0adbb061582d9886206913)), closes [#19](https://github.com/ngneat/input-mask/issues/19)

# [1.1.0](https://github.com/ngneat/input-mask/compare/v1.0.2...v1.1.0) (2021-08-11)


### Features

* **package.json:** add support for v12 ([05008d1](https://github.com/ngneat/input-mask/commit/05008d1747f012fa804049e2a82ea8c21b6ffe8d)), closes [#14](https://github.com/ngneat/input-mask/issues/14)

## [1.0.2](https://github.com/ngneat/input-mask/compare/v1.0.1...v1.0.2) (2021-07-06)


### Bug Fixes

* make server-side compatible ([56d0c3c](https://github.com/ngneat/input-mask/commit/56d0c3cbcd057bb1b29c2f0b8e9f329ace268872))
* remove event listeners when the directive is destroyed ([82ec936](https://github.com/ngneat/input-mask/commit/82ec93688e9701d096771ec03ca410e1ce515f23))

## [1.0.1](https://github.com/ngneat/input-mask/compare/v1.0.0...v1.0.1) (2021-06-22)


### Bug Fixes

* **input-mask.directive:** render input with initial value passed in form-control ([fe8a166](https://github.com/ngneat/input-mask/commit/fe8a166683c9bf3e81229cf5971862b2740c70fb)), closes [#3](https://github.com/ngneat/input-mask/issues/3)

## [1.0.1-beta.1](https://github.com/ngneat/input-mask/compare/v1.0.0...v1.0.1-beta.1) (2021-06-22)


### Bug Fixes

* **input-mask.directive:** render input with initial value passed in form-control ([fe8a166](https://github.com/ngneat/input-mask/commit/fe8a166683c9bf3e81229cf5971862b2740c70fb)), closes [#3](https://github.com/ngneat/input-mask/issues/3)

# 1.0.0 (2021-05-18)


### Bug Fixes

* **input-mask.directive:** validate only input value and not control value ([06ded54](https://github.com/ngneat/input-mask/commit/06ded54f2d2408e69d44f3bc22fde49bc5c0ecaa))
* **schematics:** add dev dependency ([56ed59e](https://github.com/ngneat/input-mask/commit/56ed59e971adae561d9db78d2005af7b895c4876))
* **schematics:** fix import statement and external dep ([48e20a5](https://github.com/ngneat/input-mask/commit/48e20a5ab19f2cc4f1bdf460c8773d60c8e63779))


### Features

* **input-mask:** allow users to pass parser to transform value ([ba225db](https://github.com/ngneat/input-mask/commit/ba225dbd4cb698ea58cdfd5f232bca79f1e9a41a))
* **input-mask:** create directive ([f1b7004](https://github.com/ngneat/input-mask/commit/f1b7004c1dbd3d5a8fc8e0f157485913d4aca291))
* **input-mask.directive:** add validation support ootb ([e94b159](https://github.com/ngneat/input-mask/commit/e94b159839ff8495fb6067a0cf53397b26e8b921))
* **input-mask.directive:** add wrapper function to create input mask options ([5aa29f8](https://github.com/ngneat/input-mask/commit/5aa29f89177131331361ee28e95e2e561c5e32a8))
* add input-mask lib ([e05db87](https://github.com/ngneat/input-mask/commit/e05db870b7fd5cf677ec37cdf0ad69f276cc8f65))
* initial commit ([3b524d7](https://github.com/ngneat/input-mask/commit/3b524d70ccf1e91d7ede8f99ef6c36471d35029d))

# [1.0.0-beta.5](https://github.com/ngneat/input-mask/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2021-05-12)


### Bug Fixes

* **input-mask.directive:** validate only input value and not control value ([06ded54](https://github.com/ngneat/input-mask/commit/06ded54f2d2408e69d44f3bc22fde49bc5c0ecaa))

# [1.0.0-beta.4](https://github.com/ngneat/input-mask/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2021-05-07)


### Features

* **input-mask:** allow users to pass parser to transform value ([ba225db](https://github.com/ngneat/input-mask/commit/ba225dbd4cb698ea58cdfd5f232bca79f1e9a41a))

# [1.0.0-beta.3](https://github.com/ngneat/input-mask/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2021-04-28)


### Bug Fixes

* **schematics:** add dev dependency ([56ed59e](https://github.com/ngneat/input-mask/commit/56ed59e971adae561d9db78d2005af7b895c4876))

# [1.0.0-beta.2](https://github.com/ngneat/input-mask/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2021-04-28)


### Bug Fixes

* **schematics:** fix import statement and external dep ([48e20a5](https://github.com/ngneat/input-mask/commit/48e20a5ab19f2cc4f1bdf460c8773d60c8e63779))

# 1.0.0-beta.1 (2021-04-28)


### Features

* **input-mask:** create directive ([f1b7004](https://github.com/ngneat/input-mask/commit/f1b7004c1dbd3d5a8fc8e0f157485913d4aca291))
* **input-mask.directive:** add validation support ootb ([e94b159](https://github.com/ngneat/input-mask/commit/e94b159839ff8495fb6067a0cf53397b26e8b921))
* **input-mask.directive:** add wrapper function to create input mask options ([5aa29f8](https://github.com/ngneat/input-mask/commit/5aa29f89177131331361ee28e95e2e561c5e32a8))
* add input-mask lib ([e05db87](https://github.com/ngneat/input-mask/commit/e05db870b7fd5cf677ec37cdf0ad69f276cc8f65))
* initial commit ([3b524d7](https://github.com/ngneat/input-mask/commit/3b524d70ccf1e91d7ede8f99ef6c36471d35029d))
