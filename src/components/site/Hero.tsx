import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import videoMp4 from "@/assets/sih-campaign-hero.mp4";
import videoWebm from "@/assets/sih-campaign-hero.webm";
import poster from "@/assets/sih-campaign-hero-poster.jpg";
import { Header } from "./Header";
import { Button } from "@/components/ui/button";
export function Hero(){return <section className="relative min-h-[90svh] overflow-hidden bg-contrast text-contrast-foreground sm:min-h-[92svh]">
  <img src={poster.url} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover object-[58%_center] sm:object-center"/>
  <video className="absolute inset-0 h-full w-full object-cover object-[58%_center] motion-reduce:hidden sm:object-center" autoPlay muted loop playsInline preload="metadata" poster={poster.url} aria-label="SIH Wears campaign"><source src={videoWebm.url} type="video/webm"/><source src={videoMp4.url} type="video/mp4"/></video>
  <div className="absolute inset-0 bg-overlay-strong"/><div className="absolute inset-0 bg-gradient-to-t from-contrast/70 via-transparent to-contrast/30"/><Header overlay/>
  <div className="page-shell relative flex min-h-[90svh] items-end pb-14 pt-28 sm:min-h-[92svh] sm:pb-20"><div className="reveal-up max-w-3xl"><p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-contrast-foreground/75">SIH WEARS / New Collection</p><h1 className="text-5xl font-bold uppercase leading-[0.88] tracking-normal sm:text-7xl lg:text-8xl">Wear Your<br/>Style</h1><p className="mt-5 max-w-md text-sm leading-6 text-contrast-foreground/80 sm:text-base">Premium essentials designed for modern men who refuse to compromise on style, quality, or individuality.</p><Button asChild variant="inverse" size="lg" className="mt-7"><Link to="/shop">Shop Collection <ArrowRight size={16}/></Link></Button></div></div>
  <div className="absolute bottom-5 right-4 text-[0.62rem] uppercase tracking-[0.18em] text-contrast-foreground/65 sm:right-8">Est. 2024</div>
</section>}
