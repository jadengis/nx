import { Tree } from '@angular-devkit/schematics';
import { readJsonInTree, updateJsonInTree } from '@nrwl/workspace';
import type { NxJsonConfiguration } from '@nrwl/devkit';
import { createEmptyWorkspace, getFileContent } from '@nrwl/workspace/testing';
import * as stripJsonComments from 'strip-json-comments';
import { callRule, runSchematic } from '../../utils/testing';

const prettier = require('prettier');

describe('app', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = Tree.empty();
    appTree = createEmptyWorkspace(appTree);
  });

  describe('not nested', () => {
    it('should update workspace.json', async () => {
      const tree = await runSchematic('app', { name: 'myApp' }, appTree);
      const workspaceJson = readJsonInTree(tree, '/workspace.json');

      expect(workspaceJson.projects['my-app']).toMatchSnapshot();
      expect(workspaceJson.projects['my-app-e2e']).toMatchSnapshot();
    });

    it('should remove the e2e target on the application', async () => {
      const tree = await runSchematic('app', { name: 'myApp' }, appTree);
      const workspaceJson = readJsonInTree(tree, '/workspace.json');
      expect(workspaceJson.projects['my-app'].architect.e2e).not.toBeDefined();
    });

    it('should update nx.json', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', tags: 'one,two' },
        appTree
      );
      const nxJson = readJsonInTree<NxJsonConfiguration>(tree, '/nx.json');
      expect(nxJson.projects).toEqual({
        'my-app': {
          tags: ['one', 'two'],
        },
        'my-app-e2e': {
          implicitDependencies: ['my-app'],
          tags: [],
        },
      });
    });

    it('should generate files', async () => {
      const tree = await runSchematic('app', { name: 'myApp' }, appTree);
      expect(tree.exists(`apps/my-app/jest.config.js`)).toBeTruthy();
      expect(tree.exists('apps/my-app/src/main.ts')).toBeTruthy();
      expect(tree.exists('apps/my-app/src/app/app.module.ts')).toBeTruthy();
      expect(tree.exists('apps/my-app/src/app/app.component.ts')).toBeTruthy();
      expect(
        getFileContent(tree, 'apps/my-app/src/app/app.module.ts')
      ).toContain('class AppModule');

      const tsconfig = readJsonInTree(tree, 'apps/my-app/tsconfig.json');
      expect(tsconfig.references).toContainEqual({
        path: './tsconfig.app.json',
      });
      expect(tsconfig.references).toContainEqual({
        path: './tsconfig.spec.json',
      });
      expect(tsconfig.references).toContainEqual({
        path: './tsconfig.editor.json',
      });

      const tsconfigApp = JSON.parse(
        stripJsonComments(getFileContent(tree, 'apps/my-app/tsconfig.app.json'))
      );
      expect(tsconfigApp.compilerOptions.outDir).toEqual('../../dist/out-tsc');
      expect(tsconfigApp.extends).toEqual('./tsconfig.json');

      const eslintrcJson = JSON.parse(
        stripJsonComments(getFileContent(tree, 'apps/my-app/.eslintrc.json'))
      );
      expect(eslintrcJson.extends).toEqual(['../../.eslintrc.json']);

      expect(tree.exists('apps/my-app-e2e/cypress.json')).toBeTruthy();
      const tsconfigE2E = JSON.parse(
        stripJsonComments(
          getFileContent(tree, 'apps/my-app-e2e/tsconfig.e2e.json')
        )
      );
      expect(tsconfigE2E.extends).toEqual('./tsconfig.json');
    });

    it('should setup jest with serializers', async () => {
      const tree = await runSchematic('app', { name: 'myApp' }, appTree);

      expect(tree.readContent('apps/my-app/jest.config.js')).toContain(
        `'jest-preset-angular/build/serializers/no-ng-attributes'`
      );
      expect(tree.readContent('apps/my-app/jest.config.js')).toContain(
        `'jest-preset-angular/build/serializers/ng-snapshot'`
      );
      expect(tree.readContent('apps/my-app/jest.config.js')).toContain(
        `'jest-preset-angular/build/serializers/html-comment'`
      );
    });

    it('should default the prefix to npmScope', async () => {
      const noPrefix = await runSchematic(
        'app',
        { name: 'myApp', e2eTestRunner: 'protractor' },
        appTree
      );

      const withPrefix = await runSchematic(
        'app',
        {
          name: 'myAppWithPrefix',
          prefix: 'custom',
          e2eTestRunner: 'protractor',
        },
        appTree
      );

      // Testing without prefix

      let appE2eSpec = noPrefix
        .read('apps/my-app-e2e/src/app.e2e-spec.ts')
        .toString();
      let workspaceJson = JSON.parse(
        noPrefix.read('workspace.json').toString()
      );
      let myAppPrefix = workspaceJson.projects['my-app'].prefix;

      expect(myAppPrefix).toEqual('proj');
      expect(appE2eSpec).toContain('Welcome to my-app!');

      // Testing WITH prefix

      appE2eSpec = withPrefix
        .read('apps/my-app-e2e/src/app.e2e-spec.ts')
        .toString();
      workspaceJson = JSON.parse(withPrefix.read('workspace.json').toString());
      myAppPrefix = workspaceJson.projects['my-app-with-prefix'].prefix;

      expect(myAppPrefix).toEqual('custom');
      expect(appE2eSpec).toContain('Welcome to my-app!');
    });

    // TODO: this test should be fixed
    xit('should work if the new project root is changed', async () => {
      appTree = await callRule(
        updateJsonInTree('/workspace.json', (json) => ({
          ...json,
          newProjectRoot: 'newProjectRoot',
        })),
        appTree
      );

      const result = await runSchematic('app', { name: 'myApp' }, appTree);
      expect(result.exists('apps/my-app/src/main.ts')).toEqual(true);
      expect(result.exists('apps/my-app-e2e/protractor.conf.js')).toEqual(true);
    });

    it('should set projectType to application', async () => {
      const tree = await runSchematic('app', { name: 'app' }, appTree);
      const workspaceJson = readJsonInTree(tree, '/workspace.json');
      expect(workspaceJson.projects['app'].projectType).toEqual('application');
    });
  });

  describe('nested', () => {
    it('should update workspace.json', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', directory: 'myDir' },
        appTree
      );
      const workspaceJson = readJsonInTree(tree, '/workspace.json');

      expect(workspaceJson.projects['my-dir-my-app']).toMatchSnapshot();
      expect(workspaceJson.projects['my-dir-my-app-e2e']).toMatchSnapshot();
    });

    it('should update nx.json', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', directory: 'myDir', tags: 'one,two' },
        appTree
      );
      const nxJson = readJsonInTree<NxJsonConfiguration>(tree, '/nx.json');
      expect(nxJson.projects).toEqual({
        'my-dir-my-app': {
          tags: ['one', 'two'],
        },
        'my-dir-my-app-e2e': {
          implicitDependencies: ['my-dir-my-app'],
          tags: [],
        },
      });
    });

    it('should generate files', async () => {
      const hasJsonValue = ({ path, expectedValue, lookupFn }) => {
        const content = getFileContent(tree, path);
        const config = JSON.parse(stripJsonComments(content));

        expect(lookupFn(config)).toEqual(expectedValue);
      };
      const tree = await runSchematic(
        'app',
        { name: 'myApp', directory: 'myDir' },
        appTree
      );

      const appModulePath = 'apps/my-dir/my-app/src/app/app.module.ts';
      expect(getFileContent(tree, appModulePath)).toContain('class AppModule');

      // Make sure these exist
      [
        `apps/my-dir/my-app/jest.config.js`,
        'apps/my-dir/my-app/src/main.ts',
        'apps/my-dir/my-app/src/app/app.module.ts',
        'apps/my-dir/my-app/src/app/app.component.ts',
        'apps/my-dir/my-app-e2e/cypress.json',
      ].forEach((path) => {
        expect(tree.exists(path)).toBeTruthy();
      });

      // Make sure these have properties
      [
        {
          path: 'apps/my-dir/my-app/tsconfig.app.json',
          lookupFn: (json) => json.compilerOptions.outDir,
          expectedValue: '../../../dist/out-tsc',
        },
        {
          path: 'apps/my-dir/my-app/.eslintrc.json',
          lookupFn: (json) => json.extends,
          expectedValue: ['../../../.eslintrc.json'],
        },
      ].forEach(hasJsonValue);
    });
  });

  describe('routing', () => {
    it('should include RouterTestingModule', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', directory: 'myDir', routing: true },
        appTree
      );
      expect(
        getFileContent(tree, 'apps/my-dir/my-app/src/app/app.module.ts')
      ).toContain('RouterModule.forRoot');
      expect(
        getFileContent(tree, 'apps/my-dir/my-app/src/app/app.component.spec.ts')
      ).toContain('imports: [RouterTestingModule]');
    });

    it('should not modify tests when --skip-tests is set', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', directory: 'myDir', routing: true, skipTests: true },
        appTree
      );
      expect(
        tree.exists('apps/my-dir/my-app/src/app/app.component.spec.ts')
      ).toBeFalsy();
    });
  });

  describe('template generation mode', () => {
    it('should create Nx specific `app.component.html` template', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', directory: 'myDir' },
        appTree
      );
      expect(
        getFileContent(tree, 'apps/my-dir/my-app/src/app/app.component.html')
      ).toBeTruthy();
      expect(
        getFileContent(tree, 'apps/my-dir/my-app/src/app/app.component.html')
      ).toContain('Thank you for using and showing some ♥ for Nx.');
    });

    it("should update `template`'s property of AppComponent with Nx content", async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', directory: 'myDir', inlineTemplate: true },
        appTree
      );
      expect(
        getFileContent(tree, 'apps/my-dir/my-app/src/app/app.component.ts')
      ).toContain('Thank you for using and showing some ♥ for Nx.');
    });

    it('should update the AppComponent spec to target Nx content', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', directory: 'myDir', inlineTemplate: true },
        appTree
      );
      const testFileContent = getFileContent(
        tree,
        'apps/my-dir/my-app/src/app/app.component.spec.ts'
      );

      expect(testFileContent).toContain(`querySelector('h1')`);
      expect(testFileContent).toContain('Welcome to my-dir-my-app!');
    });
  });

  describe('--style scss', () => {
    it('should generate scss styles', async () => {
      const result = await runSchematic(
        'app',
        { name: 'myApp', style: 'scss' },
        appTree
      );
      expect(result.exists('apps/my-app/src/app/app.component.scss')).toEqual(
        true
      );
    });
  });

  describe('--skipFormat', () => {
    it('should format files by default', async () => {
      const spy = jest.spyOn(prettier, 'getFileInfo');

      appTree = await runSchematic('app', { name: 'myApp' }, appTree);

      expect(spy).toHaveBeenCalled();
    });

    it('should skip format when set to true', async () => {
      const spy = jest.spyOn(prettier, 'format');

      appTree = await runSchematic(
        'app',
        { name: 'myApp', skipFormat: true },
        appTree
      );

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('--linter', () => {
    describe('eslint', () => {
      it('should add an architect target for lint', async () => {
        const tree = await runSchematic(
          'app',
          { name: 'myApp', linter: 'eslint' },
          appTree
        );
        const workspaceJson = readJsonInTree(tree, 'workspace.json');
        expect(workspaceJson.projects['my-app'].architect.lint)
          .toMatchInlineSnapshot(`
          Object {
            "builder": "@nrwl/linter:eslint",
            "options": Object {
              "lintFilePatterns": Array [
                "apps/my-app/src/**/*.ts",
                "apps/my-app/src/**/*.html",
              ],
            },
          }
        `);
        expect(workspaceJson.projects['my-app-e2e'].architect.lint)
          .toMatchInlineSnapshot(`
          Object {
            "builder": "@nrwl/linter:eslint",
            "options": Object {
              "lintFilePatterns": Array [
                "apps/my-app-e2e/**/*.{js,ts}",
              ],
            },
          }
        `);
      });

      it('should add valid eslint JSON configuration which extends from Nx presets', async () => {
        const tree = await runSchematic(
          'app',
          { name: 'myApp', linter: 'eslint' },
          appTree
        );

        const eslintConfig = readJsonInTree(tree, 'apps/my-app/.eslintrc.json');
        expect(eslintConfig).toMatchInlineSnapshot(`
          Object {
            "extends": Array [
              "../../.eslintrc.json",
            ],
            "ignorePatterns": Array [
              "!**/*",
            ],
            "overrides": Array [
              Object {
                "extends": Array [
                  "plugin:@nrwl/nx/angular",
                  "plugin:@angular-eslint/template/process-inline-templates",
                ],
                "files": Array [
                  "*.ts",
                ],
                "rules": Object {
                  "@angular-eslint/component-selector": Array [
                    "error",
                    Object {
                      "prefix": "proj",
                      "style": "kebab-case",
                      "type": "element",
                    },
                  ],
                  "@angular-eslint/directive-selector": Array [
                    "error",
                    Object {
                      "prefix": "proj",
                      "style": "camelCase",
                      "type": "attribute",
                    },
                  ],
                },
              },
              Object {
                "extends": Array [
                  "plugin:@nrwl/nx/angular-template",
                ],
                "files": Array [
                  "*.html",
                ],
                "rules": Object {},
              },
            ],
          }
        `);
      });
    });

    describe('none', () => {
      it('should not add an architect target for lint', async () => {
        const tree = await runSchematic(
          'app',
          { name: 'myApp', linter: 'none' },
          appTree
        );
        const workspaceJson = readJsonInTree(tree, 'workspace.json');
        expect(workspaceJson.projects['my-app'].architect.lint).toBeUndefined();
      });
    });
  });

  describe('--unit-test-runner', () => {
    describe('default (jest)', () => {
      it('should generate jest.config.js with serializers', async () => {
        const tree = await runSchematic('app', { name: 'myApp' }, appTree);

        expect(tree.readContent('apps/my-app/jest.config.js')).toContain(
          `'jest-preset-angular/build/serializers/no-ng-attributes'`
        );
        expect(tree.readContent('apps/my-app/jest.config.js')).toContain(
          `'jest-preset-angular/build/serializers/ng-snapshot'`
        );
        expect(tree.readContent('apps/my-app/jest.config.js')).toContain(
          `'jest-preset-angular/build/serializers/html-comment'`
        );
      });
    });

    describe('karma', () => {
      it('should generate a karma config', async () => {
        const tree = await runSchematic(
          'app',
          { name: 'myApp', unitTestRunner: 'karma' },
          appTree
        );

        expect(tree.exists('apps/my-app/tsconfig.spec.json')).toBeTruthy();
        expect(tree.exists('apps/my-app/karma.conf.js')).toBeTruthy();
        const workspaceJson = readJsonInTree(tree, 'workspace.json');
        expect(workspaceJson.projects['my-app'].architect.test.builder).toEqual(
          '@angular-devkit/build-angular:karma'
        );
        const tsconfigAppJson = readJsonInTree(
          tree,
          'apps/my-app/tsconfig.app.json'
        );
        expect(tsconfigAppJson.compilerOptions.outDir).toEqual(
          '../../dist/out-tsc'
        );
      });
    });

    describe('none', () => {
      it('should not generate test configuration', async () => {
        const tree = await runSchematic(
          'app',
          { name: 'myApp', unitTestRunner: 'none' },
          appTree
        );
        expect(tree.exists('apps/my-app/src/test-setup.ts')).toBeFalsy();
        expect(tree.exists('apps/my-app/src/test.ts')).toBeFalsy();
        expect(tree.exists('apps/my-app/tsconfig.spec.json')).toBeFalsy();
        expect(tree.exists('apps/my-app/jest.config.js')).toBeFalsy();
        expect(tree.exists('apps/my-app/karma.config.js')).toBeFalsy();
        expect(
          tree.exists('apps/my-app/src/app/app.component.spec.ts')
        ).toBeFalsy();
        const workspaceJson = readJsonInTree(tree, 'workspace.json');
        expect(workspaceJson.projects['my-app'].architect.test).toBeUndefined();
      });
    });
  });

  describe('--e2e-test-runner', () => {
    describe('protractor', () => {
      it('should update workspace.json', async () => {
        const tree = await runSchematic(
          'app',
          { name: 'myApp', e2eTestRunner: 'protractor' },
          appTree
        );
        expect(tree.exists('apps/my-app-e2e')).toBeFalsy();
        const workspaceJson = readJsonInTree(tree, 'workspace.json');
        expect(
          workspaceJson.projects['my-app'].architect.e2e
        ).not.toBeDefined();
        expect(workspaceJson.projects['my-app-e2e']).toEqual({
          root: 'apps/my-app-e2e',
          projectType: 'application',
          architect: {
            e2e: {
              builder: '@angular-devkit/build-angular:protractor',
              options: {
                protractorConfig: 'apps/my-app-e2e/protractor.conf.js',
              },
              configurations: {
                development: {
                  devServerTarget: 'my-app:serve:development',
                },
                production: {
                  devServerTarget: 'my-app:serve:production',
                },
              },
              defaultConfiguration: 'development',
            },
            lint: {
              builder: '@nrwl/linter:eslint',
              options: {
                lintFilePatterns: ['apps/my-app-e2e/**/*.ts'],
              },
            },
          },
        });
      });

      it('should update E2E spec files to match the app name', async () => {
        const tree = await runSchematic(
          'app',
          { name: 'myApp', e2eTestRunner: 'protractor' },
          appTree
        );

        expect(
          tree.readContent('apps/my-app-e2e/src/app.e2e-spec.ts')
        ).toContain(`'Welcome to my-app!'`);
        expect(tree.readContent('apps/my-app-e2e/src/app.po.ts')).toContain(
          `'proj-root header h1'`
        );
      });
    });

    describe('none', () => {
      it('should not generate test configuration', async () => {
        const tree = await runSchematic(
          'app',
          { name: 'myApp', e2eTestRunner: 'none' },
          appTree
        );
        expect(tree.exists('apps/my-app-e2e')).toBeFalsy();
        const workspaceJson = readJsonInTree(tree, 'workspace.json');
        expect(workspaceJson.projects['my-app-e2e']).toBeUndefined();
      });
    });
  });

  describe('replaceAppNameWithPath', () => {
    it('should protect `workspace.json` commands and properties', async () => {
      const tree = await runSchematic('app', { name: 'ui' }, appTree);
      const workspaceJson = readJsonInTree(tree, 'workspace.json');
      expect(workspaceJson.projects['ui']).toBeDefined();
      expect(
        workspaceJson.projects['ui']['architect']['build']['builder']
      ).toEqual('@angular-devkit/build-angular:browser');
    });

    it('should protect `workspace.json` sensible properties value to be renamed', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'ui', prefix: 'ui' },
        appTree
      );
      const workspaceJson = readJsonInTree(tree, 'workspace.json');
      expect(workspaceJson.projects['ui'].prefix).toEqual('ui');
    });
  });

  describe('--backend-project', () => {
    describe('with a backend project', () => {
      it('should add a proxy.conf.json to app', async () => {
        const tree = await runSchematic(
          'app',
          { name: 'customer-ui', backendProject: 'customer-api' },
          appTree
        );

        const proxyConfContent = JSON.stringify(
          {
            '/customer-api': {
              target: 'http://localhost:3333',
              secure: false,
            },
          },
          null,
          2
        );

        expect(tree.exists('apps/customer-ui/proxy.conf.json')).toBeTruthy();
        expect(tree.readContent('apps/customer-ui/proxy.conf.json')).toContain(
          proxyConfContent
        );
      });
    });

    describe('with no backend project', () => {
      it('should not generate a proxy.conf.json', async () => {
        const tree = await runSchematic(
          'app',
          { name: 'customer-ui' },
          appTree
        );

        expect(tree.exists('apps/customer-ui/proxy.conf.json')).toBeFalsy();
      });
    });
  });

  describe('--enable-ivy', () => {
    it('should not exclude files in the tsconfig.app.json', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'my-app', enableIvy: true },
        appTree
      );

      expect(tree.readContent('apps/my-app/tsconfig.app.json')).not.toContain(
        'exclude'
      );
    });
  });

  describe('--strict', () => {
    it('should enable strict type checking', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'my-app', strict: true },
        appTree
      );

      // define all the tsconfig files to update
      const configFiles = [
        'apps/my-app/tsconfig.json',
        'apps/my-app-e2e/tsconfig.e2e.json',
      ];

      for (const configFile of configFiles) {
        const { compilerOptions, angularCompilerOptions } = JSON.parse(
          tree.readContent(configFile)
        );

        // check that the TypeScript compiler options have been updated
        expect(compilerOptions.forceConsistentCasingInFileNames).toBe(true);
        expect(compilerOptions.strict).toBe(true);
        expect(compilerOptions.noImplicitReturns).toBe(true);
        expect(compilerOptions.noFallthroughCasesInSwitch).toBe(true);

        // check that the Angular Template options have been updated
        expect(angularCompilerOptions.strictInjectionParameters).toBe(true);
        expect(angularCompilerOptions.strictTemplates).toBe(true);
      }

      // should not update workspace configuration since --strict=true is the default
      const workspaceJson = readJsonInTree(tree, 'workspace.json');
      expect(
        workspaceJson.schematics['@nrwl/angular:application'].strict
      ).not.toBeDefined();
    });

    it('should set defaults when --strict=false', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'my-app', strict: false },
        appTree
      );

      // check to see if the workspace configuration has been updated to turn off
      // strict mode by default in future applications
      const workspaceJson = readJsonInTree(tree, 'workspace.json');
      expect(workspaceJson.schematics['@nrwl/angular:application'].strict).toBe(
        false
      );
    });
  });
});
