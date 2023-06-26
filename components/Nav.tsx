'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';

const Nav = () => {
  useEffect(() => {
    const retriveProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    retriveProviders();
  }, []);

  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [providers, setProviders] = useState<any>(null);
  const { data: session } = useSession();

  return (
    <>
      <nav className="w-full mt-4 flex gap-3 flex-between">
        <div className="flex gap-3">
          <Link href="/">
            <Image
              src="/assets/images/logo.svg"
              alt="logo"
              height={30}
              width={30}
            />
          </Link>
          <p className="logo_text">Promptopia</p>
        </div>

        {/* Desktop Navigation */}

        <div className="hidden sm:block">
          {session ? (
            <div className="flex gap-3">
              <Link href="/create-prompt" className="black_btn">
                Create Post
              </Link>
              <button onClick={() => signOut()} className="outline_btn">
                Sign Out
              </button>
              <Link href="/my-profile">
                <Image
                  src="/assets/images/logo.svg"
                  alt="profile image"
                  height={36}
                  width={36}
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider: any) => (
                  <button
                    key={provider.id}
                    type="button"
                    className="black_btn"
                    onClick={() => signIn(provider.id)}
                  >
                    Sign in
                  </button>
                ))}
            </>
          )}
        </div>

        {/* Mobile Navigation **/}
        <div className="sm:hidden">
          {session ? (
            <div className="flex">
              <Image
                src="/assets/images/logo.svg"
                alt="Profile Image"
                height={36}
                width={36}
                className="cursor-pointer"
                onClick={() => {
                  setToggleDropdown((prev) => !prev);
                }}
              />
              {toggleDropdown && (
                <div className="dropdown top-0">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setToggleDropdown(false);
                    }}
                    className="outline_btn"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider: any) => (
                  <button
                    key={provider.id}
                    type="button"
                    className="black_btn"
                    onClick={() => signIn(provider.id)}
                  >
                    Sign in
                  </button>
                ))}
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
