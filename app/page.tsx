'use client';
import React, { useEffect } from 'react';
import { SearchMenu } from '@/components/searchMenu';
import { useGetUserData } from './hooks/useGetUserData';
import ProgressBar from '@/components/ProgressBar';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from "@/components/ui/toast";
import dynamic from 'next/dynamic';
import { SkeletonCard } from '@/components/skeletonCard';

const ImageMenu = dynamic(() => import('@/components/ImageMenu'));
const CardMenu = dynamic(() => import('@/components/CardMenu'));

export default function Home() {
  const { toast } = useToast();
  const { data, isLoading, isError, refetch } = useGetUserData();
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: (<ToastAction altText="Try again" onClick={() => { refetch() }}>Try again</ToastAction>),
      })
    }
  }, [isError, refetch, toast]); // Only re-run the effect if isError or toast changes

  if (isLoading) {
    return (
      <div className="py-2">
        <ProgressBar isLoading={true} />
       
          <div className='flex justify-between'>
            <SkeletonCard /> {/* Placeholder for CardMenu */}
          </div>
        </div>
    );
  }

  return (
    <>
      <section className='py-2'>
        <div className="container justify-center items-center">        
          <div className='flex justify-between'>
            <CardMenu />
          </div>
        </div>
      </section>
    </>
  );
}
