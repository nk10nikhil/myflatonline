'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { BHKType, PropertyType, FurnishingType, FacingDirection, WaterSupplyType, PreferredTenants, GenderPreference } from '@/models/Flat';
import DashboardLayout from '@/components/DashboardLayout';

const NewFlatPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    monthlyRent: '',
    depositAmount: '',
    availabilityDate: '',
    isRentNegotiable: false,
    contactNumber: user?.phone || '',
    
    // Location
    address: '',
    city: '',
    locality: '',
    state: '',
    pincode: '',
    landmarks: '',
    googleMapsLink: '',
    
    // Property Details
    bhkType: BHKType.ONE_BHK,
    propertyType: PropertyType.FLAT,
    floorNumber: '',
    totalFloors: '',
    builtUpArea: '',
    carpetArea: '',
    propertyAge: '',
    facingDirection: FacingDirection.EAST,
    
    // Amenities
    furnishingType: FurnishingType.SEMI_FURNISHED,
    hasAC: false,
    hasWifi: false,
    hasWashingMachine: false,
    hasRefrigerator: false,
    hasPowerBackup: false,
    hasGatedSecurity: false,
    hasCCTV: false,
    hasElevator: false,
    hasParking: false,
    hasBalcony: false,
    waterSupplyType: WaterSupplyType.MUNICIPAL,
    isPetFriendly: false,
    
    // Preferences
    preferredTenants: PreferredTenants.ANYONE,
    genderPreference: GenderPreference.ANY,
    isSmokingAllowed: false,
    isNonVegAllowed: false,
    
    // Media
    images: ['https://via.placeholder.com/800x600?text=Flat+Image'],
    videoLink: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'monthlyRent' || name === 'depositAmount' || name === 'floorNumber' || 
               name === 'totalFloors' || name === 'builtUpArea' || name === 'carpetArea' || 
               name === 'propertyAge') {
      // Handle numeric inputs
      const numValue = value === '' ? '' : Number(value);
      setFormData(prev => ({ ...prev, [name]: numValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Validate required fields
      const requiredFields = [
        'title', 'description', 'monthlyRent', 'depositAmount', 'availabilityDate',
        'contactNumber', 'address', 'city', 'locality', 'state', 'pincode',
        'floorNumber', 'totalFloors', 'builtUpArea', 'carpetArea', 'propertyAge'
      ];
      
      const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
      
      if (missingFields.length > 0) {
        setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
        setIsLoading(false);
        return;
      }
      
      // Submit the form
      const response = await axios.post('/api/flats', formData);
      
      if (response.data.success) {
        setSuccess('Flat listed successfully!');
        // Redirect to the flat details page
        setTimeout(() => {
          router.push(`/flats/${response.data.flat._id}`);
        }, 2000);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to list flat. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!user?.isSubscribed) {
    return (
      <DashboardLayout>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Subscription Required</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            You need an active subscription to list flats on our platform.
          </p>
          <button
            onClick={() => router.push('/pricing')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Subscription Plans
          </button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">List a New Flat</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Title*</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Contact Number*</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Description*</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Monthly Rent (₹)*</label>
                <input
                  type="number"
                  name="monthlyRent"
                  value={formData.monthlyRent}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Deposit Amount (₹)*</label>
                <input
                  type="number"
                  name="depositAmount"
                  value={formData.depositAmount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Availability Date*</label>
                <input
                  type="date"
                  name="availabilityDate"
                  value={formData.availabilityDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isRentNegotiable"
                  checked={formData.isRentNegotiable}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-gray-700 dark:text-gray-300">Rent is negotiable</label>
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            >
              {isLoading ? 'Submitting...' : 'List Flat'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default NewFlatPage;
