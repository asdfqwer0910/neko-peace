'use client'

import { ja } from "date-fns/locale"
import Image from "next/image"
import Link from "next/link"
import { StrayWithProfileType } from "./type"
import { format, formatDistance } from "date-fns"
import React from "react"

// 投稿
const StrayPost = ({ post }: { post: StrayWithProfileType; }) => {
    const createdAt = new Date(post.created_at)
    const birth = format(new Date(post.birth ? post.birth : ''), 'yyyy年MM月dd日', { locale: ja })
    const lostDay = format(new Date(post.lost_day ? post.lost_day : ''), 'yyyy年MM月dd日', { locale: ja })
    const now = new Date()
    // 投稿日時
    const date = formatDistance(createdAt, now, { addSuffix: true, locale: ja })

    return (
        <div className='flex justify-center mt-24'>
            {/* カード */}
            <Link href={`/stray/${post.id}`}>
            <div className="w-[390px] h-[535px] overflow-hidden text-black border-2 hover:border-2 hover:border-blue-400 hover:bg-gray-50 hover:bg-opacity-70 hover:shadow-md rounded-3xl  animate-scale-up-center">
                <div className="relative w-full h-[300px]">
                    <Image 
                        src={post.image_url ? post.image_url: '/noimage.png'}
                        alt="image"
                        className="object-cover rounded-t-lg"
                        fill
                    />
                </div>
                <div className="px-6 py-4 w-auto">
                    <div className={post.sex == 'メス' ? 'flex w-12 h-6 mb-2 items-center justify-center bg-pink-300 rounded-xl text-sm text-white' : 'flex w-12 h-6 mb-2 items-center justify-center bg-blue-300 rounded-xl text-sm text-white'} >
                        {post.sex}
                    </div>
                    <div className="flex text-xl font-bold items-center overflow-auto whitespace-nowrap hide-scrollbar">
                        {post.catname}
                    </div>
                    <div className="text-sm items-center text-gray-500">
                        {post.pedigree}
                    </div>
                    <div className="text-md items-center font-semibold mt-1 text-gray-500">
                        {lostDay}に迷子になりました
                    </div>
                    <div className="text-md items-center font-semibold text-gray-500">
                        {post.address} 付近
                    </div>
                    
                </div>
                <div className="flex px-6 justify-start">
                    <div className="flex items-end">
                        <div className="relative w-[40px] h-[40px]">
                        <Image
                            src={post.profiles?.avatar_url ? post.profiles.avatar_url: '/default.svg'}
                            alt="avatar"
                            className="border-2 rounded-full object-cover"
                            fill
                        />
                        </div>
                        <div className="flex flex-col ml-2">
                            <div className="font-bold text-sm">
                                {post.profiles?.username}
                            </div>
                            <div className="text-xs text-gray-500">
                                {date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Link>
        </div>
    )
}

export default StrayPost