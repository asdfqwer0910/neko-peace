import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Database } from "../../../../lib/database.types";
import Email from "@/app/components/Email";

// メール認証
const EmailPage = async () => {
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
        <Email email={session.user.email!} />
    )
}

export default EmailPage