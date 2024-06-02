'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserData ,UserAddress , UserJobs} from '@/types/types'
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import axios from 'axios';
import PostingJobTab from '@/components/dashboard/PostingJobTab';
export default function Jobs() {
  const { user } = useAuth();
  const [activeSession, setActiveSession] = useState('userInformation');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab ,setActiveTab] = useState('PostingJob');
  const [useJobs , setUserJobs] = useState<UserJobs | null>(null);

  
  const handlePostJob = async (userId:string)=>{
    try {
      if(user){
        const response = await axios.post(`/api/jobs/${userId}`);
        setUserJobs(response.data.jobs)
        console.log('Job is posted')
      }
     
    } catch (error) {
      console.error('Error Posting Job', error);
    }
  }


  return (
    <DashboardLayout title ='Jobs'>
      <Tabs defaultValue='PostingJob' onValueChange={(value)=> setActiveTab(value)}>
      <TabsList>
        <TabsTrigger value='PostingJob'>Posting Job</TabsTrigger>
        <TabsTrigger value='CurrentJobs'>CurrentJob</TabsTrigger>
        <TabsTrigger value='InProcessJobs'>In Proccess</TabsTrigger>
        <TabsTrigger value='FinishedJobs'>Finished Jobs</TabsTrigger>
      </TabsList>
      <TabsContent value='PostingJob'>
        <PostingJobTab userData={userData} handlePostJob={handlePostJob}/>
      </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
