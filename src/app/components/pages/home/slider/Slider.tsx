"use client";

import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface SliderProps {
  className?: string;
  data: SliderItem[];
}

interface SliderItem {
  id: number;
  src: string;
  alt: string;
  link: string;
}

export const Slider: React.FC<SliderProps> = ({ className, data }) => {
  const [visibleSlides, setVisibleSlides] = useState(0);

  const prevSlide = () => {
    setVisibleSlides((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const nextSlide = () => {
    setVisibleSlides((prev) => (prev < data.length - 1 ? prev + 1 : prev));
  };

  return (
    <div
      className={clsx(
        "relative w-full group hover:brightness-[0.9] transition-all",
        className,
      )}
    >
      <div className="overflow-hidden w-full rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${visibleSlides * 100}%)`,
          }}
        >
          {data.map((slide) => (
            <Link key={slide.id} href={slide.link} className="w-full shrink-0">
              <Image
                className="h-auto w-full object-cover"
                src={slide.src}
                alt={slide.alt}
                width={1440}
                height={300}
              />
            </Link>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-gray-200 p-2"
      >
        <ArrowLeft size={18} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-gray-200 p-2"
      >
        <ArrowRight size={18} />
      </button>
    </div>
  );
};
