import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageIntro } from "@/components/site/PageIntro";
import { Shell, meta } from "@/components/site/Shell";
import { Button } from "@/components/ui/button";
import { STORE } from "@/lib/shop";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => meta("Contact — SIH WEARS", "Get in touch with SIH Wears about orders, sizing, returns and NayaPay payments."),
  component: Contact,
});

const input = "mt-2 w-full border bg-background px-4 py-3 text-sm outline-none focus:border-foreground";

function Contact() {
  const [sent, setSent] = useState(false);
  const cards = [
    ["Orders", "Place an order through checkout — it is confirmed over WhatsApp."],
    ["WhatsApp", <a key="w" href={`https://wa.me/${STORE.whatsappNumber}`} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">0302 2281109</a>],
    ["Email", <a key="e" href="mailto:sih.wears@gmail.com" className="break-all underline-offset-4 hover:underline">sih.wears@gmail.com</a>],
    ["Returns", "3-day return policy on unworn items."],
  ] as const;
  return (
    <Shell>
      <PageIntro eyebrow="Contact" title="Get In Touch" />
      <section className="page-shell section-space">
        <div className="grid border border-foreground sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(([t, d], index) => (
            <Reveal key={t} delay={(index % 4) as 0 | 1 | 2 | 3} className={`bg-background p-6 sm:p-8 ${index ? "border-t border-foreground sm:border-l sm:border-t-0" : ""} ${index === 2 ? "sm:border-l-0 lg:border-l" : ""}`}>
              <p className="eyebrow">{t}</p>
              <div className="mt-3 text-sm text-muted-foreground">{d}</div>
            </Reveal>
          ))}
        </div>
        <Reveal><form className="mt-12 max-w-xl space-y-5 border-t-2 border-foreground pt-8" onSubmit={(e) => { e.preventDefault(); e.currentTarget.reset(); setSent(true); }}>
          <div><label className="eyebrow" htmlFor="name">Full name</label><input required id="name" className={input} /></div>
          <div><label className="eyebrow" htmlFor="contact">Email or phone</label><input required id="contact" className={input} /></div>
          <div><label className="eyebrow" htmlFor="message">Message</label><textarea required id="message" rows={5} className={input} /></div>
          <Button type="submit" size="lg">Send Message</Button>
          {sent && <p className="text-sm">Thank you — we'll get back to you soon.</p>}
        </form></Reveal>
      </section>
    </Shell>
  );
}
