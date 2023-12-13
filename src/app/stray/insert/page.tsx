import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "../../../../lib/database.types"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import StrayInsert from "@/app/components/StrayInsert"

const StrayInsertPage = async () => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('auth/login')
    }

    return (
        <StrayInsert />
    )
}

export default StrayInsertPage