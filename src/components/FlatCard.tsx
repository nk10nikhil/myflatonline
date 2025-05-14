'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMapPin, FiHome, FiDollarSign, FiCalendar, FiUser } from 'react-icons/fi';
import { IFlat } from '@/models/Flat';

interface FlatCardProps {
  flat: IFlat;
}

const FlatCard: React.FC<FlatCardProps> = ({ flat }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48">
        <Image
          src={flat.images[0] || '/placeholder-flat.jpg'}
          alt={flat.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-medium">
          ₹{flat.monthlyRent.toLocaleString('en-IN')}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate">
          {flat.title}
        </h3>
        
        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
          <FiMapPin className="h-4 w-4 mr-1" />
          <span className="text-sm truncate">{flat.locality}, {flat.city}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <FiUser className="h-4 w-4 mr-1" />
            <span className="text-sm">{flat.bhkType}</span>
          </div>
          
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <FiHome className="h-4 w-4 mr-1" />
            <span className="text-sm">{flat.furnishingType}</span>
          </div>
          
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <FiDollarSign className="h-4 w-4 mr-1" />
            <span className="text-sm">Deposit: ₹{flat.depositAmount.toLocaleString('en-IN')}</span>
          </div>
          
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <FiCalendar className="h-4 w-4 mr-1" />
            <span className="text-sm">
              Available: {new Date(flat.availabilityDate).toLocaleDateString('en-IN')}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Link
            href={`/flats/${flat._id}`}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
          >
            View Details
          </Link>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {flat.preferredTenants}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlatCard;
