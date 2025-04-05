import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';

const Navbar = () => {
    const { data: session } = useSession();

    const handleLogin = async () => {
        try {
            await signIn('github');
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <header className="px-5 py-3 bg-black shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/" >
                    <Image src="/logo.png" alt="logo" width={144} height={30} />
                </Link>
                <div className="flex justify-center gap-5">
                    {session ? (
                        <>
                            <Link href="/STARTUP" >
                                <span className="cursor-pointer">Create Startup</span>
                            </Link>
                            <button onClick={handleLogout} className="cursor-pointer">
                                <span>Logout</span>
                            </button>
                            <Link href={`/users/${session.user?.id}`} passHref>
                                <span className="cursor-pointer">{session.user?.name || 'User '}</span>
                            </Link>
                        </>
                    ) : (
                        <button onClick={handleLogin} className="cursor-pointer">
                            <span>Login</span>
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;