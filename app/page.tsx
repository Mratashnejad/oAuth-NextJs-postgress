'use client'
import React from 'react';
import { SearchMenu } from '@/components/searchMenu';
import ImageMenu from '@/components/ImageMenu';
import {useRouter} from "next/navigation"
import {useEffect} from "react"
import { useAuth } from './context/AuthContext';


export default function Home() {
  
  const router = useRouter();
  const { user } = useAuth()

  // useEffect (()=>{
  //     if (user){
  //       router.push('/dashboard')
  //   }
  // },[user , router]);

  return (
    <section className='py-8'>
      <div className="container justify-center items-center">
        <div className="mb-8"> {/* Add margin bottom to create space */}
          <SearchMenu />
        </div>
        <ImageMenu />
      </div>
     
    </section>
  );
}
