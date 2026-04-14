"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { headerSections } from "./header.data";
import { HeaderNav } from "./HeaderNav";

export const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <header className="py-4 bg-linear-to-r from-[#ed3cca] via-[#bf22e1] to-[#8306f7] flex flex-col gap-4">
      <HeaderNav />
      <div className="flex gap-3 items-center max-w-375 mx-auto px-7 w-full">
        <Link href="/" className="shrink-0">
          <Image
            loading="eager"
            src="/logo.svg"
            alt="Wildberries"
            width={216}
            height={60}
          />
        </Link>
        <button className="border border-white flex items-center justify-center w-14.5 h-14.5 rounded-2xl cursor-pointer shrink-0">
          <span className="w-6.5 h-0.75 bg-white rounded-xs after:content-[''] after:block after:w-6.5 after:h-0.75 after:bg-white after:-translate-y-2.5 after:rounded-xs before:content-[''] before:block before:w-6.5 before:h-0.75 before:bg-white before:translate-y-1.75 before:rounded-xs"></span>
        </button>
        <input
          className="bg-white rounded-2xl placeholder:text-gray-500 py-4 px-5 outline-0 w-full font-medium"
          type="text"
          placeholder="Найти на Wildberries"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="flex gap-4 items-center">
          {headerSections &&
            headerSections.map((section) => (
              <button
                key={section.id}
                className="flex flex-col items-center gap-1 text-white group"
              >
                <section.icons size={20} />
                <span className="opacity-75 group-hover:opacity-100 transition-opacity">
                  {section.title}
                </span>
              </button>
            ))}
        </div>
      </div>
    </header>
  );
};
