import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Database } from "../../../../lib/database.types";
import ResetPassword from "@/app/components/Reset-Password";

const ResetPasswordPage = async () => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    // セッション取得
    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (session) {
        redirect('/')
    }

    return (
        <ResetPassword />
    )
}

export default ResetPasswordPage