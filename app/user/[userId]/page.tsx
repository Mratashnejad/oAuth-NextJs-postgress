import React from 'react';
import UserDetails from '@/components/userDetails';

const UserPage = ({ params }) => {
  const { userId } = params;

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UserDetails userId={userId} />
    </div>
  );
};

export default UserPage;
