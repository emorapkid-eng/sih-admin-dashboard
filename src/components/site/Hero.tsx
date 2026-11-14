import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import videoAsset from "@/assets/navy_hoodie_hero.mp4.asset.json";
import posterAsset from "@/assets/navy_hoodie_poster.jpg.asset.json";
const videoMp4 = videoAsset.url;
const poster = posterAsset.url;
import { Header } from "./Header";
import { Button } from "@/components/ui/button";
export function Hero(){return <section className="relative flex min-h-[calc(100svh-2.6rem)] flex-col overflow-hidden border-b-2 border-foreground bg-contrast text-contrast-foreground sm:min-h-[calc(100svh-2.9rem)]">
  <img src={poster} alt="" aria-hidden fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[40%_center] sm:object-[70%_center]"/>
  <video className="absolute inset-0 h-full w-full object-cover object-[40%_center] motion-reduce:hidden sm:object-[70%_center]" autoPlay muted loop playsInline preload="auto" poster={poster} aria-label="SIH Wears campaign"><source src={videoMp4} type="video/mp4"/></video>
  <div className="absolute inset-0 bg-overlay-strong"/><div className="absolute inset-0 bg-gradient-to-t from-contrast/70 via-transparent to-contrast/30"/><Header overlay/>
  <div className="page-shell relative flex w-full flex-1 items-end pb-12 pt-28 sm:pb-20 sm:pt-32"><div className="reveal-up max-w-3xl"><p className="mb-4 text-[0.68rem] font-bold uppercase text-contrast-foreground/80">SIH WEARS / New Collection</p><h1 className="text-[3.4rem] font-extrabold uppercase leading-[0.86] sm:text-8xl lg:text-9xl">Wear Your<br/>Style</h1><p className="mt-6 max-w-lg border-l-2 border-contrast-foreground pl-4 text-sm font-medium leading-6 text-contrast-foreground/85 sm:text-base">Premium essentials designed for modern men who refuse to compromise on style, quality, or individuality.</p><Button asChild variant="inverse" size="lg" className="mt-8"><Link to="/shop">Shop Collection <ArrowRight size={16}/></Link></Button></div></div>
  <div className="absolute bottom-5 right-4 text-[0.62rem] uppercase tracking-[0.18em] text-contrast-foreground/65 sm:right-8">Est. 2024</div>
</section>}
