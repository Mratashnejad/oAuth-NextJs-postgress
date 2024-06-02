import React from 'react';
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
    <Card className="shadow-lg border rounded-lg overflow-hidden">
      <CardHeader className="">
        <CardTitle className="text-2xl">User Address</CardTitle>
        <CardDescription className="mt-2">Edit or update your address</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {userAddresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userAddresses.map((address) => (
              address && address._id ? (
                <div key={address._id} className="p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                  <div className="mb-2">
                    <span className="font-bold">City:</span> {address.city}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">State:</span> {address.state}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">Country:</span> {address.country}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">Zip Code:</span> {address.zipcode}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">Apartment:</span> {address.apartment}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">House Number:</span> {address.houseNumber}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">Plate:</span> {address.plate}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">Door Color:</span> {address.doorColor}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">Details:</span> {address.details}
                  </div>
                  <Button variant='outline' onClick={() => handleEditAddress(address)} className="mt-2">
                    Edit
                  </Button>
                </div>
              ) : null
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No addresses found.</div>
        )}
        <div className="mt-6 flex justify-center">
          <Dialog open={addAddress} onOpenChange={setAddAddress}>
            <DialogTrigger asChild>
              <Button variant='primary' onClick={handleAddAddress} className="hover:bg-blue-600">
                Add Address
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[600px] bg-white p-6 rounded-lg shadow-lg'>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">{isEditing ? 'Edit Address' : 'Add Address'}</DialogTitle>
              </DialogHeader>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 py-4'>
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
                <div className="col-span-2">
                  <Label htmlFor='details'>Details:</Label>
                  <Textarea id='details' value={details} onChange={(e) => setDetails(e.target.value)} className="h-20" />
                </div>
              </div>
              <DialogFooter>
                <Button type='submit' onClick={handleSaveAddress} className="bg-indigo-500 text-white hover:bg-indigo-600">
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserAddressTab;
