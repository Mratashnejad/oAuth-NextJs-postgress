'use client';
import React , { useEffect } from 'react';
import { SearchMenu } from '@/components/searchMenu';
import ImageMenu from '@/components/ImageMenu';
import { useGetUserData } from './hooks/useGetUserData';
import ProgressBar from '@/components/ProgressBar';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from "@/components/ui/toast"
import CardMenu from '@/components/CardMenu';

export default function Home() {


  const { toast } = useToast();
  const {data ,isLoading,isError ,refetch }=useGetUserData();
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: (<ToastAction altText="Try again" onClick={()=>{refetch()}}>Try again</ToastAction>),
      })
    }
  }, [isError,refetch, toast]); // Only re-run the effect if isError or toast changes

  if(isLoading) return <h1> <ProgressBar isLoading={true}/> </h1>;


  return (
    <>
      <section className='py-2'>
        <div className="container justify-center items-center">
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-bold text-accent">Find The Best Around You</h1>
            <p className="text-lg text-muted-foreground mb-4">Discover the finest services and experiences near you.</p>
            <div>
            </div>
            <SearchMenu />
          </div>
          <div className='flex justify-between'>
          <CardMenu/>
          </div>
          
          {/* <ImageMenu /> */}
        </div>
      </section>
    </>
  );
}
