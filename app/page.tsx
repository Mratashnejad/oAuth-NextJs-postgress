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
      });
    }
  }, [isError, refetch, toast]);

  if (isLoading) {
    return (
      <>
      <div className="py-4">
        <ProgressBar isLoading={true} />
        <div className='flex justify-center'>
          <SkeletonCard />
        </div>
      </div>
      <div className="py-4">
      <ProgressBar isLoading={true} />
      <div className='flex justify-center'>
        <SkeletonCard />
      </div>
    </div>
    <div className="py-4">
        <ProgressBar isLoading={true} />
        <div className='flex justify-center'>
          <SkeletonCard />
        </div>
      </div>
      </>
    );
  }

  const sections = [
    { title: "Top Developers" },
    { title: "Top Mechanics" },
    { title: "Top Lawyers" },
    { title: "Top Doctors" },
  ];

  return (
    <>
      {sections.map((section, index) => (
        <section key={index} className='py-4'>
          <div className="container mx-auto">
            <h2 className='text-2xl font-bold mb-4 text-left'>{section.title}</h2>
            <div className='flex justify-center'>
              
              <CardMenu />
            </div>
            <div className='flex justify-end'>
              <button className='mt-4 text-blue-500 hover:text-blue-700 font-semibold'>
                Show more
              </button>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
