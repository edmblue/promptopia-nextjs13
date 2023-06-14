'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getProviders } from 'next-auth/react';

const Nav = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const isUserLoggedIn = false;
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
          {isUserLoggedIn ? (
            <div className="flex gap-3">
              <Link href="/create-prompt" className="black_btn">
                Create Post
              </Link>
              <Link href="/create-prompt" className="outline_btn">
                Create Post
              </Link>
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
            <div>
              <button className="black_btn">Sign in</button>
            </div>
          )}
        </div>

        {/* Mobile Navigation **/}
        <div className="sm:hidden">
          {isUserLoggedIn ? (
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
                  <button type="button" className="black_btn w-full">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <button className="black_btn">Sign in</button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
