import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "../../../../lib/database.types"
import { redirect } from "next/navigation"
import SingUp from "@/app/components/SignUp"

const SignupPage = async () => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (session) {
        redirect('/')
    }

  return (
    <SingUp />
  )
}

export default SignupPage