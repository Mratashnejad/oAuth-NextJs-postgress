'use client';
import React from 'react';
import { useGetUserById } from '@/app/hooks/useGetUserData';
import ProgressBar from '@/components/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faTasks } from '@fortawesome/free-solid-svg-icons'; // Example icons from FontAwesome

const UserDetails = ({ userId }) => {
  const { data, isLoading, isError } = useGetUserById(userId);

  if (isLoading) return <ProgressBar isLoading={true} />;
  
  if (isError) return <div className="text-red-500">Error Loading User Data</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-8 rounded-lg shadow-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">User Information</h1>
        </div>

        {/* Avatar and Basic Info */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-20 h-20 relative rounded-full overflow-hidden mr-4">
            <img
              src={data?.user?.avatarUrl || 'https://github.com/shadcn.png'}
              alt={data?.user?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{data?.user?.name}</h2>
            <h2 className="text-2xl font-bold text-white">{data?.user?.family}</h2>

            <p className="text-gray-200">{data?.user?.email}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Phone Number */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <FontAwesomeIcon icon={faPhone} className="text-purple-500 text-2xl" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Phone Number</h2>
                <p className="text-gray-600">{data?.user?.phoneNumber}</p>
              </div>
            </div>
            
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <FontAwesomeIcon icon={faPhone} className="text-purple-500 text-2xl" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Category</h2>
                <p className="text-gray-600">{data?.user?.category}</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <FontAwesomeIcon icon={faPhone} className="text-purple-500 text-2xl" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Rate</h2>
                <p className="text-gray-600">{data?.user?.rate?.rating}</p>
              </div>
            </div>
          </div>

          {/* Completed Job Count */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <FontAwesomeIcon icon={faTasks} className="text-purple-500 text-2xl" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Completed Job Count</h2>
                <p className="text-gray-600">{data?.user?.completedJobCount}</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <FontAwesomeIcon icon={faTasks} className="text-purple-500 text-2xl" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Skills</h2>
                <p className="text-gray-600">{data?.user?.skills}</p>
              </div>
            </div>
          </div>

          {/* Violations */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <FontAwesomeIcon icon={faTasks} className="text-purple-500 text-2xl" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Violations</h2>
                <p className="text-gray-600">{data?.user?.Violations}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
