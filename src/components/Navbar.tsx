"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from 'next-themes';
import { Menu } from "@headlessui/react";
const Navbar = () => {

  const { data: session } = useSession();
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {

  // Replace 'myImage' with your key
    // Update state with the image string
  }, [session]);
  return (
    <div className="border-b h-16 m-auto top-0 animated">
      
      {" "}
      {/* Added shadow */}
      <ul className="flex justify-between m-5 items-center h-16">
        {" "}
        {/* Reduced height */}
        <div>
          <Link href="/">
            <li>Home</li>
          </Link>
        </div>
        <div className="flex gap-6 items-center">
          {" "}
          {/* Adjusted gap and centered items */}
          <Link href="/dashboard">
            <li>Dashboard</li>
          </Link>
          <div>
            <ul>
            <li> {currentTheme === 'dark' ? (
            <button
              className="bg-black-700 rounded-md border-none border-5 h-full"
              onClick={() => setTheme('light')}
            >
              {' '}
              <img src="/images/sun.png" alt="logo" height="auto" width="auto" />
            </button>
          ) : (
            <button
              className="bg-gray-100 rounded-md border-none border-2"
              onClick={() => setTheme('dark')}
            >
              <img src="/images/moon.png" alt="logo" height="auto" width="auto" />
            </button>
          )}</li>
            </ul>
          </div>
         
          {!session ? (
            <>
              <Link href="/login">
                <li>Login</li>
              </Link>
              <Link href="/register">
                <li>Register</li>
              </Link>
              
            </>
          ) : (
            <>
              <Link href="/user-profile">
              {currentTheme === 'dark' ? (
              <img className="w-8 h-8 mr-2" src="/images/gear.png" alt="logo" />):(<img className="w-8 h-8 mr-2" src="/images/settings.png" alt="logo" />)}
              </Link>
              <Menu >
              <Menu.Button className="text-blue-600">
                    {session?.user?.email}
                  </Menu.Button>
                  
              </Menu>
              <li>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="p-2 px-5 -mt-1 bg-blue-800 rounded-full text-white"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
