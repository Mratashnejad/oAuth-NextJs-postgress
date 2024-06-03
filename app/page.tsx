'use client';
import React from 'react';
import { SearchMenu } from '@/components/searchMenu';
import ImageMenu from '@/components/ImageMenu';
import { useQuery } from 'react-query';
import Axios from 'axios';

export default function Home() {

  const { data, isLoading, error } = useQuery(['test'], () => {
    return Axios.get('/api/users/').then((res) => res.data);
  });

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <section className='py-8'>
        <div className="container justify-center items-center">
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-bold text-accent">Find The Best Around You</h1>
            <p className="text-lg text-muted-foreground mb-4">Discover the finest services and experiences near you.</p>
            <div>
              {/* Check if data.users is an array and map through it */}
              {data?.users?.map((user) => (
                <div key={user.uid}>
                  <p>Phone Number: {user.name}</p>
                  <p>Phone Number: {user.phoneNumber}</p>
                </div>
              ))}
            </div>
            <SearchMenu />
          </div>
          <ImageMenu />
        </div>
      </section>
    </>
  );
}
