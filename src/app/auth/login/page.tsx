import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Database } from "../../../../lib/database.types";
import Login from "@/app/components/Login";

const LoginPage = async () => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if(session) {
        redirect('/')
    }

    return(
        <Login />
    )
}

export default LoginPage