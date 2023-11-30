'use client'

import { format, formatDistance } from "date-fns"
import { PostWithProfileType } from "./type"
import Image from "next/image"
import Link from "next/link"
import { ja } from "date-fns/locale"

// 投稿
const AdoptionPost = ({ post }: { post: PostWithProfileType; }) => {
    const createdAt = new Date(post.created_at)
    const birth = format(new Date(post.birth ? post.birth : ''), 'yyyy年MM月dd日', { locale: ja });
    const now = new Date()
    // 投稿日時
    const date = formatDistance(createdAt, now, { addSuffix: true, locale: ja })

    return (
        <div className='flex justify-center mt-24'>
            {/* カード */}
            <Link href={`/adoption/${post.id}`}>
            <div className="w-[320px] h-[390px] overflow-hidden text-black border-2 hover:border-2 hover:border-blue-400 hover:bg-gray-50 hover:bg-opacity-70 hover:shadow-md rounded-3xl group animate-scale-up-center">
                <div className="relative w-full h-[200px]">
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
                    <div className="text-sm items-center text-gray-500">
                        {birth}
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

export default AdoptionPost