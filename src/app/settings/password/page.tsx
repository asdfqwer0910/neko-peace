import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Database } from "../../../../lib/database.types";
import Password from "@/app/components/Password";


// パスワード変更
const PasswordPage = async () => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    // セッション取得
    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('auth/login')
    }

    return (
        <Password />
    )
}

export default PasswordPage