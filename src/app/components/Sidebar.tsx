"use client";
import { AiFillHome } from "react-icons/ai";
import { FaShieldCat, FaClipboardQuestion } from "react-icons/fa6";
import { FaCat } from "react-icons/fa";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = () => {
  const segment = useSelectedLayoutSegment();
  const sidebarOptions = [
    {
      name: "ホーム",
      href: "/home",
      icon: AiFillHome,
      current: !segment ? true : false,
    },
    {
      name: "譲渡猫",
      href: "/home/rescue",
      icon: FaShieldCat,
      current: `/${segment}` === "/rescue" ? true : false,
    },
    {
      name: "迷い猫",
      href: "/home/stray",
      icon: FaCat,
      current: `/${segment}` === "/stray" ? true : false,
    },
    {
      name: "検討中",
      href: "/home/consider",
      icon: FaClipboardQuestion,
      current: `/${segment}` === "/consider" ? true : false,
    },
  ];

  return (
    <div className="flex">
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gapy-y-5 overflow-y-auto bg-white px-6 pb-4 border-r-2">
          <div className="flex h-40 shrink-0 items-center">
            <h1 className="text-3xl font-bold">🐱ねこぴーす🐱</h1>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-2">
                  {sidebarOptions.map((option) => (
                    <li key={option.name}>
                      <Link
                        href={option.href}
                        className={classNames(
                          option.current
                            ? "bg-gray-700 text-white"
                            : "text-gray-700 hover:text-white hover:bg-gray-700",
                          "group flex gap-x-3 rounded-md p-2 text-base leading-6 font-semibold"
                        )}
                      >
                        <option.icon className="text-gray-300 group-hover:text-white h-6 w-6 shrink-0" />
                        {option.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
