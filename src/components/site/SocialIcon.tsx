import type { LucideIcon } from "lucide-react";

export type SocialBrand = "instagram" | "facebook" | "youtube" | "tiktok" | "mail";

const BRAND_HOVER: Record<SocialBrand, string> = {
  instagram: "social-ig",
  facebook: "hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white",
  youtube: "hover:border-[#FF0000] hover:bg-[#FF0000] hover:text-white",
  tiktok: "social-tt",
  mail: "hover:border-primary hover:bg-primary hover:text-primary-foreground",
};

type Props = {
  icon: LucideIcon;
  label: string;
  href: string;
  brand: SocialBrand;
  tone?: "light" | "dark";
  size?: number;
};

export function SocialIcon({ icon: Icon, label, href, brand, tone = "light", size = 16 }: Props) {
  const isMail = href.startsWith("mailto:");
  return (
    <a
      href={href}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noreferrer"}
      aria-label={label}
      title={label}
      className={`group/social relative grid h-10 w-10 place-items-center border transition-all duration-300 hover:-translate-y-1 hover:scale-110 ${BRAND_HOVER[brand]} ${tone === "dark" ? "border-contrast-foreground/50 text-contrast-foreground" : "border-foreground text-foreground"}`}
    >
      <Icon size={size} strokeWidth={1.5} />
      <span
        className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap px-2.5 py-1 text-[0.58rem] font-bold uppercase opacity-0 transition-all duration-300 group-hover/social:translate-y-0 group-hover/social:opacity-100 group-focus-visible/social:translate-y-0 group-focus-visible/social:opacity-100 ${tone === "dark" ? "bg-contrast-foreground text-contrast" : "bg-primary text-primary-foreground"}`}
      >
        {label}
      </span>
    </a>
  );
}
