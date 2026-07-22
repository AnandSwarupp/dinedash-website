import Link from "next/link";
import { Zap, ChefHat, QrCode, BarChart3 } from "lucide-react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import QRCode from "qrcode";
import { Reveal } from "@/components/Reveal";

// TODO: replace with the live App Store URL once the app is published
const APP_STORE_URL = "https://apps.apple.com/app/dinedash";
// TODO: replace with the live Google Play URL once the app is published
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.dinedash.app";

const perks = [
  { icon: ChefHat, text: "30-day free trial via App Store or Google Play" },
  { icon: QrCode, text: "QR codes ready to print in minutes" },
  { icon: BarChart3, text: "Live dashboard from day one" },
  { icon: Zap, text: "Go live in under 1 hour" },
];

export default async function GetStartedClient() {
  const [appStoreQrDataUrl, playStoreQrDataUrl] = await Promise.all([
    QRCode.toDataURL(APP_STORE_URL, { width: 220, margin: 1 }),
    QRCode.toDataURL(PLAY_STORE_URL, { width: 220, margin: 1 }),
  ]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-green-100 dark:bg-green-500/5 rounded-full opacity-40 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-amber-100 dark:bg-amber-500/5 rounded-full opacity-30 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left: info */}
            <Reveal className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2.5 mb-8">
                <div className="w-8 h-8 bg-[var(--brand)] rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-[#0F1623] fill-[#0F1623]" />
                </div>
                <span className="text-[15px] font-semibold tracking-tight text-[var(--text-primary)]">
                  Dine<span className="text-[var(--brand)]">Dash</span>
                </span>
              </Link>

              <h1 className="headline-lg text-[var(--text-primary)] mb-4">
                Start your<br />
                <span className="gradient-text">free 30-day trial</span>
              </h1>
              <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                Join hundreds of restaurants already using DineDash to increase table turnover. Download the app and approve the subscription in the App Store or Google Play to start your free trial.
              </p>

              <div className="space-y-4">
                {perks.map((perk) => (
                  <div key={perk.text} className="flex items-center gap-3">
                    <div className="icon-tile w-9 h-9 rounded-xl">
                      <perk.icon className="w-4 h-4" />
                    </div>
                    <span className="text-[var(--text-secondary)] text-sm font-medium">{perk.text}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right: app download */}
            <Reveal delay={0.1} className="lg:col-span-3">
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 md:p-10 shadow-sm">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Get the DineDash app</h2>
                <p className="text-[var(--text-secondary)] text-sm mb-8 leading-relaxed">
                  Available on iPhone and Android. Download the app and approve the 30-day free trial subscription to get your restaurant live.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[var(--surface-dark)] text-white font-semibold px-6 py-3.5 rounded-2xl flex items-center justify-center gap-3 hover:opacity-90 transition-opacity duration-300"
                  >
                    <FaApple className="w-7 h-7 text-white flex-shrink-0" />
                    <div className="text-left">
                      <div className="text-white/60 text-xs">Download on the</div>
                      <div className="text-base">App Store</div>
                    </div>
                  </a>
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[var(--surface-dark)] text-white font-semibold px-6 py-3.5 rounded-2xl flex items-center justify-center gap-3 hover:opacity-90 transition-opacity duration-300"
                  >
                    <FaGooglePlay className="w-6 h-6 text-white flex-shrink-0" />
                    <div className="text-left">
                      <div className="text-white/60 text-xs">Get it on</div>
                      <div className="text-base">Google Play</div>
                    </div>
                  </a>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 bg-[var(--surface-alt)] border border-[var(--border)] rounded-2xl p-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={appStoreQrDataUrl}
                      alt="QR code to download DineDash on the App Store"
                      width={96}
                      height={96}
                      className="rounded-lg bg-white p-2 flex-shrink-0"
                    />
                    <div>
                      <div className="font-semibold text-[var(--text-primary)] text-sm mb-1">App Store</div>
                      <p className="text-[var(--text-muted)] text-xs leading-relaxed">
                        Scan to open the App Store listing.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-[var(--surface-alt)] border border-[var(--border)] rounded-2xl p-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={playStoreQrDataUrl}
                      alt="QR code to download DineDash on Google Play"
                      width={96}
                      height={96}
                      className="rounded-lg bg-white p-2 flex-shrink-0"
                    />
                    <div>
                      <div className="font-semibold text-[var(--text-primary)] text-sm mb-1">Google Play</div>
                      <p className="text-[var(--text-muted)] text-xs leading-relaxed">
                        Scan to open the Google Play listing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
