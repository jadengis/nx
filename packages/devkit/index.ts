export type { Tree, FileChange } from '@nrwl/tao/src/shared/tree';
export type {
  WorkspaceJsonConfiguration,
  TargetDependencyConfig,
  TargetConfiguration,
  ProjectConfiguration,
  ProjectType,
  Generator,
  GeneratorCallback,
  Executor,
  ExecutorContext,
  Workspace,
} from '@nrwl/tao/src/shared/workspace';
export type {
  ImplicitDependencyEntry,
  ImplicitJsonSubsetDependency,
  NxJsonConfiguration,
  NxJsonProjectConfiguration,
  NxAffectedConfig,
} from '@nrwl/tao/src/shared/nx';
export { logger } from '@nrwl/tao/src/shared/logger';
export type { PackageManager } from '@nrwl/tao/src/shared/package-manager';
export { getPackageManagerCommand } from '@nrwl/tao/src/shared/package-manager';
export type { Target } from '@nrwl/tao/src/commands/run';
export { runExecutor } from '@nrwl/tao/src/commands/run';

export { formatFiles } from './src/generators/format-files';
export { generateFiles } from './src/generators/generate-files';
export type { WorkspaceConfiguration } from './src/generators/project-configuration';
export {
  addProjectConfiguration,
  readProjectConfiguration,
  removeProjectConfiguration,
  updateProjectConfiguration,
  readWorkspaceConfiguration,
  updateWorkspaceConfiguration,
  getProjects,
} from './src/generators/project-configuration';
export { toJS } from './src/generators/to-js';
export { updateTsConfigsToJs } from './src/generators/update-ts-configs-to-js';
export { visitNotIgnoredFiles } from './src/generators/visit-not-ignored-files';

export {
  parseTargetString,
  targetToTargetString,
} from './src/executors/parse-target-string';
export { readTargetOptions } from './src/executors/read-target-options';

export type {
  ProjectFileMap,
  FileData,
  ProjectGraph,
  ProjectGraphDependency,
  ProjectGraphNode,
  NxPlugin,
  ProjectGraphProcessorContext,
} from './src/project-graph/interfaces';
export { DependencyType } from './src/project-graph/interfaces';
export { ProjectGraphBuilder } from './src/project-graph/utils';

export { readJson, writeJson, updateJson } from './src/utils/json';
export {
  addDependenciesToPackageJson,
  removeDependenciesFromPackageJson,
} from './src/utils/package-json';
export { installPackagesTask } from './src/tasks/install-packages-task';
export { names } from './src/utils/names';
export {
  getWorkspaceLayout,
  getWorkspacePath,
} from './src/utils/get-workspace-layout';
export type {
  StringChange,
  StringDeletion,
  StringInsertion,
} from './src/utils/string-change';
export { applyChangesToString, ChangeType } from './src/utils/string-change';
export { offsetFromRoot } from './src/utils/offset-from-root';
export { convertNxGenerator } from './src/utils/invoke-nx-generator';
export { convertNxExecutor } from './src/utils/convert-nx-executor';
export { stripIndents } from './src/utils/strip-indents';
export { joinPathFragments, normalizePath } from './src/utils/path';
