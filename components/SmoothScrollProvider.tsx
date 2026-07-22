// Native browser scrolling is used site-wide instead of a JS-driven
// smooth-scroll library (Lenis): under real trackpad/mouse wheel input
// its virtual scroll position could desync from actual scrollTop,
// causing scrolling to stall until several more wheel events "caught it
// up". Native scroll can't desync like that, and pairs with
// `scroll-behavior: smooth` in globals.css for anchor-link jumps.
export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
