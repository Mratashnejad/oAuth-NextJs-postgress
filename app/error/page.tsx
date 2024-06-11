'use client'
import React from 'react'
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import '@/css/errorPage.css'


export default function ErrorPage() {
    const router = useRouter();
    const handleRetry = ()=>{
        router.refresh;
    }

  return (
    <>
   <div className='error-container'>
    <h1>Error Loading Data ...</h1>   
   </div>
   <div className='button-container'>
     <span><Button variant="destructive" onClick={handleRetry}>Retry</Button>
    <Button variant="outline" onClick={()=> router.back()}>Go Back</Button>
    </span>
   </div>
   </>
  )
}
