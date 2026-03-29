"use client";

import Image from "next/image";
import { useState } from "react";
import type { CabinetPhoto } from "@/lib/ministers";
import { clsx } from "clsx";

type Props = {
  photo?: CabinetPhoto;
  fallbackLetter: string;
  alt: string;
  size: "sm" | "lg";
  isPrime?: boolean;
  className?: string;
};

const dim = { sm: 48, lg: 112 } as const;

export default function CabinetMemberPhoto({
  photo,
  fallbackLetter,
  alt,
  size,
  isPrime,
  className,
}: Props) {
  const [showImage, setShowImage] = useState(Boolean(photo?.url));
  const d = dim[size];

  if (!showImage || !photo?.url) {
    return (
      <div
        className={clsx(
          "shrink-0 flex items-center justify-center rounded-2xl text-white font-extrabold tabular-nums select-none",
          size === "sm" ? "w-12 h-12 text-lg rounded-full" : "w-28 h-28 text-3xl",
          isPrime
            ? "bg-gradient-to-br from-blue-600 to-indigo-700"
            : "bg-gradient-to-br from-slate-600 to-slate-800",
          className,
        )}
        aria-hidden={!photo?.url}
      >
        {fallbackLetter}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "relative shrink-0 overflow-hidden rounded-2xl border border-(--border) bg-(--secondary)",
        size === "sm" ? "w-12 h-12 rounded-full" : "w-28 h-28",
        className,
      )}
    >
      <Image
        src={photo.url}
        alt={alt}
        width={d}
        height={d}
        className="object-cover w-full h-full"
        sizes={size === "sm" ? "48px" : "112px"}
        onError={() => setShowImage(false)}
      />
    </div>
  );
}
