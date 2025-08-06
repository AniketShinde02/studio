"use client";

import { useAuthModal } from "@/context/AuthModalContext";
import { CaptionGenerator } from "@/components/caption-generator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Bot, Palette, Hash, Pencil, Menu } from "lucide-react";
import Link from 'next/link';
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Home() {
  const { setOpen } = useAuthModal();

  return (
    <>
      <div className="min-h-screen flex flex-col font-sans bg-[var(--background-color)]">
        <header className="bg-[var(--background-color)]/80 backdrop-blur-lg sticky top-0 z-50 border-b border-[var(--border-color)]">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] p-2.5 rounded-xl shadow-lg shadow-indigo-500/20">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-wide">CaptionCraft</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-10">
              <Link className="text-base font-medium text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-300" href="/#features">Features</Link>
              <Link className="text-base font-medium text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-300" href="/about">About</Link>
              <Link className="text-base font-medium text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-300" href="/contact">Contact</Link>
            </nav>
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" onClick={() => setOpen(true)} className="text-base font-medium text-[var(--text-secondary)] hover:text-[var(--primary-color)]">Log In</Button>
              <Button onClick={() => setOpen(true)} className="button-primary">Sign Up Free</Button>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-slate-300">
                  <Menu className="w-7 h-7" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="flex flex-col gap-6 mt-8">
                  <Link className="text-lg font-medium text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-300" href="/#features">Features</Link>
                  <Link className="text-lg font-medium text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-300" href="/about">About</Link>
                  <Link className="text-lg font-medium text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-300" href="/contact">Contact</Link>
                  <Button variant="ghost" onClick={() => setOpen(true)} className="text-lg justify-start font-medium text-[var(--text-secondary)] hover:text-[var(--primary-color)]">Log In</Button>
                  <Button onClick={() => setOpen(true)} className="button-primary w-full">Sign Up Free</Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <main className="flex-grow">
          <section className="py-28 md:py-40 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-slate-800/20 [mask-image:linear-gradient(to_bottom,white_0%,transparent_70%)]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background-color)]"></div>
            <div className="container mx-auto px-6 relative">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tighter">
                Generate <span className="gradient-text">Viral Captions</span><br /> in Seconds
              </h1>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-12">
                Stop guessing. Start impressing. CaptionCraft analyzes your image and generates compelling captions that boost engagement and reflect your unique brand voice.
              </p>
              <div className="max-w-5xl mx-auto">
                <CaptionGenerator />
              </div>
            </div>
          </section>

          <section id="features" className="py-24 bg-black/20">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The Ultimate Caption Toolkit</h2>
                <p className="text-[var(--text-secondary)] mt-4 text-lg max-w-2xl mx-auto">From hashtags to tone-matching, everything you need for content that connects.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-[var(--surface-color)] p-8 rounded-2xl border border-[var(--border-color)] transform hover:-translate-y-2 transition-transform duration-300 shadow-lg shadow-black/20">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg w-12 h-12 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
                    <Bot className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Contextual AI</h3>
                  <p className="text-base text-[var(--text-secondary)]">Our AI understands your image and video content, not just keywords.</p>
                </div>
                <div className="bg-[var(--surface-color)] p-8 rounded-2xl border border-[var(--border-color)] transform hover:-translate-y-2 transition-transform duration-300 shadow-lg shadow-black/20">
                  <div className="bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-lg w-12 h-12 flex items-center justify-center mb-6 shadow-lg shadow-pink-500/30">
                    <Palette className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Tone Matching</h3>
                  <p className="text-base text-[var(--text-secondary)]">Choose a voice that aligns perfectly with your brand identity.</p>
                </div>
                <div className="bg-[var(--surface-color)] p-8 rounded-2xl border border-[var(--border-color)] transform hover:-translate-y-2 transition-transform duration-300 shadow-lg shadow-black/20">
                  <div className="bg-gradient-to-br from-sky-500 to-cyan-500 text-white rounded-lg w-12 h-12 flex items-center justify-center mb-6 shadow-lg shadow-sky-500/30">
                    <Hash className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Smart Hashtags</h3>
                  <p className="text-base text-[var(--text-secondary)]">Get relevant, trending hashtags to maximize your reach.</p>
                </div>
                <div className="bg-[var(--surface-color)] p-8 rounded-2xl border border-[var(--border-color)] transform hover:-translate-y-2 transition-transform duration-300 shadow-lg shadow-black/20">
                  <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-lg w-12 h-12 flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30">
                    <Pencil className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Easy Customization</h3>
                  <p className="text-base text-[var(--text-secondary)]">Fine-tune every suggestion to make your captions truly yours.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Your Generated Output</h2>
                <p className="text-[var(--text-secondary)] mt-4 text-lg max-w-2xl mx-auto">See the magic happen. Here’s an example of your new caption and hashtags.</p>
              </div>
              <div className="bg-gradient-to-br from-[var(--surface-color)] to-slate-800/60 rounded-2xl shadow-2xl shadow-black/30 p-8 md:p-12 max-w-5xl mx-auto border border-[var(--border-color)]">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-2">
                    <p className="text-lg md:text-xl text-slate-200 leading-relaxed mb-6 font-medium">
                      Chasing horizons and embracing the glow. ✨ Every sunset paints a story of gratitude and wonder. Couldn't ask for a better view to end the day.
                    </p>
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                      <p className="text-slate-300 font-mono text-sm">#SunsetVibes #GoldenHourGlow #NaturePerfection #WanderlustLife #ChasingLight #MomentOfPeace</p>
                    </div>
                  </div>
                  <div className="md:col-span-1 flex flex-col gap-4">
                    <Button className="button-primary flex items-center justify-center gap-2 w-full">
                      Copy
                    </Button>
                    <Button variant="secondary" className="button-secondary flex items-center justify-center gap-2 w-full">
                      Share
                    </Button>
                    <Button variant="secondary" className="button-secondary flex items-center justify-center gap-2 w-full bg-slate-700/50 border-[var(--border-color)] hover:bg-slate-700">
                      Regenerate
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-slate-900/70 border-t border-[var(--border-color)]">
          <div className="container mx-auto px-6 py-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="col-span-full lg:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] p-2.5 rounded-xl">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-[var(--text-primary)]">CaptionCraft</h1>
                </div>
                <p className="text-[var(--text-secondary)] text-sm max-w-xs">The future of social media content creation, powered by AI.</p>
              </div>
              <div className="col-span-1">
                <h3 className="font-semibold text-slate-200 mb-4 tracking-wider uppercase text-sm">Product</h3>
                <nav className="flex flex-col gap-3">
                  <Link className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-200" href="/#features">Features</Link>
                  <Link className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-200" href="/about">About</Link>
                  <Link className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-200" href="/contact">Contact</Link>
                </nav>
              </div>
              <div className="col-span-1">
                <h3 className="font-semibold text-slate-200 mb-4 tracking-wider uppercase text-sm">Company</h3>
                <nav className="flex flex-col gap-3">
                  <Link className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-200" href="/about">About Us</Link>
                  <Link className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-200" href="#">Blog</Link>
                  <Link className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-200" href="#">Careers</Link>
                  <Link className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-200" href="/contact">Contact</Link>
                </nav>
              </div>
              <div className="col-span-full lg:col-span-1">
                <h3 className="font-semibold text-slate-200 mb-4 tracking-wider uppercase text-sm">Join Our Newsletter</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">Get weekly insights and product updates.</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input className="w-full h-12 px-4 rounded-lg border border-[var(--border-color)] bg-slate-800 text-white focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-all duration-300" placeholder="your@email.com" type="email" />
                  <Button className="button-primary h-12 shrink-0">Subscribe</Button>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center text-sm">
              <p className="text-[var(--text-secondary)]">© 2024 CaptionCraft. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <Link className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-200" href="#">Terms</Link>
                <Link className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-200" href="#">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
