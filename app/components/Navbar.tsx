import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { signIn, signOut } from "auth";


const Navbar = async () => {
    const session = await auth();

    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <div className="flex items-center gap-5 text-black">
                    <Link href="/">
                        <Image src="/logo.png" alt="Logo" width={144} height={30} />
                    </Link>
                </div>

                {session ? (
                    <>
                        <form action={async () => {
                            "use server";
                            await signOut({ redirectTo: "/" });
                        }}>
                            <button type="submit">Logout</button>
                        </form>

                        <Link href={`/user/${session?.user?.id}`}>
                            <span>{session?.user?.name}</span>
                        </Link>
                    </>
                ) : (
                    <form action={async () => {
                        "use server";
                        await signIn("github");
                    }}>
                        <button type="submit">Login</button>
                    </form>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
