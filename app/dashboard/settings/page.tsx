'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import UserInfoForm from '@/components/forms/UserInfoForm';
import UserAddressForm from '@/components/forms/UserAddressForm';
import UserEmergencyContentForm from '@/components/forms/UserEmergencyContentFrom';
import { getUserData, setUserInfoData } from '@/app/api/users/api';
import { UserData } from '../../../types/types';
import DashboardLayout from '@/components/dashboard/dashboardLayout'; // Adjust the path if necessary

export default function Settings() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeSession, setActiveSession] = useState('userInformation');
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const data = await getUserData(user._id);
          setUserData(data);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [user]);

  const handleNavigation = (section: string) => {
    setActiveSession(section);
  };

  const handleSaveUserInfo = async (data: UserData) => {
    try {
      if (data) {
        const response = await setUserInfoData(user._id, data);
        if (response.ok) {
          console.log('User information updated successfully');
        } else {
          console.error('Failed to update user information');
        }
      }
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm text-muted-foreground">
          <Button variant="link" className="font-semibold text-primary" onClick={() => handleNavigation('userInformation')}>
            User Information
          </Button>
          <Button variant="link" className="font-semibold text-primary" onClick={() => handleNavigation('userAddress')}>
            User Address
          </Button>
          <Button variant="link" className="font-semibold text-primary" onClick={() => handleNavigation('userEmergencyContent')}>
            Emergency Contact
          </Button>
        </nav>
        {activeSession === 'userInformation' && (
          <div className="grid gap-6">
            {userData ? (
              <Card>
                <CardHeader>
                  <CardTitle>User Information</CardTitle>
                  <CardDescription>Details about the User {userData.phoneNumber}</CardDescription>
                </CardHeader>
                <CardContent>
                  <UserInfoForm userData={userData} onSave={handleSaveUserInfo} />
                </CardContent>
              </Card>
            ) : (
              <div>Loading User data ...</div>
            )}
          </div>
        )}
        {activeSession === 'userAddress' && (
          <UserAddressForm />
        )}
        {activeSession === 'userEmergencyContent' && (
          <UserEmergencyContentForm />
        )}
      </div>
    </DashboardLayout>
  );
}
