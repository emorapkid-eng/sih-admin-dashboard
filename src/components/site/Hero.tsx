import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import videoMp4 from "@/assets/hero-campaign.mp4";
import poster from "@/assets/hero-campaign-poster.jpg";
import { Header } from "./Header";
import { Button } from "@/components/ui/button";
export function Hero(){return <section className="relative flex min-h-[calc(100svh-2.6rem)] flex-col overflow-hidden border-b-2 border-foreground bg-contrast text-contrast-foreground sm:min-h-[calc(100svh-2.9rem)]">
  <img src={poster} alt="" aria-hidden fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[68%_center]"/>
  <video className="absolute inset-0 h-full w-full object-cover object-[68%_center] motion-reduce:hidden" autoPlay muted loop playsInline preload="auto" poster={poster} aria-label="SIH Wears Karachi Heritage Hoodie campaign"><source src={videoMp4} type="video/mp4"/></video>
  <div className="absolute inset-0 bg-gradient-to-r from-contrast/90 via-contrast/55 to-transparent"/><div className="absolute inset-0 bg-gradient-to-t from-contrast/55 via-transparent to-contrast/25"/><Header overlay/>
  <div className="page-shell relative flex w-full flex-1 items-end pb-12 pt-28 sm:pb-20 sm:pt-32"><div className="reveal-up max-w-[14rem] sm:max-w-none">
    <p className="mb-4 text-[0.68rem] font-bold uppercase text-contrast-foreground/80">SIH WEARS</p>
    <h1 className="text-[3.2rem] font-extrabold uppercase leading-[0.88] sm:text-8xl lg:text-9xl">Wear<br/>Your Style</h1>
    <p className="mt-5 max-w-lg border-l-2 border-contrast-foreground pl-4 text-sm font-medium leading-6 text-contrast-foreground/85 sm:mt-6 sm:text-base">Streetwear with a story. Introducing our first heritage-inspired collection.</p>
    <Button asChild variant="inverse" size="lg" className="mt-7"><Link to="/shop">Shop the First Drop <ArrowRight size={16}/></Link></Button>
  </div></div>
  <div className="absolute bottom-5 right-4 text-[0.62rem] uppercase tracking-[0.18em] text-contrast-foreground/65 sm:right-8">Est. 2026</div>
</section>}
