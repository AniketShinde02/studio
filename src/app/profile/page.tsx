
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Edit, Home, Clock, Settings, Bell, LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { IPost } from '@/models/Post';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
            <div className="flex justify-center items-center min-h-screen bg-background">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        );
    }


    return (
        <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
            <header className="flex items-center justify-between whitespace-nowrap border-b px-10 py-4">
                <div className="flex items-center gap-4">
                    <div className="size-8 text-primary">
                        <Sparkles className="h-full w-full" />
                    </div>
                     <Link href="/">
                        <h1 className="text-xl font-bold">CaptionCraft</h1>
                    </Link>
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    <Link className="text-sm font-medium text-foreground transition-colors" href="/profile">Dashboard</Link>
                    <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="/">Generate</Link>
                    <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="/profile">History</Link>
                    <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="/settings">Settings</Link>
                </nav>
            </header>
            <main className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    <aside className="lg:col-span-3">
                        <div className="sticky top-12">
                            <div className="flex flex-col items-center p-6 text-center bg-card rounded-lg">
                                <div className="relative mb-4">
                                    <Image width={128} height={128} className="h-32 w-32 rounded-full bg-cover bg-center border-4" src="https://placehold.co/128x128.png" alt="User avatar" data-ai-hint="abstract user" />
                                    <button className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-accent transition-all duration-300 ring-4 ring-secondary">
                                        <Edit className="h-5 w-5" />
                                    </button>
                                </div>
                                <h2 className="text-2xl font-semibold text-foreground capitalize">{userName}</h2>
                                <p className="text-muted-foreground">{session?.user?.email}</p>
                                <p className="text-sm text-muted-foreground mt-1">Joined in {userJoined}</p>
                            </div>
                            <nav className="mt-6 space-y-2">
                                <Link className="flex items-center gap-3 rounded-lg bg-muted px-4 py-3 text-sm font-medium text-primary transition-colors" href="/profile">
                                    <Home className="h-5 w-5" />
                                    Profile Overview
                                </Link>
                                <Link className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" href="/profile">
                                    <Clock className="h-5 w-5" />
                                    Caption History
                                </Link>
                                <Link className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" href="/settings">
                                    <Settings className="h-5 w-5" />
                                    Account Settings
                                </Link>
                                <Link className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" href="#">
                                    <Bell className="h-5 w-5" />
                                    Notifications
                                </Link>
                                <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-muted hover:text-red-500 w-full">
                                    <LogOut className="h-5 w-5" />
                                    Logout
                                </button>
                            </nav>
                        </div>
                    </aside>
                    <div className="lg:col-span-9">
                        <div className="space-y-10">
                            <section className="bg-card p-6 rounded-lg">
                                <h3 className="text-2xl font-semibold text-foreground border-b pb-4 mb-6">Edit Profile</h3>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-muted-foreground mb-2" htmlFor="fullName">Username</label>
                                            <Input id="fullName" type="text" defaultValue={userName} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-muted-foreground mb-2" htmlFor="title">Title / Profession</label>
                                            <Input id="title" type="text" placeholder="e.g. Content Creator" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-muted-foreground mb-2" htmlFor="email">Email Address</label>
                                        <Input id="email" type="email" defaultValue={session?.user?.email ?? ''} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-muted-foreground mb-2" htmlFor="bio">Bio</label>
                                        <Textarea id="bio" rows={4} placeholder="Tell us about yourself..." />
                                    </div>
                                    <div className="flex justify-end gap-4 pt-4">
                                        <Button variant="secondary" type="button">Cancel</Button>
                                        <Button type="submit">Save Changes</Button>
                                    </div>
                                </form>
                            </section>
                            <section className="bg-card p-6 rounded-lg">
                                <h3 className="text-2xl font-semibold text-foreground border-b pb-4 mb-6">Recent Caption History</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y">
                                        <thead className="bg-muted/50">
                                            <tr>
                                                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-foreground sm:pl-6" scope="col">Caption</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-foreground" scope="col">Image</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-foreground" scope="col">Date</th>
                                                <th className="relative py-3.5 pl-3 pr-4 sm:pr-6" scope="col"><span className="sr-only">Actions</span></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {isLoadingPosts ? (
                                                <tr>
                                                    <td colSpan={4} className="text-center py-8">
                                                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                                                    </td>
                                                </tr>
                                            ) : posts.length > 0 ? (
                                                posts.map(post => (
                                                <tr key={post._id}>
                                                    <td className="whitespace-normal py-4 pl-4 pr-3 text-sm font-medium text-muted-foreground sm:pl-6 max-w-xs truncate">{post.caption}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        {post.image ? 
                                                            <Image src={post.image} alt="caption image" width={50} height={50} className="rounded-md" /> : 
                                                            <span className="text-muted-foreground">No image</span>}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">{format(new Date(post.createdAt), 'yyyy-MM-dd')}</td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                        <a className="text-primary hover:text-accent" href="#">View</a>
                                                    </td>
                                                </tr>
                                                ))
                                            ) : (
                                                 <tr>
                                                    <td colSpan={4} className="text-center py-8 text-muted-foreground">
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
