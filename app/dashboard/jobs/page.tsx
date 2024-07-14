'use client';
import React, { useEffect, useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserData ,UserAddress , UserJobs} from '@/types/types'
import axios from 'axios';
import PostingJobTab from '@/components/dashboard/PostingJobTab';
export default function Jobs() {

  const [activeSession, setActiveSession] = useState('userInformation');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab ,setActiveTab] = useState('PostingJob');
  const [useJobs , setUserJobs] = useState<UserJobs | null>(null);

 


  return (
      <Tabs defaultValue='PostingJob' onValueChange={(value)=> setActiveTab(value)}>
      <TabsList>
        <TabsTrigger value='PostingJob'>Posting Job</TabsTrigger>
        <TabsTrigger value='CurrentJobs'>CurrentJob</TabsTrigger>
        <TabsTrigger value='InProcessJobs'>In Proccess</TabsTrigger>
        <TabsTrigger value='FinishedJobs'>Finished Jobs</TabsTrigger>
      </TabsList>
      <TabsContent value='PostingJob'>
        {/* <PostingJobTab userData={userData} handlePostJob={handlePostJob}/> */}
      </TabsContent>
      </Tabs>
  );
}
