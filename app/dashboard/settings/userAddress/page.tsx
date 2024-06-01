'use client'
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import UserAddressForm from '@/components/forms/UserAddressForm';
import { UserAddress } from '@/types/types';
import axios from 'axios';

export default function UserAddressPage() {
  const { user } = useAuth();
  const [userAddress, setUserAddress] = useState<UserAddress | null>(null);

  useEffect(() => {
    if (user) {
      setUserAddress({
        userId: user._id, // Assign userId to the user's ID
        city: user.city || '',
        country: user.country || '',
        state: user.state || '',
        province: user.province || '',
        zipcode: user.zipcode || '',
        apartment: user.apartment || '',
        plate: user.plate || '',
        houseNumber: user.houseNumber || '',
        doorColor: user.doorColor || '',
        details: user.details || '',
      });
    }
  }, [user]);

  const handleSaveUserAddress = async (data: UserAddress) => {
    try {
      if (user) {
        if (!userAddress) {
          // If userAddress is null, it means there's no address yet, so we need to create a new one
          const response = await axios.post(`/api/address/`, data);
          setUserAddress(response.data.newAddress);
        } else {
          // If userAddress exists, it means there's already an address, so we need to update it
          const response = await axios.patch(`/api/address/${user._id}/${userAddress._id}`, data);
          setUserAddress(response.data.updatedAddress);
        }
        console.log('User address updated successfully');
      }
    } catch (error) {
      console.error('Error updating user address', error);
    }
  };

  return (
    <div>
      {userAddress ? (
        <UserAddressForm userAddress={userAddress} onSave={handleSaveUserAddress} />
      ) : (
        <div>Loading User address...</div>
      )}
    </div>
  );
}
