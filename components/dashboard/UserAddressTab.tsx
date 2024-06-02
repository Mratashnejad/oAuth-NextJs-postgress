import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { UserAddress } from '@/types/types';

interface UserAddressTabProps {
  userAddresses: UserAddress[];
  handleEditAddress: (address: UserAddress) => void;
  handleAddAddress: () => void;
  handleSaveAddress: () => Promise<void>;
  addAddress: boolean;
  setAddAddress: (value: boolean) => void;
  isEditing: boolean;
  setFormFields: (address: UserAddress) => void;
  city: string;
  setCity: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
  state: string;
  setState: (value: string) => void;
  province: string;
  setProvince: (value: string) => void;
  zipcode: string;
  setZipCode: (value: string) => void;
  apartment: string;
  setApartment: (value: string) => void;
  plate: string;
  setPlate: (value: string) => void;
  houseNumber: string;
  setHouseNumber: (value: string) => void;
  doorColor: string;
  setDoorColor: (value: string) => void;
  details: string;
  setDetails: (value: string) => void;
}

const UserAddressTab: React.FC<UserAddressTabProps> = ({
  userAddresses,
  handleEditAddress,
  handleAddAddress,
  handleSaveAddress,
  addAddress,
  setAddAddress,
  isEditing,
  city,
  setCity,
  country,
  setCountry,
  state,
  setState,
  province,
  setProvince,
  zipcode,
  setZipCode,
  apartment,
  setApartment,
  plate,
  setPlate,
  houseNumber,
  setHouseNumber,
  doorColor,
  setDoorColor,
  details,
  setDetails,
}) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>User Address</CardTitle>
        <CardDescription>Edit or update your address</CardDescription>
      </CardHeader>
      <CardContent>
        {userAddresses.length > 0 ? (
          userAddresses.map((address) => (
            address && address._id ? (
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
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='city'>City:</Label>
                  <Input type='text' id='city' value={city} onChange={(e) => setCity(e.target.value)} className="h-10" />
                </div>
                <div>
                  <Label htmlFor='country'>Country:</Label>
                  <Input type='text' id='country' value={country} onChange={(e) => setCountry(e.target.value)} className="h-10" />
                </div>
                <div>
                  <Label htmlFor='state'>State:</Label>
                  <Input type='text' id='state' value={state} onChange={(e) => setState(e.target.value)} className="h-10" />
                </div>
                <div>
                  <Label htmlFor='province'>Province:</Label>
                  <Input type='text' id='province' value={province} onChange={(e) => setProvince(e.target.value)} className="h-10" />
                </div>
                <div>
                  <Label htmlFor='zipcode'>Zip Code:</Label>
                  <Input type='text' id='zipcode' value={zipcode} onChange={(e) => setZipCode(e.target.value)} className="h-10" />
                </div>
                <div>
                  <Label htmlFor='apartment'>Apartment:</Label>
                  <Input type='text' id='apartment' value={apartment} onChange={(e) => setApartment(e.target.value)} className="h-10" />
                </div>
                <div>
                  <Label htmlFor='plate'>Plate:</Label>
                  <Input type='text' id='plate' value={plate} onChange={(e) => setPlate(e.target.value)} className="h-10" />
                </div>
                <div>
                  <Label htmlFor='houseNumber'>House Number:</Label>
                  <Input type='text' id='houseNumber' value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} className="h-10" />
                </div>
                <div>
                  <Label htmlFor='doorColor'>Door Color:</Label>
                  <Input type='text' id='doorColor' value={doorColor} onChange={(e) => setDoorColor(e.target.value)} className="h-10" />
                </div>
                <div>
                  <Label htmlFor='details'>Details:</Label>
                  <Textarea id='details' value={details} onChange={(e) => setDetails(e.target.value)} className="h-20" />
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
  );
};

export default UserAddressTab;
