import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  InlineCommand,
  InteractiveSections,
  NxUsersShowcase,
} from '@nrwl/nx-dev/ui/common';

export function Node() {
  const sectionItemList = [
    {
      title: 'Create Nx Plugins',
      content: [
        'Extend the power of Nx with your own custom built plugin that uses',
        '[@nrwl/devkit](https://www.npmjs.com/package/@nrwl/devkit) and',
        '[@nrwl/node](https://www.npmjs.com/package/@nrwl/node) or the',
        '[@nrwl/nx-plugin](https://www.npmjs.com/package/@nrwl/nx-plugin).',
      ].join(' '),
    },
    {
      title: 'Build APIs',
      content: [
        'Use the many API frameworks that are available for Node,',
        ' or use the ones provided by Nx for Express and Nest.',
      ].join(' '),
    },
    {
      title: 'Open Source Tool',
      content: [
        'Create a workspace that puts emphasis on packages rather than',
        'libs and apps by using the "oss" preset with "create-nx-workspace".\n\n',
        'Use TypeScript to build out projects that can scale infinitely.',
      ].join(' '),
    },
    {
      title: 'Nx Uses Computation Caching',
      content: [
        'Computation caching is a valuable way to improve performance.',
        'Computing (tests, arguments, operations, etc.) is expensive and',
        'time-consuming, but computation caching means you never have to rebuild',
        'the same code.\n\n',
        'WebPack, Jest, and TypeScript all perform computation caching.',
        'Nx builds on inspiration from Bazel and similar tools, and implements',
        'distributed computation caching in a way that works with any tool and',
        'requires no configuration. The result is much faster builds and ',
        'continuous integration.\n\n',
        'In addition, when connected to Nx Cloud, you can share the computation',
        'cache with everyone working on the same project.',
      ].join(' '),
    },
  ];

  return (
    <div className="w-full">
      {/*Intro component*/}
      <div className="bg-gray-50">
        <div className="max-w-screen xl:max-w-screen-xl mx-auto px-5 py-5">
          {/*1*/}
          <div className="my-32 flex sm:flex-row flex-col justify-center">
            <div className="w-full sm:w-1/2 lg:w-2/5 flex flex-col justify-between items-start sm:pb-0 pb-10 mt-8 sm:mt-0">
              <h2 className="text-3xl sm:text-3xl lg:text-5xl leading-none font-extrabold text-gray-900 tracking-tight mb-4">
                Nx and Node
              </h2>
            </div>
            <div className="w-full sm:w-1/2 lg:w-3/5 flex flex-col justify-between items-start sm:pl-16 sm:pb-0 pb-10 mt-8 sm:mt-0">
              <h3 className="text-xl sm:text-2xl lg:text-2xl leading-none font-extrabold text-gray-900 tracking-tight mb-4">
                The power and scalability of Node has helped pave the way for
                increasingly complex and sophisticated applications.
              </h3>
              <p className="sm:text-lg mb-6">
                Using Typescript in Node applications helps dev teams code more
                consistently, avoid compatibility issues, and it can be used to
                build libraries for NPM. Unfortunately, the setup is often
                tedious and time consuming, and any mistakes in your
                configuration can grind your work to a halt.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*What is Nx*/}
      <div className="max-w-screen xl:max-w-screen-xl mx-auto px-5 py-5">
        <div className="my-32 flex sm:flex-row flex-col justify-center">
          <div className="w-full sm:w-1/2 flex flex-col justify-between items-start sm:pb-0 pb-10 mt-8 sm:mt-0">
            <h3 className="text-xl sm:text-2xl lg:text-2xl leading-none font-extrabold text-gray-900 tracking-tight mb-4">
              Nx is a smart and extensible build framework that helps you
              develop, test, build, and scale Node applications.
            </h3>
            <p className="sm:text-lg mb-6">
              Nx is a set of tools that provides a standardized and integrated
              development experience for all of your Node workspaces. It takes
              care of things like Typescript configuration and library sharing,
              so you can focus on other, more interesting development tasks. In
              addition, Nx provides...
            </p>
            <ul className="sm:text-lg list-disc list-inside">
              <li>API creation using Express and Nest</li>
              <li className="mt-4">Better linting</li>
              <li className="mt-4">Better testing</li>
              <li className="mt-4">
                Support for popular community tools and frameworks
              </li>
              <li className="mt-4">Nx’s own devkit for building plugins</li>
              <li className="mt-4">
                And other Nx-specific features including dependency graphs, code
                generation, and computation caching
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 flex flex-col justify-between items-start sm:pl-16 sm:pb-0 pb-10 mt-8 sm:mt-0">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/iIh5h_G52kI"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full"
            />
          </div>
        </div>
      </div>
      {/*Call out*/}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto my-12 py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-blue-600">
              Start using Nx with Node today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link href="/latest/node/getting-started/getting-started">
                <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  Get started with Node
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen xl:max-w-screen-xl mx-auto px-5 py-5">
        {/*How to use Nx*/}
        <div className="mt-32 flex sm:flex-row flex-col justify-center">
          <div className="w-full sm:w-1/2 flex flex-col justify-between items-start sm:pb-0 pb-10 mt-8 sm:mt-0">
            <h3 className="text-2xl sm:text-2xl lg:text-3xl leading-none font-extrabold text-gray-900 tracking-tight mb-4">
              Create a Node Workspace <br />
              with Nx Nest or Express
            </h3>
          </div>
          <div className="w-full sm:w-1/2 flex flex-col justify-between items-start sm:pl-16 sm:pb-0 pb-10 mt-8 sm:mt-0">
            <p className="sm:text-lg mb-6">
              Get started right away by creating a new Node workspace. If you’re
              using Nest run the following command in your Terminal or Command
              prompt:
            </p>

            <div className="w-full">
              <InlineCommand
                language={'bash'}
                command={'npx create-nx-workspace --preset=nest'}
              />
            </div>

            <p className="sm:text-lg my-6">
              For Express users, the command will be:
            </p>

            <div className="w-full">
              <InlineCommand
                language={'bash'}
                command={'npx create-nx-workspace --preset=express'}
              />
            </div>
          </div>
        </div>
        {/*More info*/}
        <div className="mt-16 mb-32 flex sm:flex-row flex-col items-start justify-center">
          <div className="w-full sm:w-1/2 flex flex-col justify-between items-start sm:pb-0 pb-10 mt-8 sm:mt-0">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/UcBSBQYNlhE"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full"
            />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col justify-between items-start sm:pl-16 sm:pb-0 pb-10 mt-8 sm:mt-0">
            <p className="sm:text-lg mb-6">
              Once you’ve created your Node workspace, follow the steps in this
              tutorial to learn how to add testing, share code, view dependency
              graphs, and much, much more.
            </p>
            <div className="inline-flex rounded-md shadow">
              <Link href="/latest/node/tutorial/01-create-application">
                <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  Start learning Nx with Node
                </a>
              </Link>
            </div>
            <p className="italic sm:text-lg my-6">
              If you want to add Nx to an existing Node project,{' '}
              <Link href="/latest/node/migration/adding-to-monorepo">
                <a className="underline pointer">check out this guide</a>
              </Link>
              .
            </p>
          </div>
        </div>
        {/*Nx technology*/}
        <div className="py-32 flex sm:flex-row flex-col items-center justify-center">
          <div className="w-full sm:w-2/5 flex flex-col justify-between items-center sm:pb-0 pb-10 mt-8 sm:mt-0">
            <div className="grid grid-cols-6 sm:grid-cols-2 md:grid-cols-3 gap-16 lg:gap-24">
              <img
                loading="lazy"
                className="w-full opacity-25"
                height="128"
                width="128"
                src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/jest.svg"
              />
              <img
                loading="lazy"
                className="w-full opacity-25"
                height="128"
                width="128"
                src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/nestjs.svg"
              />
              <img
                loading="lazy"
                className="w-full opacity-25"
                height="128"
                width="128"
                src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/express.svg"
              />
              <img
                loading="lazy"
                className="w-full opacity-25"
                height="128"
                width="128"
                src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/typescript.svg"
              />
              <img
                loading="lazy"
                className="w-full opacity-25"
                height="128"
                width="128"
                src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/eslint.svg"
              />
              <img
                loading="lazy"
                className="w-full opacity-25"
                height="128"
                width="128"
                src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/visualstudiocode.svg"
              />
            </div>
          </div>
          <div className="w-full sm:w-3/5 flex flex-col justify-between items-start sm:pl-16 sm:pb-0 pb-10 mt-8 sm:mt-0">
            <h3 className="text-xl sm:text-2xl lg:text-2xl leading-none font-extrabold text-gray-900 tracking-tight mb-4">
              Tools
            </h3>
            <p className="sm:text-lg mb-6">
              Nx provides excellent tooling for Node in many ways, including:
            </p>
            <ul className="sm:text-lg list-disc list-inside">
              <li>
                <a
                  className="underline pointer"
                  href="https://www.typescriptlang.org/"
                  target="_blank"
                >
                  TypeScript
                </a>{' '}
                extends JavaScript by adding types and saves you time by
                catching errors and providing fixes before you run code.
              </li>
              <li className="mt-4">
                <a
                  className="underline pointer"
                  href="https://jestjs.io/"
                  target="_blank"
                >
                  Jest
                </a>{' '}
                is a zero-config JavaScript testing framework that prioritizes
                simplicity. With robust documentation and a feature-full API,
                Jest is a great solution for JS developers looking for a
                powerful, modern testing toolkit.
              </li>
              <li className="mt-4">
                <a
                  className="underline pointer"
                  href="https://eslint.org/"
                  target="_blank"
                >
                  ESLint
                </a>{' '}
                uses static analysis to identify problems in your code, many of
                which are fixed automatically in a syntax-aware manner. ESLint
                is highly configurable; customize your linting preprocess code,
                use custom parsers, or write your own rules.
              </li>
            </ul>
          </div>
        </div>
        {/*Integrated experience*/}
        <div className="py-32 flex sm:flex-row flex-col items-center justify-center">
          <div className="w-full sm:w-2/5 flex flex-col justify-between items-start sm:pb-0 pb-10 mt-8 sm:mt-0">
            <h3 className="text-xl sm:text-2xl lg:text-2xl leading-none font-extrabold text-gray-900 tracking-tight mb-4">
              Nx Integrated Development Experience
            </h3>
            <p className="sm:text-lg mb-6">
              Nx provides a modern dev experience that is more integrated. Nx
              adds a high-quality VS Code plugin which helps you use the build
              tool effectively, generate components in folders, and much more.
            </p>
            <p className="sm:text-lg mb-6">
              Nx also supports optional free cloud support with Nx Cloud as well
              as GitHub integration. Share links with your teammates where
              everyone working on a project can examine detailed build logs and
              get insights about how to improve your project and build.
            </p>
          </div>
          <div className="w-full sm:w-3/5 flex flex-col justify-between items-start sm:pl-16 sm:pb-0 pb-10 mt-8 sm:mt-0">
            <Image
              src="/images/vscode-nxcloud-pr.png"
              alt="Nx Integrated Development Experience illustration"
              width={870}
              height={830}
            />
          </div>
        </div>
        {/*Learn more*/}
        <div className="py-32 flex sm:flex-row flex-col items-start justify-center">
          <div className="w-full sm:w-2/5 flex flex-col justify-between items-start sm:pb-0 pb-10 mt-8 sm:mt-0">
            <h3 className="text-xl sm:text-2xl lg:text-2xl leading-none font-extrabold text-gray-900 tracking-tight mb-4">
              Learn More About Nx
            </h3>
          </div>
          <div className="w-full sm:w-3/5 flex flex-col justify-between items-start sm:pl-16 sm:pb-0 pb-10 mt-8 sm:mt-0">
            <p className="sm:text-lg mb-6">
              To learn more about Nx and how Nx can increase your dev and build
              efficiency and modernize your apps stack, check out the following
              resources:
            </p>
            <ul className="sm:text-lg list-disc list-inside">
              <li>
                <a
                  className="underline pointer"
                  href="https://egghead.io/playlists/scale-react-development-with-nx-4038"
                  target="_blank"
                >
                  Free Nx Workspaces video course
                </a>
              </li>
              <li className="mt-4">
                <a
                  className="underline pointer"
                  href="https://www.youtube.com/watch?v=h5FIGDn5YM0"
                  target="_blank"
                >
                  Nx Explainer: Dev Tools for Monorepos, In-Depth with Victor
                  Savkin
                </a>
              </li>
              <li className="mt-4">
                <a
                  className="underline pointer"
                  href="https://go.nrwl.io/nx-office-hours"
                  target="_blank"
                >
                  Tune into regular Nx Office Hours livestreams
                </a>
              </li>
              <li className="mt-4">
                <a
                  className="underline pointer"
                  href="https://nx.app"
                  target="_blank"
                >
                  Nx Cloud
                </a>
              </li>
            </ul>
            <p className="sm:text-lg mt-6">
              You can also{' '}
              <a
                className="underline pointer"
                href="https://twitter.com/NxDevTools"
                target="_blank"
              >
                follow Nx Dev Tools on Twitter
              </a>{' '}
              to keep up with latest news, feature announcements, and resources
              from the Nx Core Team.
            </p>
          </div>
        </div>
      </div>
      {/*Who is using Nx*/}
      <NxUsersShowcase />
    </div>
  );
}

export default Node;
