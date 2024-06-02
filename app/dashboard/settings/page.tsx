'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import axios from 'axios';
import { UserData, UserAddress } from '@/types/types';

import UserInformationTab from '@/components/dashboard/UserInformationTab';
import UserAddressTab from '@/components/dashboard/UserAddressTab';
import EmergencyContactTab from '@/components/dashboard/EmergencyContactTab';

export default function Settings() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userAddresses, setUserAddresses] = useState<UserAddress[]>([]);
  const [addAddress, setAddAddress] = useState(false);
  const [userAddress, setUserAddress] = useState<UserAddress | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState('userInformation'); // Track active tab

  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [province, setProvince] = useState('');
  const [zipcode, setZipCode] = useState('');
  const [apartment, setApartment] = useState('');
  const [plate, setPlate] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [doorColor, setDoorColor] = useState('');
  const [details, setDetails] = useState('');
  const [emergencyContact, setEmergencyContact] = useState<{ name: string, relationship: string, phoneNumber: string }>({
    name: '',
    relationship: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if (user) {
      setUserData(user);
      // Fetch addresses only if the active tab is 'userAddress'
      if (activeTab === 'userAddress') {
        fetchUserAddresses(user._id);
      }
    } else {
      setUserData(null);
      setUserAddresses([]);
    }
  }, [user, activeTab]); // Depend on user and activeTab

  const fetchUserAddresses = async (userId: string) => {
    try {
      const response = await axios.get(`/api/address/${userId}`);
      setUserAddresses(response.data.addresses);
    } catch (error) {
      console.error('Error fetching addresses', error);
    }
  };

  const handleSaveUserInfo = async (data: UserData) => {
    try {
      if (user) {
        const response = await axios.patch(`/api/users/${user._id}`, data);
        setUserData(response.data.user);
        console.log('User information updated successfully');
      }
    } catch (error) {
      console.error('Error updating user information', error);
    }
  };

  const handleSaveAddress = async () => {
    try {
      if (user) {
        const addressData = {
          userId: user._id,
          city,
          country,
          state,
          province,
          zipcode,
          apartment,
          plate,
          houseNumber,
          doorColor,
          details,
        };

        let response;
        if (isEditing && userAddress) {
          response = await axios.patch(`/api/address/${user._id}/${userAddress._id}`, addressData);
          console.log('Address updated successfully');
        } else {
          response = await axios.post(`/api/address/`, addressData);
          console.log('Address added successfully');
        }

        setUserAddresses(prevAddresses => [...prevAddresses, response.data.address]);

        setAddAddress(false);
        resetAddressForm();
      }
    } catch (error) {
      console.error('Error updating address', error);
    }
  };

  const handleAddAddress = () => {
    setAddAddress(true);
    setIsEditing(false);
    resetAddressForm();
  };

  const setFormFields = (address: UserAddress) => {
    setCity(address.city || '');
    setCountry(address.country || '');
    setState(address.state || '');
    setProvince(address.province || '');
    setZipCode(address.zipcode || '');
    setApartment(address.apartment || '');
    setPlate(address.plate || '');
    setHouseNumber(address.houseNumber || '');
    setDoorColor(address.doorColor || '');
    setDetails(address.details || '');
  };

  const handleEditAddress = (address: UserAddress) => {
    setAddAddress(true);
    setIsEditing(true);
    setUserAddress(address);
    setFormFields(address);
  };

  const resetAddressForm = () => {
    setCity('');
    setCountry('');
    setState('');
    setProvince('');
    setZipCode('');
    setApartment('');
    setPlate('');
    setHouseNumber('');
    setDoorColor('');
    setDetails('');
  };

  const handleSaveEmergencyInfo = async () => {
    try {
      if (user) {
        const response = await axios.patch(`/api/user/${user._id}`, { emergencyContact });
        setEmergencyContact(response.data.user.emergencyContact);
        console.log('Emergency contact updated successfully');
      }
    } catch (error) {
      console.error('Failed to update emergency contact', error);
    }
  };

  return (
    <DashboardLayout title='Settings'>
      <Tabs defaultValue='userInformation' onValueChange={(value) => setActiveTab(value)}>
        <TabsList>
          <TabsTrigger value='userInformation'>User Information</TabsTrigger>
          <TabsTrigger value='userAddress'>User Address</TabsTrigger>
          <TabsTrigger value='userEmergencyContact'>Emergency Contact</TabsTrigger>
        </TabsList>
        <TabsContent value='userInformation'>
          <UserInformationTab userData={userData} handleSaveUserInfo={handleSaveUserInfo} />
        </TabsContent>
        <TabsContent value='userAddress'>
          <UserAddressTab
            userAddresses={userAddresses}
            handleEditAddress={handleEditAddress}
            handleAddAddress={handleAddAddress}
            handleSaveAddress={handleSaveAddress}
            addAddress={addAddress}
            setAddAddress={setAddAddress}
            isEditing={isEditing}
            city={city}
            setCity={setCity}
            country={country}
            setCountry={setCountry}
            state={state}
            setState={setState}
            province={province}
            setProvince={setProvince}
            zipcode={zipcode}
            setZipCode={setZipCode}
            apartment={apartment}
            setApartment={setApartment}
            plate={plate}
            setPlate={setPlate}
            houseNumber={houseNumber}
            setHouseNumber={setHouseNumber}
            doorColor={doorColor}
            setDoorColor={setDoorColor}
            details={details}
            setDetails={setDetails}
          />
        </TabsContent>
        <TabsContent value='userEmergencyContact'>
          <EmergencyContactTab
            emergencyContact={emergencyContact}
            setEmergencyContact={setEmergencyContact}
            handleSaveEmergencyInfo={handleSaveEmergencyInfo}
          />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
