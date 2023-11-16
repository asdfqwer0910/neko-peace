'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import Loading from "../loading"
import type { Database } from "../../../lib/database.types"

// ログアウト
const Logout = () => {
    const router = useRouter()
    const supabase = createClientComponentClient<Database>()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        try {
            // ログアウト
            const { error } = await supabase.auth.signOut()

            if (error) {
                setMessage('エラーが発生しました。' + error.message)
                return
            }

            router.push('/')
        } catch (error) {
            setMessage('エラーが発生しました。' + error)
        } finally {
            setLoading(false)
            router.refresh()
        }
    }

    return (
        <div className="min-h-full flex items-center justify-center mt-16 mb-32">
            <div className="max-w-lg w-full space-y-8">
                <h2 className="text-center text-2xl font-bold mb-5">ログアウトしますか？</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-5">
                        {loading ? (
                            <Loading />
                        ) : (
                        <button
                            type="submit"
                            className="group flex relative w-full justify-center border bg-red-500 hover:bg-red-700 border-transparent py-3 rounded-md font-bold text-white mb-5"
                        >
                            ログアウト
                        </button>
                        )}
                    </div>
                </form>

                {message && <div className="text-center text-red-500">{message}</div>}
            </div>
        </div>
    )
}

export default Logout