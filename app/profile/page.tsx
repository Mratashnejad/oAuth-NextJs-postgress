'use client'
import React, { useState } from 'react';
import { useUser, useUpdateUser } from '@/app/hooks/useUser';
import { ProfileForm } from '@/components/forms/userForm';
import { useAuth } from '@/app/context/authContext';

export default function ProfilePage() {
    const { user } = useAuth();
    const { data: userData, isLoading, error } = useUser(user?.uid);
    const { mutate: updateUser } = useUpdateUser();
    const [isEditing, setIsEditing] = useState(false);
    const [activeSection, setActiveSection] = useState('overview');

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading user data</div>;

    const handleEditToggle = () => setIsEditing(!isEditing);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-100 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl font-semibold text-gray-800">User Profile</h1>
                <p className="text-gray-600">Manage your profile information and settings below.</p>
            </header>

            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Profile Overview</h2>
                    <button
                        onClick={handleEditToggle}
                        className={`px-4 py-2 rounded-md ${isEditing ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
                    >
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                </div>

                <div className="flex space-x-4 mb-6">
                    {/* Tabs for Sections */}
                    {/* ... */}
                </div>

                {activeSection === 'overview' && (
                    <div>
                        {isEditing ? (
                            <ProfileForm
                                initialData={userData}
                                onSubmit={(updatedData) => {
                                    updateUser({ uid: user.uid, userData: updatedData });
                                    setIsEditing(false);
                                }}
                            />
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
                                        <span className="text-white">{userData?.avatar}</span>
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold">{userData?.name}</p>
                                        <p className="text-gray-600">{userData?.email}</p>
                                        <p className="text-gray-600">{userData?.phoneNumber}</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">Bio</h3>
                                    <p className="text-gray-600">{userData?.bio}</p>
                                </div>
                                {/* Add more information as needed */}
                            </div>
                        )}
                    </div>
                )}

                {activeSection === 'jobs' && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Jobs</h2>
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded-md"
                            onClick={() => console.log('Get Jobs')}
                        >
                            Get Jobs
                        </button>
                        <button
                            className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                            onClick={() => console.log('Send Job')}
                        >
                            Send Job
                        </button>
                        {/* List of jobs or related information */}
                    </div>
                )}

                {activeSection === 'reviews' && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Reviews</h2>
                        <div>
                            <p className="text-gray-600">Review 1: Excellent service!</p>
                            <p className="text-gray-600">Review 2: Very satisfied with the outcome.</p>
                        </div>
                    </div>
                )}

                {activeSection === 'revenue' && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Revenue</h2>
                        <p className="text-gray-600">Total Revenue: $5000</p>
                        <p className="text-gray-600">Revenue This Month: $800</p>
                    </div>
                )}
            </div>
        </div>
    );
}
