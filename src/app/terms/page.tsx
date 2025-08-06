
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
  return (
    <div className="bg-[#121212] text-[#E0E0E0] font-sans">
      <style jsx global>{`
        :root {
          --primary-color: #b83df5;
          --background-color: #121212;
          --text-primary: #E0E0E0;
          --text-secondary: #A0A0A0;
          --accent-color: #292929;
          --card-background: #1E1E1E;
          --button-hover: #c766f7;
        }
        body {
          font-family: 'Spline Sans', sans-serif;
          background-color: var(--background-color);
          color: var(--text-primary);
        }
        .typography_h1 {
          @apply text-3xl font-bold mb-4;
        }
        .typography_h2 {
          @apply text-2xl font-semibold mb-3;
        }
        .typography_body {
          @apply text-base leading-relaxed;
        }
        .link {
          @apply text-[var(--primary-color)] hover:underline;
        }
        .list_item {
          @apply list-disc list-inside;
        }
        .button_primary {
          @apply bg-[var(--primary-color)] text-white py-2 px-4 rounded-lg hover:bg-[var(--button-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50;
        }
      `}</style>
      <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden">
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-[var(--accent-color)] bg-[var(--background-color)] bg-opacity-80 px-10 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 text-[var(--primary-color)]">
              <Sparkles className="h-full w-full" />
            </div>
            <h2 className="text-white text-xl font-bold">CaptionCraft</h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-white hover:text-[var(--primary-color)] transition-colors text-sm font-medium" href="/">Features</Link>
            <Link className="text-white hover:text-[var(--primary-color)] transition-colors text-sm font-medium" href="/about">About</Link>
            <Link className="text-white hover:text-[var(--primary-color)] transition-colors text-sm font-medium" href="/contact">Support</Link>
          </nav>
          <Button className="button_primary text-sm font-bold tracking-wide">
            Get Started
          </Button>
        </header>
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-[var(--primary-color)] uppercase tracking-wider">Legal</p>
              <h1 className="typography_h1 mt-2 text-4xl sm:text-5xl">Terms of Service</h1>
              <p className="mt-4 text-[var(--text-secondary)] typography_body">Last updated: October 26, 2023</p>
            </div>
            <div className="space-y-10">
              <section>
                <h2 className="typography_h2 text-[var(--primary-color)]">1. Acceptance of Terms</h2>
                <p className="typography_body text-[var(--text-secondary)]">
                  By accessing or using the CaptionCraft web application (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Service.
                </p>
              </section>
              <section>
                <h2 className="typography_h2 text-[var(--primary-color)]">2. Description of Service</h2>
                <p className="typography_body text-[var(--text-secondary)]">
                  CaptionCraft provides an AI-powered caption generation service for various types of content. The Service allows users to input content and receive AI-generated captions. We reserve the right to modify or discontinue the Service at any time without notice.
                </p>
              </section>
              <section>
                <h2 className="typography_h2 text-[var(--primary-color)]">3. User Conduct</h2>
                <p className="typography_body text-[var(--text-secondary)]">
                  You agree to use the Service only for lawful purposes and in accordance with these Terms. You are responsible for all content you submit to the Service and the captions generated. You must not use the Service to:
                </p>
                <ul className="mt-4 space-y-2 text-[var(--text-secondary)]">
                  <li className="list_item ml-5 typography_body">Generate captions that are illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</li>
                  <li className="list_item ml-5 typography_body">Infringe on any third party's intellectual property rights.</li>
                  <li className="list_item ml-5 typography_body">Distribute spam, unsolicited or unauthorized advertising.</li>
                </ul>
              </section>
              <section>
                <h2 className="typography_h2 text-[var(--primary-color)]">4. Intellectual Property</h2>
                <p className="typography_body text-[var(--text-secondary)]">
                  The Service and its original content, features, and functionality are and will remain the exclusive property of CaptionCraft and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of CaptionCraft.
                </p>
              </section>
              <section>
                <h2 className="typography_h2 text-[var(--primary-color)]">5. Disclaimers</h2>
                <p className="typography_body text-[var(--text-secondary)]">
                  Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
                </p>
              </section>
              <section>
                <h2 className="typography_h2 text-[var(--primary-color)]">6. Limitation of Liability</h2>
                <p className="typography_body text-[var(--text-secondary)]">
                  In no event shall CaptionCraft, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                </p>
              </section>
              <section>
                <h2 className="typography_h2 text-[var(--primary-color)]">7. Governing Law</h2>
                <p className="typography_body text-[var(--text-secondary)]">
                  These Terms shall be governed and construed in accordance with the laws of Delaware, United States, without regard to its conflict of law provisions.
                </p>
              </section>
              <section>
                <h2 className="typography_h2 text-[var(--primary-color)]">8. Changes to Terms</h2>
                <p className="typography_body text-[var(--text-secondary)]">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
              </section>
              <section>
                <h2 className="typography_h2 text-[var(--primary-color)]">9. Contact Information</h2>
                <p className="typography_body text-[var(--text-secondary)]">
                  If you have any questions about these Terms, please contact us at <a className="link" href="mailto:support@captioncraft.com">support@captioncraft.com</a>.
                </p>
              </section>
            </div>
          </div>
        </main>
        <footer className="bg-[var(--card-background)] mt-16">
          <div className="container mx-auto px-10 py-8 text-center text-[var(--text-secondary)]">
            <p>© 2023 CaptionCraft. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

    