import { CaptionGenerator } from "@/components/caption-generator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Bot, Palette, Hash, Pencil } from "lucide-react";
import Link from 'next/link';
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">CaptionCraft</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium" href="#">Home</Link>
            <Link className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium" href="#">Features</Link>
            <Link className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium" href="#">About</Link>
            <Link className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium" href="#">Contact</Link>
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <Link href="/auth">
              <Button>Generate Your Caption</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 md:py-32 text-center">
          <div className="container mx-auto px-4 sm:px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
             Viral captions, <span className="gradient-text">Gen Z vibes.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              AI that gets your vibe. Drop an image, get fire captions with the right emojis &amp; tags. Level up your social media game, no cap.
            </p>
            <div className="max-w-3xl mx-auto">
              <CaptionGenerator />
            </div>
          </div>
        </section>

        <section className="py-20 bg-background/50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Why You'll Vibe With CaptionCraft</h2>
              <p className="text-muted-foreground mt-2">Everything you need for content that slaps.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-primary/20 transition-all duration-300 border border-transparent hover:border-primary/30 flex flex-col items-start text-left">
                <div className="bg-green-500/10 text-green-400 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-green-500/20">
                  <Bot className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-card-foreground">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">Leverage advanced AI for unique, context-aware captions.</p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-primary/20 transition-all duration-300 border border-transparent hover:border-primary/30 flex flex-col items-start text-left">
                <div className="bg-purple-500/10 text-purple-400 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-purple-500/20">
                  <Palette className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-card-foreground">Mood Matching</h3>
                <p className="text-sm text-muted-foreground">Set the tone from playful to professional for the perfect vibe.</p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-primary/20 transition-all duration-300 border border-transparent hover:border-primary/30 flex flex-col items-start text-left">
                <div className="bg-blue-500/10 text-blue-400 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-blue-500/20">
                  <Hash className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-card-foreground">Emoji &amp; Hashtags</h3>
                <p className="text-sm text-muted-foreground">Get smart emoji and trending hashtag suggestions.</p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-primary/20 transition-all duration-300 border border-transparent hover:border-primary/30 flex flex-col items-start text-left">
                <div className="bg-pink-500/10 text-pink-400 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-pink-500/20">
                  <Pencil className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-card-foreground">Customizable</h3>
                <p className="text-sm text-muted-foreground">Easily edit and refine generated captions to your liking.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Your Caption, Ready to Glow Up</h2>
              <p className="text-muted-foreground mt-2">Here's an example of what CaptionCraft can do for you.</p>
            </div>
            <div className="bg-card border rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6">
                Chasing sunsets and dreams. ✨ This view never gets old. Feeling grateful for moments like these that take my breath away.
                <br/><br/>
                #SunsetLover #GoldenHour #MakingMemories #Wanderlust
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <Button className="flex-grow sm:flex-grow-0">
                  Copy Caption
                </Button>
                <Button variant="secondary" className="flex-grow sm:flex-grow-0">
                  Share
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">CaptionCraft</h1>
              </div>
              <p className="text-muted-foreground text-sm">Made for Gen Z, by Gen Z</p>
            </div>
            <div className="md:col-span-2">
              <div className="text-center md:text-right">
                <p className="text-lg font-semibold mb-4">Join our newsletter</p>
                <div className="flex flex-col sm:flex-row gap-2 max-w-md ml-auto">
                  <Input className="w-full h-12 px-4 rounded-lg border-border bg-background/80 text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-shadow duration-300" placeholder="you@email.com" type="email"/>
                  <Button className="h-12 shrink-0">Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-muted-foreground">© 2024 CaptionCraft. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link className="text-muted-foreground hover:text-primary" href="#">Terms</Link>
              <Link className="text-muted-foreground hover:text-primary" href="#">Privacy</Link>
              <Link className="text-muted-foreground hover:text-primary" href="#">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
