'use client'

import { useRouter } from "next/navigation";
import supabase from "../../../utils/supabase"
import Link from "next/link";

const SingUp = () => {
    const router = useRouter();

    const onSubmit = async(email: string, password: string) => {
        try {
            const { error:signUpError } = await supabase.auth.signUp(
                { email, password },
            );
            if(signUpError) {
                throw signUpError;
            }
            await router.push("/confirme");
        } catch (error) {
            alert("エラーが発生しました");
        }
    };
    
  return (
    <div className="min-h-full flex items-center justify-center mt-16 mb-32">
        <div className="max-w-lg w-full space-y-8">
            <h2 className="text-center text-2xl font-bold">新規会員登録</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email" className="text-md font-bold">メールアドレス</label>
                    <input type="email" autoComplete="none" required className="relative appearance-none rounded-md border block w-full px-3 py-3 mb-10" placeholder="nekopeace@example.com" />
                </div>
                <div>
                    <label htmlFor="password" className="text-md font-bold">パスワード</label>
                    <input type="password" autoComplete="none" required className="relative appearance-none rounded-md border block w-full px-3 py-3 mb-10" />
                </div>
                <div>
                    <label htmlFor="passwordconf" className="text-md font-bold">パスワードの確認</label>
                    <input type="password" autoComplete="none" required className="relative appearance-none rounded-md border block w-full px-3 py-3 mb-10" />
                </div>
                <div>
                    <button className="group flex relative w-full justify-center border bg-blue-500 border-transparent py-3 rounded-md font-bold text-white mb-5">次へ</button>
                </div>
                <div>
                    <Link href="/signup" className="flex items-center justify-center text-blue-500">
                        アカウントをお持ちの方はこちら
                    </Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SingUp