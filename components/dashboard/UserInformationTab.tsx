import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UserInfoForm from '@/components/forms/UserInfoForm';
import { UserData } from '@/types/types';

interface UserInformationTabProps {
  userData: UserData | null;
  handleSaveUserInfo: (data: UserData) => Promise<void>;
}

const UserInformationTab: React.FC<UserInformationTabProps> = ({ userData, handleSaveUserInfo }) => {
  return (
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
  );
};

export default UserInformationTab;
