'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { 
  FiHome, 
  FiPlus, 
  FiUser, 
  FiDollarSign, 
  FiMenu, 
  FiX,
  FiLogOut
} from 'react-icons/fi';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex flex-col md:flex-row">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden bg-white dark:bg-gray-900 p-4 flex items-center justify-between shadow-md">
        <Link href="/dashboard" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          MyFlat
        </Link>
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {isSidebarOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:relative inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition duration-200 ease-in-out z-30 md:z-0 w-64 bg-white dark:bg-gray-900 h-full shadow-md`}
      >
        <div className="p-6">
          <Link href="/dashboard" className="text-2xl font-bold text-blue-600 dark:text-blue-400 block mb-6">
            MyFlat
          </Link>

          <div className="mb-8">
            <div className="flex items-center mb-4">
              {user.profilePicture ? (
                <Image
                  src={user.profilePicture}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="ml-3">
                <p className="text-gray-900 dark:text-white font-medium">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.role}</p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-md p-3">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {user.isSubscribed ? (
                  <>
                    <span className="font-medium">Subscription active</span>
                    <br />
                    <span className="text-xs">
                      Expires: {new Date(user.subscriptionExpiryDate || '').toLocaleDateString()}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-medium">No active subscription</span>
                    <br />
                    <Link href="/pricing" className="text-blue-600 dark:text-blue-400 text-xs">
                      Subscribe now
                    </Link>
                  </>
                )}
              </p>
            </div>
          </div>

          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30"
            >
              <FiHome className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/flats"
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30"
            >
              <FiHome className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              My Flats
            </Link>
            <Link
              href="/dashboard/flats/new"
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30"
            >
              <FiPlus className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              Add New Flat
            </Link>
            <Link
              href="/dashboard/profile"
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30"
            >
              <FiUser className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              Profile
            </Link>
            <Link
              href="/dashboard/subscription"
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30"
            >
              <FiDollarSign className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              Subscription
            </Link>
          </nav>

          <div className="mt-auto pt-8">
            <button
              onClick={logout}
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/30 w-full"
            >
              <FiLogOut className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
