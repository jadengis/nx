import Image from 'next/image';
import Link from 'next/link';
import { PluginCard } from '@nrwl/nx-dev/ui/common';

declare const fetch: any;

interface NodeProps {
  pluginList: {
    description: string;
    name: string;
    url: string;
  }[];
}

export async function getStaticProps(): Promise<{ props: NodeProps }> {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(
    'https://raw.githubusercontent.com/nrwl/nx/master/community/approved-plugins.json'
  );
  const pluginList = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      pluginList,
    },
  };
}

export function Node(props: NodeProps) {
  return (
    <div className="w-full">
      {/*Intro component*/}
      <div className="bg-gray-50">
        <div className="max-w-screen xl:max-w-screen-xl mx-auto px-5 py-5">
          <div className="mt-40">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl leading none font-extrabold tracking-tight text-gray-900 mt-10 mb-8 sm:mt-14 sm:mb-10">
              It's always better when we're together.
            </h1>
            <p className="max-w-screen-lg text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11">
              There are many ways you can connect with the open-source Nx
              community. Below, you’ll find details about various connection
              points.
            </p>
          </div>
        </div>
      </div>
      {/*Community*/}
      <div className="max-w-screen xl:max-w-screen-xl mx-auto px-5 py-5">
        <div className="mt-32 flex md:flex-row flex-col justify-center">
          <div className="w-full md:w-1/2 flex flex-col justify-between items-start md:pb-0 pb-10 mt-8 md:mt-0">
            <h2 className="text-xl sm:text-2xl lg:text-2xl leading-none font-bold text-gray-800 tracking-tight mb-4">
              GitHub & Slack
            </h2>

            <p className="sm:text-lg mb-6">
              At the <a href="https://github.com/nrwl/nx">Nx GitHub repo</a>,
              you can file issues or contribute code back to the project.
            </p>
            <p className="sm:text-lg mb-6">
              <a
                className="underline cursor-pointer"
                target="_blank"
                title="Join the Nx Community Slack"
                href="http://go.nrwl.io/join-slack"
              >
                Join the Nx Community Slack
              </a>{' '}
              to meet a friendly community of Nx users. This is a perfect place
              to ask clarifying questions or to talk through new ideas that you
              want to try with Nx. There's also a channel dedicated to sharing
              articles about Nx and most of the authors of community plugins can
              be reached there.
            </p>

            <h2 className="text-xl sm:text-2xl lg:text-2xl leading-none font-bold text-gray-800 tracking-tight mb-4">
              Office Hours & Twitter
            </h2>
            <p className="sm:text-lg mb-6">
              Our live Nx Office Hours take place every second and fourth
              Monday, from 1:00 - 2:00 PM EST on the{' '}
              <a
                className="underline cursor-pointer"
                target="_blank"
                href="https://www.youtube.com/nrwl_io"
              >
                Nrwl YouTube channel
              </a>
              . Info about upcoming Office Hours sessions is shared on the{' '}
              <a
                className="underline cursor-pointer"
                target="_blank"
                href="https://twitter.com/NxDevTools"
              >
                @NxDevTools
              </a>{' '}
              Twitter account and the Nrwl+Nx Newsletter. You can find past
              live-streams on the{' '}
              <a
                className="underline cursor-pointer"
                target="_blank"
                rel="noreferrer"
                href="https://www.youtube.com/watch?v=JS3m1wIwRBg&list=PLakNactNC1dH8LCp2mvx5lbO6maNrlBVN"
              >
                'Nx Office Hours' Youtube Playlist
              </a>
              .
            </p>

            <p className="sm:text-lg mb-6">
              In each session, members of the Nx core team answer your
              questions, help get you up and running with Nx, and address
              particular challenges. If you have a question or topic you’d like
              to see covered in Nx Office Hours, you can{' '}
              <a
                className="underline cursor-pointer"
                target="_blank"
                rel="noreferrer"
                aria-label="Nx Office Hours Questions and Suggestions Form"
                title="Nx Office Hours Questions and Suggestions Form"
                href="https://forms.gle/ehzCjzcF1xxNaviC7"
              >
                submit them here
              </a>
            </p>

            <p className="sm:text-lg mb-6">
              For the latest news about Nx,{' '}
              <a
                className="underline cursor-pointer"
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/NxDevTools"
              >
                follow @NxDevTools on Twitter
              </a>
              .
            </p>

            <h2 className="text-xl sm:text-2xl lg:text-2xl leading-none font-bold text-gray-800 tracking-tight mb-4">
              We also have a newsletter
            </h2>
            <p className="sm:text-lg mb-6">
              You can also{' '}
              <a
                className="underline cursor-pointer"
                target="_blank"
                rel="noreferrer"
                href="https://go.nrwl.io/nx-newsletter"
              >
                subscribe to the Nx Newsletter
              </a>
              : a monthly email digest from the Nx core team at Nrwl.
              Subscribers receive news about Nx releases, posts about new Nx
              features, details about new plugins, links to community resources,
              and additional Nx content.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-between items-start md:pl-16 md:pb-0 pb-10 mt-8 md:mt-0">
            <Image src="/images/community.svg" width={555} height={735} />
          </div>
        </div>
      </div>
      {/*How to plugin*/}
      <div className="max-w-screen xl:max-w-screen-xl mx-auto px-5 py-5">
        <div className="my-32 flex flex-col  md:flex-row items-start justify-center">
          <div className="w-full lg:w-2/5 flex flex-col justify-between items-start md:pb-0 pb-10 mt-8 md:mt-0">
            <h2 className="text-xl sm:text-2xl lg:text-2xl leading-none font-bold text-gray-800 tracking-tight mb-4">
              Community plugin
            </h2>
            <p className="sm:text-lg mb-6">
              Core Nx plugins are created and maintained by the Nx team at Nrwl
              and you can see all the available plugins when you run the{' '}
              <code className="text-sm bg-gray-50 text-gray-600 font-mono leading-6 px-2 py-1 border border-gray-200 rounded">
                nx list
              </code>{' '}
              command in your workspace.
            </p>
            <p className="sm:text-lg mb-6">
              <b>The community plugins listed below</b> are created and
              maintained by members of the Nx community, will allow you to use
              the full power of the workspace while using different
              technologies!
            </p>
            <div className="inline-flex rounded-md shadow mb-6">
              <a
                href="#community-plugin-list"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Check the community plugins right now!
              </a>
            </div>
            <h3 className="text-xl leading-none font-bold text-gray-800 tracking-tight mb-4">
              How to Install
            </h3>
            <p className="sm:text-lg mb-6">
              Each of the plugins listed below have a yarn and an npm icon.
              Clicking on either of these copies the relevant command to install
              the dependency for your project.
            </p>
          </div>
          <div className="w-full lg:w-3/5 flex flex-col justify-between items-start md:pl-16 pb-10 mt-8 md:mt-0">
            <div className="py-4 px-6 bg-gray-50 rounded border border-gray-100">
              <h3 className="text-xl sm:text-2xl lg:text-2xl leading-none font-bold text-gray-800 tracking-tight mb-4">
                How to Create Your Own
              </h3>
              <p className="sm:text-lg mb-6">
                Check out the{' '}
                <a
                  className="underline cursor-pointer"
                  target="_blank"
                  rel="noreferrer"
                  href="https://go.nrwl.io/nx-newsletter"
                >
                  subscribe to the Nx Newsletter
                </a>{' '}
                Nx Plugin guide to learn how to get started with building your
                own plugin!
              </p>
              <iframe
                width="560"
                height="315"
                title="YouTube video player"
                src="https://www.youtube.com/embed/XYO689PAhow"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              />
            </div>
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
      {/*Plugins*/}
      <div className="max-w-screen xl:max-w-screen-xl mx-auto px-5 py-5">
        <div className="my-12 flex sm:flex-row flex-col justify-center">
          <div className="w-full py-6 mt-8">
            <h2
              id="community-plugin-list"
              className="text-xl sm:text-2xl lg:text-3xl leading-none font-extrabold text-gray-900 tracking-tight mb-4 text-center"
            >
              Community Plugins Directory
            </h2>
          </div>
        </div>
        <div className="my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {props.pluginList.map((plugin) => (
            <PluginCard
              key={plugin.name}
              name={plugin.name}
              description={plugin.description}
              url={plugin.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Node;
