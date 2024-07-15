import Link from "next/link";
import { getSignInUrl, getUser, signOut } from "@workos-inc/authkit-nextjs";

export default async function Header() {
    const { user } = await getUser();
    const signInUrl = await getSignInUrl();
    return (
        <header>
            <div className="container flex justify-between items-center mx-auto my-4">
                <Link href={'/'} className="font-bold text-xl">Job Board</Link>
                <nav className="flex gap-2">
                    {!user ?
                        <Link className="bg-gray-200 py-2 px-4 rounded-md" href={signInUrl}>Login</Link>
                        : <form action={async () => {
                            'use server';
                            await signOut();
                        }}>
                            <button className="bg-gray-200 py-2 px-4 rounded-md" type="submit">Logout</button>
                        </form>
                    }
                    {user &&
                        <Link className="bg-blue-600 text-white py-2 px-4 rounded-md" href={'/new-listing'}>Post a job</Link>
                    }
                </nav>
            </div>
        </header>
    )
}