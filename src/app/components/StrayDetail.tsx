'use client'

import { format } from "date-fns"
import { StrayWithProfileType } from "./type"
import Image from "next/image"
import { ja } from "date-fns/locale"
import { useEffect, useState } from "react"
import useStore from "../../../store"
import Loading from "../loading"
import Link from "next/link"

// 迷子情報の投稿詳細
const StrayDetail = ({
    post,
}: {
    post: StrayWithProfileType
}) => {
    const birth = format(new Date(post.birth ? post.birth : ''), 'yyyy年MM月dd日', { locale: ja })
    const lostDay = format(new Date(post.lost_day ? post.lost_day : ''), 'yyyy年MM月dd日', { locale: ja })
    const { user } = useStore()
    const [loading, setLoading] = useState(false)
    const [myPost, setMyPost] = useState(false)
    const [login, setLogin] = useState(false)

    useEffect(() => {
        if (user.id != '') {
            setLogin(true)

            if (user.id === post.profile_id) {
                setMyPost(true)
            }
        }
     }, [user])

     const renderButton = () => {
        if (myPost) {
            return (
                <div className="flex justify-end">
                    {loading ? (
                        <Loading />
                    ): (
                        <div className="flex items-center space-x-2">
                            <Link href={`/stray/${post.id}/edit`}>
                                <button className="group flex relative w-full justify-center border-transparent p-2 px-4 rounded-md font-bold text-white bg-orange-400">編集</button>
                            </Link>
                        </div>
                    )
                    }
                </div>
            )
        }
    }

    return (
        <div>
            <div className="flex justify-around mt-20 mb-10 mx-52">
                <div className="relative w-[450px] h-[500px]">
                    <Image 
                        src={post.image_url ? post.image_url: '/noimage.png'}
                        className="rounded-md object-cover"
                        alt="image"
                        fill
                    />
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div className="flex flex-row justify-between mb-2">
                        <p className="text-bold text-2xl">基本情報</p>
                        <div>
                            {renderButton()}
                        </div>
                    </div>
                    <div className="flex flex-col w-[450px] border rounded-md p-6 space-y-12">
                        <div className="flex">
                            <p className="font-bold w-[100px]">名前</p>
                            <div>
                                {post.catname}
                            </div>
                        </div>
                        <div className="flex">
                            <p className="font-bold w-[100px]">生年月日</p>
                            <div>
                                {birth}
                            </div>
                        </div>
                        <div className="flex">
                            <p className="font-bold w-[100px]">種類</p>
                            <div>
                                {post.pedigree}
                            </div>
                        </div>
                        <div className="flex">
                            <p className="font-bold w-[100px]">性別</p>
                            <div>
                                {post.sex}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mb-20 mx-52">
                <div className="flex justify-center border rounded-md p-6">
                    <div className="flex flex-col w-[950px] space-y-12">
                    <div className="flex">
                            <p className="font-bold w-[150px]">迷子になった日</p>
                            <div>
                                {lostDay}
                            </div>
                        </div>
                        <div className="flex">
                            <p className="font-bold w-[150px]">迷子になった場所</p>
                            <div>
                                {post.address} 付近
                            </div>
                        </div>
                        <div className="flex">
                            <p className="font-bold w-[150px]">特徴</p>
                            <div>
                                {post.detail}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StrayDetail