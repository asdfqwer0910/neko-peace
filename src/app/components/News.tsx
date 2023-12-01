import React from 'react'
import { NEWS_DATA } from '../const'
import Link from 'next/link'

const News = () => {
  return (
    <section className="2xl:max-container flex flex-col py-10 lg:py-20 sm:mb-10 md:mb-10 xl:mb-20">
      <div className="flex flex-col justify-center w-full h-full">
        <h1 className="font-bold text-3xl pb-12 text-center">最新ニュース</h1>
          {NEWS_DATA.map((link) => (
            <Link href={link.href} key={link.key}>
            <ul className="h-full gap-24 justify-start lg:flex border-b-2 px-12 cursor-pointer hover:bg-gray-100 hover:border-orange-400">
              <li className="regular-18 py-4">
                {link.label1}
              </li>
              <li className="regular-18 py-4">
                {link.label2}
              </li>
            </ul>
            </Link>
          ))}
      </div>
    </section>
  )
}

export default News