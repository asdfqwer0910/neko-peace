'use client'

import Image from "next/image";
import Link from "next/link";
import { DROPDOWN, NAV_LINKS } from "../const";
import Button from "./Button";
import type { Session } from "@supabase/auth-helpers-nextjs";
import type { Database } from "../../../lib/database.types";
import { useEffect, useState } from "react";
import useStore from "../../../store";
type ProfileType = Database['public']['Tables']['profiles']['Row']

const NavBar = ({
  session, profile
}: { 
  session: Session | null 
  profile: ProfileType | null
}) => {
  const { setUser } = useStore()
  // 状態管理にユーザー情報保存
  useEffect(() => {
    setUser({
      id: session ? session.user.id : '',
      email: session ? session.user.email! : '',
      username: session && profile ? profile.username : '',
      last_name: session && profile ? profile.last_name : '',
      first_name: session && profile ? profile.first_name : '',
      address: session && profile ? profile.address : '',
      avatar_url: session && profile ? profile.avatar_url : '',
    })
  }, [session, setUser, profile])

  const [ isOpen, setIsOpen ] = useState(false)
  console.log(isOpen)

  return (
  <nav className="flexBetween px-6 lg:px-20 xl:px-20 relative z-30 py-5 h-[90px] shadow">
    <div className="relative w-32 h-full">
      <Link href="/">
        <Image src="/Logo.svg" alt="logo" fill />
      </Link>
    </div>

    <ul className="hidden h-full gap-12 lg:flex">
      {NAV_LINKS.map((link) => (
        <Link href={link.href} key={link.key} className="regular-16 text-gray-500 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
          {link.label}
        </Link>
      ))}
    </ul>
    
    {session ?
    <div className="lg:flexCenter hidden">
      <button onClick={() => setIsOpen((prev) => !prev)}>
        <div className="relative w-12 h-12">
          <Image 
            src={profile && profile.avatar_url ? profile.avatar_url : '/default.svg'}
            className="border-2 rounded-full object-cover"
            alt="avatar"
            fill
          />
        </div>
      </button>

      {isOpen && (
        <div className='absolute top-20 flex flex-col py-2 border rounded bg-white animate-scale-up-ver-top'>
          {DROPDOWN.map((link) => (
            <Link href={link.href} className="py-2 px-3 font-semibold hover:bg-blue-600 hover:text-white">
                <Image 
                  src={link.image}
                  alt="icon"
                  width={23}
                  height={23}
                  className="inline-block mr-2"
                />
                {link.label}
            </Link>
          ))}
        </div>
      )}

      <ul className="md:hidden bg-white absolute w-full h-full bottom-0">

      </ul>
    </div>
    :
    <div className="lg:flexCenter hidden mx-10">
      <Button
        type="button"
        title="ログイン"
        icon="/User.svg"
        variant="btn_dark_green"
      />
    </div>
    }
  </nav>
  )
}

export default NavBar;
