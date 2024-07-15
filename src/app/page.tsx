import Hero from "./Components/Hero";
import Jobs from "./Components/Jobs";
import {
  getSignInUrl,
  getSignUpUrl,
  getUser,
  signOut,
} from '@workos-inc/authkit-nextjs';
import Link from 'next/link';

export default async function Home() {

  const { user } = await getUser();

  // Get the URL to redirect the user to AuthKit to sign in
  const signInUrl = await getSignInUrl();

  // Get the URL to redirect the user to AuthKit to sign up
  const signUpUrl = await getSignUpUrl();

  return (
    <div className="">
      <Hero />
      <Jobs />
    </div>
  );
}
