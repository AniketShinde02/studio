import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Edit, Home, Clock, Settings, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
    return (
        <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden bg-background text-text-primary">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-color px-10 py-4">
                <div className="flex items-center gap-4">
                    <div className="size-8 text-primary">
                        <Sparkles className="h-full w-full" />
                    </div>
                    <h1 className="text-xl font-bold">CaptionCraft</h1>
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    <Link className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors" href="/profile">Dashboard</Link>
                    <Link className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors" href="/">Templates</Link>
                    <Link className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors" href="#">AI Tools</Link>
                    <Link className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors" href="#">Resources</Link>
                    <Link className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors" href="#">Pricing</Link>
                </nav>
            </header>
            <main className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    <aside className="lg:col-span-3">
                        <div className="sticky top-12">
                            <div className="card flex flex-col items-center p-6 text-center">
                                <div className="relative mb-4">
                                    <Image width={128} height={128} className="h-32 w-32 rounded-full bg-cover bg-center border-4 border-border-color" src="https://placehold.co/128x128.png" alt="User avatar" data-ai-hint="woman portrait" />
                                    <button className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white hover:bg-accent-color transition-all duration-300 ring-4 ring-secondary">
                                        <Edit className="h-5 w-5" />
                                    </button>
                                </div>
                                <h2 className="text-2xl font-semibold text-text-primary">Sophia Carter</h2>
                                <p className="text-text-secondary">Content Creator</p>
                                <p className="text-sm text-text-secondary mt-1">Joined in 2022</p>
                            </div>
                            <nav className="mt-6 space-y-2">
                                <Link className="flex items-center gap-3 rounded-lg bg-secondary px-4 py-3 text-sm font-medium text-primary transition-colors" href="#">
                                    <Home className="h-5 w-5" />
                                    Profile Overview
                                </Link>
                                <Link className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-secondary hover:text-text-primary" href="#">
                                    <Clock className="h-5 w-5" />
                                    Caption History
                                </Link>
                                <Link className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-secondary hover:text-text-primary" href="/settings">
                                    <Settings className="h-5 w-5" />
                                    Account Settings
                                </Link>
                                <Link className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-secondary hover:text-text-primary" href="#">
                                    <Bell className="h-5 w-5" />
                                    Notifications
                                </Link>
                                <Link className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-secondary hover:text-red-500" href="#">
                                    <LogOut className="h-5 w-5" />
                                    Logout
                                </Link>
                            </nav>
                        </div>
                    </aside>
                    <div className="lg:col-span-9">
                        <div className="space-y-10">
                            <section className="card">
                                <h3 className="text-2xl font-semibold text-text-primary border-b border-border-color pb-4 mb-6">Edit Profile</h3>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="fullName">Full Name</label>
                                            <input className="input" id="fullName" type="text" defaultValue="Sophia Carter" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="title">Title / Profession</label>
                                            <input className="input" id="title" type="text" defaultValue="Content Creator" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="email">Email Address</label>
                                        <input className="input" id="email" type="email" defaultValue="sophia.carter@example.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="bio">Bio</label>
                                        <textarea className="input" id="bio" rows={4} defaultValue="Passionate content creator exploring the world of words and visuals. I believe in the power of storytelling to connect and inspire." />
                                    </div>
                                    <div className="flex justify-end gap-4 pt-4">
                                        <Button variant="secondary" type="button">Cancel</Button>
                                        <Button type="submit">Save Changes</Button>
                                    </div>
                                </form>
                            </section>
                            <section className="card">
                                <h3 className="text-2xl font-semibold text-text-primary border-b border-border-color pb-4 mb-6">Recent Caption History</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-border-color">
                                        <thead className="bg-secondary/50">
                                            <tr>
                                                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-text-primary sm:pl-6" scope="col">Caption</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-text-primary" scope="col">Mood</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-text-primary" scope="col">Date</th>
                                                <th className="relative py-3.5 pl-3 pr-4 sm:pr-6" scope="col"><span className="sr-only">Actions</span></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border-color">
                                            <tr>
                                                <td className="whitespace-normal py-4 pl-4 pr-3 text-sm font-medium text-text-secondary sm:pl-6 max-w-xs truncate">"Embracing the sunshine and good vibes!"</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm"><span className="inline-flex items-center rounded-full bg-green-100/10 px-2 py-1 text-xs font-medium text-green-400">Joyful</span></td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-text-secondary">2024-07-26</td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <a className="text-primary hover:text-accent-color" href="#">View</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="whitespace-normal py-4 pl-4 pr-3 text-sm font-medium text-text-secondary sm:pl-6 max-w-xs truncate">"Lost in thought, finding beauty in the quiet moments."</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm"><span className="inline-flex items-center rounded-full bg-blue-100/10 px-2 py-1 text-xs font-medium text-blue-400">Reflective</span></td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-text-secondary">2024-07-25</td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <a className="text-primary hover:text-accent-color" href="#">View</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="pt-6 text-center">
                                    <a className="text-sm font-medium text-primary hover:underline" href="#">View all caption history</a>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
