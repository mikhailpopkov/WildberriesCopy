import { BadgeRussianRuble, MapPinSearch } from "lucide-react";
import { HeaderNavSections } from "./header-nav.data";
import Link from "next/link";

export const HeaderNav: React.FC = () => {
  return (
    <div className="max-w-375 mx-auto px-7 w-full flex items-center gap-3 justify-between">
      <button className="text-gray-300 hover:text-white flex items-center gap-2 text-sm p-1 bg-transparent rounded-xl hover:bg-white/20 transition-colors">
        <MapPinSearch size={18} />
        <span className="font-semibold">Location</span>
      </button>
      {HeaderNavSections && HeaderNavSections.length > 0 && (
        <nav>
          <ul className="flex gap-2">
            {HeaderNavSections.map((section) => (
              <li key={section.id}>
                <Link
                  href="#"
                  className="text-white font-medium text-sm p-1 bg-transparent rounded-xl hover:bg-white/20 transition-colors"
                >
                  {section.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <div className="flex gap-2 items-center">
        <button className="text-white text-sm uppercase p-1 bg-white/20 rounded-xl flex gap-1 items-center">
          <span>Кешбэк</span>
          <BadgeRussianRuble size={16} />
        </button>
        <span className="text-white text-sm uppercase p-1 bg-white/20 rounded-xl">
          rub
        </span>
      </div>
    </div>
  );
};
