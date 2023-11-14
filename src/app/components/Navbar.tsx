'use client'

import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "../const";
import Button from "./Button";
import type { Session } from "@supabase/auth-helpers-nextjs";
import type { Database } from "../../../lib/database.types";
import { useEffect } from "react";
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

  return (
  <nav className="flexBetween padding-container relative z-30 py-5 shadow">
    <Link href="/">
      <Image src="/ねこぴーす.svg" alt="" width={74} height={29} className="mx-10" />
    </Link>

    <ul className="hidden h-full gap-12 lg:flex">
      {NAV_LINKS.map((link) => (
        <Link href={link.href} key={link.key} className="regular-16 text-gray-500 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
          {link.label}
        </Link>
      ))}
    </ul>
    
    {session ?
    <div className="lg:flexCenter hidden">
      <Link href="/settings/profile">
        <Image 
          src={profile && profile.avatar_url ? profile.avatar_url : '/default.svg'}
          className="rounded-full object-cover mx-10"
          alt="avatar"
          width={50}
          height={50}
        />
      </Link>
    </div>
    :
    <div className="lg:flexCenter hidden">
      <Button
        type="button"
        title="ログイン"
        icon="/User.svg"
        variant="btn_dark_green"
      />
    </div>
    }

    <Image 
      src="/Menu.svg"
      alt="menu"
      width={32}
      height={32}
      className="inline-block cursor-pointer lg:hidden"
    />
  </nav>
  )
}

export default NavBar;
