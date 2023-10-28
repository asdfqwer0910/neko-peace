"use client";

import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "../const";
import Button from "./Button";

const NavBar = () => {
  return (
  <nav className="flexBetween max-container padding-container relative z-30 py-5">
    <Link href="/">
      <Image src="/ねこぴーす.svg" alt="" width={74} height={29} />
    </Link>

    <ul className="hidden h-full gap-12 lg:flex">
      {NAV_LINKS.map((link) => (
        <Link href={link.href} key={link.key} className="regular-16 text-gray-500 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
          {link.label}
        </Link>
      ))}
    </ul>

    <div className="lg:flexCenter hidden">
      <Button 
        type="button"
        title="ログイン"
        icon="/User.svg"
        variant="btn_dark_green"
      />
    </div>

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
