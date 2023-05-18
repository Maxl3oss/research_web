import { useEffect, useState } from 'react'
import { FrontendLayout } from '../../../components/layouts'
import Lucide from '../../../components/base/lucide/index';

export default function ResearchMain() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  })
  return (
    <FrontendLayout>
      <div className="cards p-5 min-h-[92vh] h-full dark:bg-zinc-900 max-w-screen">
        {loading ? (
          <div className="mt-5 grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
            {Array.from(Array(9), (index, key) => (
              <div key={key} className="relative card-pp flex p-2 border cursor-pointer bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="absolute bottom-5 animate-pulse bg-zinc-300 dark:bg-zinc-800 rounded-md">
                  <div className="h-52 w-36 rounded-lg"></div>
                </div>
                <div className="absolute p-2 top-2 rounded right-3 animate-pulse bg-zinc-300 dark:bg-zinc-800">

                </div>
                <div className="p-2 ml-36 w-full min-h-[200px]">
                  <div className="p-3 mb-2 w-48 rounded animate-pulse bg-zinc-300 dark:bg-zinc-800"></div>
                  <div className="p-1 w-32 rounded animate-pulse bg-zinc-300 dark:bg-zinc-800"></div>
                  <div className="p-2 w-32 rounded animate-pulse mb-5 mt-1 bg-zinc-300 dark:bg-zinc-800"></div>
                  <div className="p-10 w-full animate-pulse bg-zinc-300 dark:bg-zinc-800"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <label className="font-semibold text-2xl">Most viewed</label>
            <div className="mt-5 bg-gray-200 dark:bg-zinc-800 p-3 mb-5 flex overflow-x-auto">
              <div className="flex flex-nowrap gap-5">
                {Array.from(Array(12), (index, key) => (
                  <div className="relative card bg-white dark:bg-zinc-900 inline-block min-w-[380px] max-w-sm overflow-hidden rounded-lg shadow-lg p-5">
                    <div className="flex justify-center">
                      <img className="h-80 rounded-md" src="https://animelib.me/uploads/anime/22179/cover/de498577-f91f-4fc5-8487-0d94efa92c6f.jpg" alt="" />
                    </div>
                    <div className="absolute flex flex-row justify-center items-center gap-2 top-2 right-4 text-sm">
                      <Lucide name="Eye" size='14' />
                      9
                    </div>
                    <div className="py-4">
                      <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                      <p className="text-gray-700 dark:text-zinc-400 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                      </p>
                    </div>
                    <div className="pt-4 pb-2">
                      <div className="flex items-center mb-5">
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <p className="ml-2 text-sm font-medium text-yellow-400">4 out of 5</p>
                      </div>
                      <span className="inline-block dark:bg-zinc-800 bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold dark:text-zinc-400 text-zinc-800 mr-2 mb-2">#photography</span>
                      <span className="inline-block dark:bg-zinc-800 bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold dark:text-zinc-400 text-zinc-800 mr-2 mb-2">#travel</span>
                      <span className="inline-block dark:bg-zinc-800 bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold dark:text-zinc-400 text-zinc-800 mr-2 mb-2">#winter</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <label className="font-semibold text-2xl">Latest list</label>
            <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
              {Array.from(Array(12), (index, key) => (
                <div key={key} className="card-hv relative card-pp flex p-2 border shadow-lg cursor-pointer dark:border-zinc-800 hover:ring-zinc-200 hover:dark:ring-zinc-800 hover:ring">
                  <div className="absolute bottom-5">
                    <img className="h-52 rounded-lg" src="https://animelib.me/uploads/anime/22179/cover/de498577-f91f-4fc5-8487-0d94efa92c6f.jpg" alt="" />
                  </div>
                  <div className="absolute flex flex-row justify-center items-center gap-2 top-2 right-4 text-sm">
                    <Lucide name="Eye" size='14' />
                    9
                  </div>
                  <div className="p-2 ml-36 min-h-[200px]">
                    <div className="font-bold text-xl mb-2 mt-3 xl:mt-0">Catcher In The Rye</div>
                    <p className="text-gray-700 dark:text-gray-400 text-sm">by J.D.Salinger</p>
                    <div className="flex items-center mb-5">
                      <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                      <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                      <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                      <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                      <svg aria-hidden="true" className="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                      <p className="ml-2 text-sm font-medium text-yellow-400">4 out of 5</p>
                    </div>
                    <p className="">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo magni, sed minima illum nihil obcaecati fuga ex...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </FrontendLayout>
  )
}
