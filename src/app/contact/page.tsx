import Link from 'next/link';
import { Sparkles, Menu, Mail, MapPin, Twitter, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary font-sans bg-grid-gray-700/[0.2]">
      <header className="bg-black bg-opacity-30 backdrop-blur-lg sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] p-2.5 rounded-xl">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">CaptionCraft</h1>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-lg">
            <Link className="text-text-secondary hover:text-white transition-colors duration-300" href="/#features">Features</Link>
            <Link className="text-text-secondary hover:text-white transition-colors duration-300" href="/about">About</Link>
            <Link className="text-white font-semibold" href="/contact">Contact</Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Button variant="secondary" className="button_secondary">Log in</Button>
            <Button className="bg-[var(--primary-color)] hover:bg-[var(--accent-color)] text-white font-bold py-2 px-4 rounded-lg focus:outline-none">Sign up</Button>
          </div>
           <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white">
                  <Menu className="w-7 h-7" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-gray-900">
                <nav className="flex flex-col gap-6 mt-8">
                  <Link className="text-lg font-medium text-text-secondary hover:text-white" href="/#features">Features</Link>
                  <Link className="text-lg font-medium text-text-secondary hover:text-white" href="/about">About</Link>
                  <Link className="text-lg font-medium text-white" href="/contact">Contact</Link>
                  <Button variant="secondary" className="button_secondary w-full">Log in</Button>
                  <Button className="bg-[var(--primary-color)] hover:bg-[var(--accent-color)] text-white font-bold py-2 px-4 rounded-lg focus:outline-none w-full">Sign up</Button>
                </nav>
              </SheetContent>
            </Sheet>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-8 flex-grow flex items-center">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="text-center md:text-left space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Let's Connect</h2>
            <p className="text-text-secondary text-xl leading-relaxed">
              Have a question, feedback, or a partnership idea? We're all ears. Reach out and our team will get back to you as soon as possible.
            </p>
            <div className="space-y-6 pt-6">
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <Mail className="w-6 h-6 text-primary" />
                <span className="text-lg">support@captioncraft.ai</span>
              </div>
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <MapPin className="w-6 h-6 text-primary" />
                <span className="text-lg">San Francisco, CA</span>
              </div>
            </div>
            <div className="flex justify-center md:justify-start items-center gap-6 pt-8">
              <Link href="#" className="text-text-secondary hover:text-primary transition-transform duration-300 transform hover:scale-110">
                <Twitter className="h-7 w-7" />
              </Link>
              <Link href="#" className="text-text-secondary hover:text-primary transition-transform duration-300 transform hover:scale-110">
                <Instagram className="h-7 w-7" />
              </Link>
              <Link href="#" className="text-text-secondary hover:text-primary transition-transform duration-300 transform hover:scale-110">
                <Facebook className="h-7 w-7" />
              </Link>
            </div>
          </div>
          <div className="card bg-gray-900">
            <form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-text-secondary text-sm font-medium mb-2" htmlFor="name">Name</label>
                  <Input className="input" id="name" name="name" placeholder="Anakin Skywalker" type="text" />
                </div>
                <div>
                  <label className="block text-text-secondary text-sm font-medium mb-2" htmlFor="email">Email</label>
                  <Input className="input" id="email" name="email" placeholder="chosenone@galaxy.net" type="email" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-text-secondary text-sm font-medium mb-2" htmlFor="subject">Subject</label>
                <Input className="input" id="subject" name="subject" placeholder="I have the high ground" type="text" />
              </div>
              <div className="mb-6">
                <label className="block text-text-secondary text-sm font-medium mb-2" htmlFor="message">Message</label>
                <Textarea className="input" id="message" name="message" placeholder="You underestimate my power!" rows={5} />
              </div>
              <Button className="button_primary w-full" type="submit">Send Message</Button>
            </form>
          </div>
        </div>
      </main>
      <footer className="bg-transparent mt-16">
        <div className="container mx-auto px-6 py-8 text-center text-text-secondary">
          <p>© 2024 CaptionCraft. All rights reserved. Powered by AI, crafted by humans.</p>
        </div>
      </footer>
    </div>
  );
}