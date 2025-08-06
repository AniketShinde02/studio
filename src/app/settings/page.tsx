import Link from 'next/link';
import { Sparkles, Settings, Bell, Link2, AppWindow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  return (
    <div className="flex size-full min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-border-color px-10 py-4">
        <div className="flex items-center gap-4 text-white">
          <div className="size-7 text-primary">
            <Sparkles className="h-full w-full" />
          </div>
          <h1 className="text-2xl font-bold leading-tight tracking-[-0.015em]">CaptionCraft</h1>
        </div>
        <div className="flex flex-1 items-center justify-end gap-5">
          <nav className="flex items-center gap-6 text-sm font-medium text-text-secondary">
            <Link className="hover:text-white transition-colors duration-300" href="/profile">Dashboard</Link>
            <Link className="hover:text-white transition-colors duration-300" href="/">Generate</Link>
            <Link className="hover:text-white transition-colors duration-300" href="/profile">History</Link>
            <Link className="text-white" href="/settings">Settings</Link>
          </nav>
          <div className="h-6 w-px bg-border-color"></div>
          <button className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent text-text-secondary hover:bg-card-background hover:text-white transition-colors duration-300">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </header>
      <main className="w-full flex-1 bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-text-primary">Settings</h1>
            <p className="text-sm text-text-secondary mt-2 max-w-2xl">Manage your account settings, notification preferences, and application configurations.</p>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <nav className="space-y-1">
                <a className="block rounded-md px-3 py-2 text-sm font-medium text-text-primary bg-card-background" href="#account">Account</a>
                <a className="block rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-card-background hover:text-text-primary" href="#notifications">Notifications</a>
                <a className="block rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-card-background hover:text-text-primary" href="#integrations">Integrations</a>
                <a className="block rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-card-background hover:text-text-primary" href="#app-settings">App Settings</a>
              </nav>
            </div>
            <div className="lg:col-span-2">
              <div className="space-y-12">
                <section className="space-y-6 rounded-xl bg-card-background p-8" id="account">
                  <h2 className="text-xl font-semibold text-text-primary tracking-tight">Account Information</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-3">
                      <label className="text-sm text-text-primary" htmlFor="username">Username</label>
                      <div className="sm:col-span-2">
                        <Input className="input" id="username" type="text" defaultValue="emma.wilson" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-3">
                      <label className="text-sm text-text-primary" htmlFor="email">Email</label>
                      <div className="sm:col-span-2">
                        <Input className="input" id="email" type="email" defaultValue="emma.wilson@email.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-3">
                      <label className="text-sm text-text-primary" htmlFor="password">Password</label>
                      <div className="sm:col-span-2">
                        <Button variant="secondary" className="w-full sm:w-auto">Change Password</Button>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="space-y-6 rounded-xl bg-card-background p-8" id="notifications">
                  <h2 className="text-xl font-semibold text-text-primary tracking-tight">Notifications</h2>
                  <div className="flex items-center justify-between rounded-lg bg-[#2a2a2a] p-4">
                    <div>
                      <p className="font-medium text-text-primary">App Notifications</p>
                      <p className="text-sm text-text-secondary">Receive notifications about new features and updates.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </section>
                <section className="space-y-6 rounded-xl bg-card-background p-8" id="integrations">
                  <h2 className="text-xl font-semibold text-text-primary tracking-tight">Integrations</h2>
                  <div className="flex items-center justify-between rounded-lg bg-[#2a2a2a] p-4">
                    <div>
                      <p className="font-medium text-text-primary">Connect Social Media</p>
                      <p className="text-sm text-text-secondary">Connect social accounts for seamless caption sharing.</p>
                    </div>
                    <Button variant="secondary">Connect</Button>
                  </div>
                </section>
              </div>
              <div className="mt-12 flex justify-end">
                <Button>Save All Changes</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
