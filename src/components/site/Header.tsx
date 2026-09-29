import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/sih-logo.png";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";

const NAV = [
  ["Home", "/"], ["Shop", "/shop"], ["Shirts", "/shirts"], ["Pants", "/pants"],
  ["Gadgets", "/gadgets"], ["Sunglasses", "/sunglasses"], ["About", "/about"],
] as const;

export function Header({ overlay = false }: { overlay?: boolean }) {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const tone = overlay ? "text-contrast-foreground" : "text-foreground";
  return <header className={overlay ? "absolute inset-x-0 top-0 z-40" : "sticky top-0 z-40 border-b bg-background/95 backdrop-blur-xl"}>
    <div className={`page-shell grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:h-[4.5rem] ${tone}`}>
      <Link to="/" className="flex min-w-0 items-center" aria-label="SIH WEARS home">
        <img src={logo} alt="SIH WEARS" className={`h-11 w-auto shrink-0 object-contain sm:h-14 ${overlay ? "invert" : ""}`} />
      </Link>
      <nav className="ml-auto hidden min-w-0 items-center gap-5 xl:flex">
        {NAV.map(([label,to]) => <Link key={to} to={to} activeOptions={{exact:to==="/"}} className="border-b border-transparent py-2 text-[0.68rem] font-medium uppercase tracking-[0.12em] opacity-70 transition hover:opacity-100" activeProps={{className:"opacity-100 border-current"}}>{label}</Link>)}
      </nav>
      <div className="flex shrink-0 items-center gap-0.5 sm:ml-auto">
        <Button variant="ghost" size="icon" aria-label="Search products" onClick={()=>setSearch(v=>!v)} className={tone}><Search size={18} strokeWidth={1.5}/></Button>
        <Button asChild variant="ghost" size="icon" className={`${tone} hidden sm:inline-flex`}><Link to="/contact" aria-label="Account and contact"><UserRound size={18} strokeWidth={1.5}/></Link></Button>
        <Button variant="ghost" size="icon" aria-label="Open cart" onClick={()=>setOpen(true)} className={`relative ${tone}`}><ShoppingBag size={18} strokeWidth={1.5}/>{count>0&&<span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] text-primary-foreground">{count}</span>}</Button>
        <Button variant="ghost" size="icon" aria-label="Menu" onClick={()=>setMenu(v=>!v)} className={`${tone} xl:hidden`}>{menu?<X size={20}/>:<Menu size={20}/>}</Button>
      </div>
    </div>
    {search&&<div className="border-y bg-background text-foreground"><form className="page-shell flex h-14 items-center gap-3" onSubmit={e=>{e.preventDefault();setSearch(false);void navigate({to:"/shop",search:{q}})}}><Search size={17} className="shrink-0 text-muted-foreground"/><input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search the collection" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"/><Button size="sm" type="submit">Search</Button></form></div>}
    {menu&&<nav className="border-y bg-background px-4 py-4 text-foreground xl:hidden">{NAV.map(([label,to])=><Link key={to} to={to} onClick={()=>setMenu(false)} className="flex min-h-11 items-center border-b text-xs font-medium uppercase tracking-[0.14em] last:border-b-0">{label}</Link>)}<Link to="/contact" onClick={()=>setMenu(false)} className="flex min-h-11 items-center text-xs font-medium uppercase tracking-[0.14em]">Contact</Link></nav>}
  </header>;
}
