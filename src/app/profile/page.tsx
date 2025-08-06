
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Edit, Home, Clock, Settings, Bell, LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { IPost } from '@/models/Post';
import { format } from 'date-fns';

export default function ProfilePage() {
    const { data: session, status } = useSession({
      required: true,
      onUnauthenticated() {
        // The user is not authenticated, handle it here.
        // For now, we'll rely on the loading state.
      },
    });
    const [posts, setPosts] = useState<IPost[]>([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            if (session?.user?.id) {
                setIsLoadingPosts(true);
                try {
                    const response = await fetch('/api/posts');
                    if (response.ok) {
                        const data = await response.json();
                        setPosts(data.data);
                    }
                } catch (error) {
                    console.error('Failed to fetch posts', error);
                } finally {
                    setIsLoadingPosts(false);
                }
            }
        };

        fetchPosts();
    }, [session]);
    
    const userEmail = session?.user?.email;
    const userName = userEmail ? userEmail.split('@')[0] : 'User';
    const userJoined = session?.user?.createdAt ? format(new Date(session.user.createdAt), 'yyyy') : '';


    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="h-16 w-16 animate-spin" />
            </div>
        );
    }


    return (
        <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden bg-background text-text-primary">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-color px-10 py-4">
                <div className="flex items-center gap-4">
                    <div className="size-8 text-primary">
                        <Sparkles className="h-full w-full" />
                    </div>
                     <Link href="/">
                        <h1 className="text-xl font-bold">CaptionCraft</h1>
                    </Link>
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    <Link className="text-sm font-medium text-text-primary transition-colors" href="/profile">Dashboard</Link>
                    <Link className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors" href="/">Generate</Link>
                    <Link className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors" href="/profile">History</Link>
                    <Link className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors" href="/settings">Settings</Link>
                </nav>
            </header>
            <main className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    <aside className="lg:col-span-3">
                        <div className="sticky top-12">
                            <div className="card flex flex-col items-center p-6 text-center">
                                <div className="relative mb-4">
                                    <Image width={128} height={128} className="h-32 w-32 rounded-full bg-cover bg-center border-4 border-border-color" src="https://placehold.co/128x128.png" alt="User avatar" data-ai-hint="abstract user" />
                                    <button className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white hover:bg-accent-color transition-all duration-300 ring-4 ring-secondary">
                                        <Edit className="h-5 w-5" />
                                    </button>
                                </div>
                                <h2 className="text-2xl font-semibold text-text-primary capitalize">{userName}</h2>
                                <p className="text-text-secondary">{session?.user?.email}</p>
                                <p className="text-sm text-text-secondary mt-1">Joined in {userJoined}</p>
                            </div>
                            <nav className="mt-6 space-y-2">
                                <Link className="flex items-center gap-3 rounded-lg bg-secondary px-4 py-3 text-sm font-medium text-primary transition-colors" href="/profile">
                                    <Home className="h-5 w-5" />
                                    Profile Overview
                                </Link>
                                <Link className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-secondary hover:text-text-primary" href="/profile">
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
                                <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-secondary hover:text-red-500 w-full">
                                    <LogOut className="h-5 w-5" />
                                    Logout
                                </button>
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
                                            <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="fullName">Username</label>
                                            <input className="input" id="fullName" type="text" defaultValue={userName} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="title">Title / Profession</label>
                                            <input className="input" id="title" type="text" placeholder="e.g. Content Creator" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="email">Email Address</label>
                                        <input className="input" id="email" type="email" defaultValue={session?.user?.email ?? ''} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="bio">Bio</label>
                                        <textarea className="input" id="bio" rows={4} placeholder="Tell us about yourself..." />
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
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-text-primary" scope="col">Image</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-text-primary" scope="col">Date</th>
                                                <th className="relative py-3.5 pl-3 pr-4 sm:pr-6" scope="col"><span className="sr-only">Actions</span></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border-color">
                                            {isLoadingPosts ? (
                                                <tr>
                                                    <td colSpan={4} className="text-center py-8">
                                                        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                                                    </td>
                                                </tr>
                                            ) : posts.length > 0 ? (
                                                posts.map(post => (
                                                <tr key={post._id}>
                                                    <td className="whitespace-normal py-4 pl-4 pr-3 text-sm font-medium text-text-secondary sm:pl-6 max-w-xs truncate">{post.caption}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        {post.image ? 
                                                            <Image src={post.image} alt="caption image" width={50} height={50} className="rounded-md" /> : 
                                                            <span className="text-text-secondary">No image</span>}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-text-secondary">{format(new Date(post.createdAt), 'yyyy-MM-dd')}</td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                        <a className="text-primary hover:text-accent-color" href="#">View</a>
                                                    </td>
                                                </tr>
                                                ))
                                            ) : (
                                                 <tr>
                                                    <td colSpan={4} className="text-center py-8 text-text-secondary">
                                                        You haven't generated any captions yet.
                                                    </td>
                                                </tr>
                                            )}
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

    