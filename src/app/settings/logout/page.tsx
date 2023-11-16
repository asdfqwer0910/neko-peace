import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "../../../../lib/database.types";
import { redirect } from "next/navigation";
import Logout from "@/app/components/Logout";

// ログアウトページ
const LogoutPage = async () => {
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
        <Logout />
    )
}

export default LogoutPage