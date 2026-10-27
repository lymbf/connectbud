import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowRightIcon } from "@/components/UI/icons";
import { cn } from "@/utils/cn";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

/** Link tekstowy ze strzałką – podkreślenie wysuwa się, a strzałka przesuwa po najechaniu. */
export function ArrowLink({ href, children, className }: ArrowLinkProps) {
  return (
    <Link href={href} className={cn("group/link inline-flex items-center gap-2 text-sm font-semibold", className)}>
      <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-out group-hover/link:after:scale-x-100">
        {children}
      </span>
      <ArrowRightIcon
        size={16}
        className="transition-transform duration-300 ease-out group-hover/link:translate-x-1"
      />
    </Link>
  );
}
