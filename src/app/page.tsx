import { CaptionGenerator } from "@/components/caption-generator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#BFFF00_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10"></div>
      
      <div className="w-full max-w-3xl space-y-6 text-center">
        <h1 className="text-5xl font-black tracking-tighter sm:text-6xl md:text-7xl bg-gradient-to-br from-primary via-[#BFFF00] to-accent bg-clip-text text-transparent">
          Caption Generator
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-foreground/80 sm:text-xl">
          Don't just post. Post with personality. <br/>Unleash viral captions in seconds—made for Gen Z.
        </p>
      </div>

      <div className="w-full max-w-2xl mt-12">
        <CaptionGenerator />
      </div>

      <footer className="py-8 mt-auto text-center text-sm text-foreground/50">
        <p>Built with <span className="text-primary">♥</span> for the creators.</p>
      </footer>
    </main>
  );
}
