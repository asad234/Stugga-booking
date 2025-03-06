'use client';

import { UserButton, useUser } from "@clerk/nextjs";
import Link from 'next/link';

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <div>
        <Link href="/" className="mr-4">Home</Link>
        {isSignedIn && <Link href="/dashboard">Dashboard</Link>}
      </div>
      <div>
        {isSignedIn ? (
          <UserButton />
        ) : (
          <>
            <Link href="/sign-in" className="mr-4">Login</Link>
            <Link href="/sign-up">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
