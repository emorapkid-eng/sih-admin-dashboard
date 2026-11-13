import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import videoAsset from "@/assets/navy_hoodie_hero.mp4.asset.json";
import posterAsset from "@/assets/navy_hoodie_poster.jpg.asset.json";
const videoMp4 = videoAsset.url;
const poster = posterAsset.url;
import { Header } from "./Header";
import { Button } from "@/components/ui/button";
export function Hero(){return <section className="relative min-h-[90svh] overflow-hidden border-b-2 border-foreground bg-contrast text-contrast-foreground sm:min-h-[92svh]">
  <img src={poster} alt="" aria-hidden fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[58%_center] sm:object-center"/>
  <video className="absolute inset-0 h-full w-full object-cover object-[58%_center] motion-reduce:hidden sm:object-center" autoPlay muted loop playsInline preload="auto" poster={poster} aria-label="SIH Wears campaign"><source src={videoMp4} type="video/mp4"/></video>
  <div className="absolute inset-0 bg-overlay-strong"/><div className="absolute inset-0 bg-gradient-to-t from-contrast/70 via-transparent to-contrast/30"/><Header overlay/>
  <div className="page-shell relative flex min-h-[90svh] items-end pb-14 pt-28 sm:min-h-[92svh] sm:pb-20"><div className="reveal-up max-w-3xl"><p className="mb-4 text-[0.68rem] font-bold uppercase text-contrast-foreground/80">SIH WEARS / New Collection</p><h1 className="text-5xl font-extrabold uppercase leading-[0.88] sm:text-7xl lg:text-8xl">Wear Your<br/>Style</h1><p className="mt-5 max-w-md border-l-2 border-contrast-foreground pl-4 text-sm font-medium leading-6 text-contrast-foreground/85 sm:text-base">Premium essentials designed for modern men who refuse to compromise on style, quality, or individuality.</p><Button asChild variant="inverse" size="lg" className="mt-7"><Link to="/shop">Shop Collection <ArrowRight size={16}/></Link></Button></div></div>
  <div className="absolute bottom-5 right-4 text-[0.62rem] uppercase tracking-[0.18em] text-contrast-foreground/65 sm:right-8">Est. 2024</div>
</section>}
