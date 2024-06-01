'use client'
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UserInfoForm from '@/components/forms/UserInfoForm';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { UserData, UserAddress } from '@/types/types';
import { Dialog,DialogDescription, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"

export default function Settings() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userAddress, setUserAddress] = useState<UserAddress | null>(null);
  const [addAddress, setAddAddress] = useState(false);
  const [userAddresses, setUserAddresses] = useState<UserAddress[]>([]);
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
  const [emergencyContact, setEmergencyContact] = useState< { name: string, relationship: string, phoneNumber: string }>({
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
         

<Card>
  <CardHeader>
    <CardTitle>User Information</CardTitle>
    <CardDescription>Details about the User {userData?.phoneNumber}</CardDescription>
  </CardHeader>
  <CardContent>
    {userData ? (
      <UserInfoForm userData={userData} onSave={handleSaveUserInfo} />
    ) : (
      <div>Loading User data ...</div>
    )}
  </CardContent>
</Card>
</TabsContent>

<TabsContent value='userAddress'>
    <Card className="shadow-md">
    <CardHeader>
      <CardTitle>User Address</CardTitle>
      <CardDescription>Details about the User {userData?.phoneNumber}</CardDescription>
      <CardDescription>Edit or update your address</CardDescription>
      <CardHeader>
      </CardHeader>
    </CardHeader>
    <CardContent>
    {userAddresses.length > 0 ? (
  userAddresses.map((address, index) => (
    address && address._id ? ( // Check if address and _id exist
      <div key={address._id} className="mb-4 border-b border-gray-200 pb-4">
        <div className="mb-2 text-gray-700">
          <span className="font-bold">ID:</span> {address._id} | 
          <span className="font-bold">City:</span> {address.city} | 
          <span className="font-bold">State:</span> {address.state} | 
          <span className="font-bold">Country:</span> {address.country}
        </div>
        <div className="mb-2 text-gray-700">
          <span className="font-bold">Zip Code:</span> {address.zipcode}
        </div>
        <div className="mb-2 text-gray-700">
          <span className="font-bold">Address:</span> {address.apartment}, <span className="font-bold">House Number:</span> {address.houseNumber}, <span className="font-bold">Plate:</span> {address.plate}
        </div>
        <div className="mb-2 text-gray-700">
          <span className="font-bold">Details:</span> {address.details}
        </div>
        <Button variant='outline' onClick={() => handleEditAddress(address)}>Edit</Button>
      </div>
    ) : null
  ))
) : (
  <div>No addresses found.</div>
)}


      <Dialog open={addAddress} onOpenChange={setAddAddress}>
        <DialogTrigger asChild>
          <Button variant='outline' onClick={handleAddAddress}>Add Address</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Address' : 'Add Address'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Edit your address details.' : 'Add your address to your profile.'}
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='city'>City:</Label>
                <Input
                  type='text'
                  id='city'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-10"
                />
              </div>
              <div>
                <Label htmlFor='country'>Country:</Label>
                <Input
                  type='text'
                  id='country'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="h-10"
                />
              </div>
              <div>
                <Label htmlFor='state'>State:</Label>
                <Input
                  type='text'
                  id='state'
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="h-10"
                />
              </div>
              <div>
                <Label htmlFor='province'>Province:</Label>
                <Input
                  type='text'
                  id='province'
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="h-10"
                />
              </div>
              <div>
                <Label htmlFor='zipcode'>Zip Code:</Label>
                <Input
                  type='text'
                  id='zipcode'
                  value={zipcode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="h-10"
                />
              </div>
              <div>
                <Label htmlFor='apartment'>Apartment:</Label>
                <Input
                  type='text'
                  id='apartment'
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  className="h-10"
                />
              </div>
              <div>
                <Label htmlFor='plate'>Plate:</Label>
                <Input
                  type='text'
                  id='plate'
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                  className="h-10"
                />
              </div>
              <div>
                <Label htmlFor='houseNumber'>House Number:</Label>
                <Input
                  type='text'
                  id='houseNumber'
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                  className="h-10"
                />
              </div>
              <div>
                <Label htmlFor='doorColor'>Door Color:</Label>
                <Input
                  type='text'
                  id='doorColor'
                  value={doorColor}
                  onChange={(e) => setDoorColor(e.target.value)}
                  className="h-10"
                />
              </div>
              <div>
                <Label htmlFor='details'>Details:</Label>
                <Textarea
                  id='details'
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="h-20"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' onClick={handleSaveAddress}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CardContent>
  </Card>
</TabsContent>

<TabsContent value='userEmergencyContact'>
  <Card>
    <CardHeader>
      <CardTitle>Emergency Contact</CardTitle>
      <CardDescription>Edit or update your emergency contact information</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="mb-4">
      
        <Label htmlFor='emergencyName'>Name:{emergencyContact.name}</Label>
        <Input
          type='text'
          id='emergencyName'
          value={emergencyContact.name}
          onChange={(e) => setEmergencyContact(prev => ({ ...prev, name: e.target.value }))}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor='emergencyRelationship'>Relationship:</Label>
        <Input
          type='text'
          id='emergencyRelationship'
          value={emergencyContact.relationship}
          onChange={(e) => setEmergencyContact(prev => ({ ...prev, relationship: e.target.value }))}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor='emergencyPhoneNumber'>Phone Number:</Label>
        <Input
          type='text'
          id='emergencyPhoneNumber'
          value={emergencyContact.phoneNumber}
          onChange={(e) => setEmergencyContact(prev => ({ ...prev, phoneNumber: e.target.value }))}
        />
      </div>

      <Button onClick={handleSaveEmergencyInfo}>Save</Button>
    </CardContent>
  </Card>
</TabsContent>
</Tabs>
</DashboardLayout>
);
}
