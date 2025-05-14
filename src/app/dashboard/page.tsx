'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FiHome, FiPlus, FiUser, FiDollarSign, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';

const DashboardPage = () => {
  const { user } = useAuth();
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFlats = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/flats?createdBy=' + user?._id + '&limit=3');
        
        if (data.success) {
          setFlats(data.flats);
        }
      } catch (error) {
        console.error('Error fetching flats:', error);
        setError('Failed to fetch your flats');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchFlats();
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>

      {!user.isSubscribed && (
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 mb-6 text-yellow-700 dark:text-yellow-300 flex items-start">
          <FiAlertCircle className="h-5 w-5 mr-3 mt-0.5" />
          <div>
            <p className="font-medium">Your account is not subscribed</p>
            <p className="mt-1">
              Subscribe now to list your flats and access all features.{' '}
              <Link href="/pricing" className="underline font-medium">
                View pricing plans
              </Link>
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <FiHome className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Flats</h2>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{loading ? '...' : flats.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
              <FiDollarSign className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Subscription Status</h2>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {user.isSubscribed ? 'Active' : 'Inactive'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
              <FiUser className="h-6 w-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Type</h2>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{user.role}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
              <FiDollarSign className="h-6 w-6 text-orange-600 dark:text-orange-300" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Expiry Date</h2>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {user.subscriptionExpiryDate
                  ? new Date(user.subscriptionExpiryDate).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Flats</h2>
          <Link
            href="/dashboard/flats"
            className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View all
          </Link>
        </div>

        {loading ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">Loading...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-500 dark:text-red-400">{error}</div>
        ) : flats.length === 0 ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            You haven't listed any flats yet.{' '}
            <Link
              href="/dashboard/flats/new"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Add your first flat
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-600">
            {flats.map((flat: any) => (
              <div key={flat._id} className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{flat.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {flat.locality}, {flat.city}
                    </p>
                    <div className="flex space-x-4">
                      <span className="text-sm text-gray-600 dark:text-gray-300">₹{flat.monthlyRent}/month</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{flat.bhkType}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{flat.furnishingType}</span>
                    </div>
                  </div>
                  <Link
                    href={`/dashboard/flats/${flat._id}`}
                    className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Quick Actions</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <Link
              href="/dashboard/flats/new"
              className="bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 p-4 rounded-md flex flex-col items-center justify-center text-center"
            >
              <FiPlus className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Add New Flat</span>
            </Link>
            <Link
              href="/dashboard/profile"
              className="bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 p-4 rounded-md flex flex-col items-center justify-center text-center"
            >
              <FiUser className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Update Profile</span>
            </Link>
            <Link
              href="/dashboard/subscription"
              className="bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 p-4 rounded-md flex flex-col items-center justify-center text-center"
            >
              <FiDollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Manage Subscription</span>
            </Link>
            <Link
              href="/flats"
              className="bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 p-4 rounded-md flex flex-col items-center justify-center text-center"
            >
              <FiHome className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Browse Flats</span>
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Account Summary</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</h3>
                <p className="text-base text-gray-900 dark:text-white">{user.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                <p className="text-base text-gray-900 dark:text-white">{user.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h3>
                <p className="text-base text-gray-900 dark:text-white">{user.phone || 'Not provided'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Type</h3>
                <p className="text-base text-gray-900 dark:text-white">{user.role}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Subscription Status</h3>
                <p className="text-base text-gray-900 dark:text-white">
                  {user.isSubscribed ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
