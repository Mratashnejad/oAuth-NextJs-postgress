'use client';

import React, { useEffect } from 'react';
import ProgressBar from "./ProgressBar";
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useGetUserData } from "@/app/hooks/useGetUserData";
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from "@/components/ui/toast";

// Function to capitalize the first letter of a string, handling undefined or null
const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function CardMenu() {
  const { toast } = useToast();
  const { data, isLoading, isError, refetch } = useGetUserData();

  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: (<ToastAction altText="Try again" onClick={refetch}>Try again</ToastAction>),
      });
    }
  }, [isError, refetch, toast]);

  if (isLoading) return <h1><ProgressBar isLoading={true} /></h1>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data?.users?.map(user => (
        <div key={user._id}>
          <Card className="h-full rounded-xl shadow-md overflow-hidden relative">
            <CardHeader className="bg-gray-100 p-4 flex items-center">
              <Avatar className='h-20 w-20 absolute  -left-0'>
                <AvatarImage src={user?.avatarUrl || "https://github.com/shadcn.png"} />
                <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="ml-24">
                <div className="font-bold text-xl mb-2">{capitalizeFirstLetter(user?.name)}</div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className={`h-5 w-5 ${index < user?.rate?.length ? 'text-yellow-500' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardDescription className="text-sm text-gray-600 mb-2">Skills: {user?.bio}</CardDescription>
              <CardDescription className="text-sm text-gray-600 mb-2">Languages: {user?.bio}</CardDescription>
              <CardDescription className="text-sm text-gray-600 mb-2">Year of Experiance: </CardDescription>
              <div className="flex items-center space-x-2">
                {user?.languages?.map((lang, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    {/* Replace 'flag-icon' with an appropriate icon component */}
                    <span className="bg-gray-200 rounded-full h-6 w-6 flex items-center justify-center">Icon</span>
                    <Label>{capitalizeFirstLetter(lang)}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 flex justify-between text-sm text-gray-500">
              <div><Label htmlFor="jobs">Jobs: </Label>{user?.completedJobCount}</div>
              {/* <div><Label htmlFor="joinDate">Join Date: </Label>{new Date(user?.createdAt).toLocaleDateString()}</div> */}
              <div><Label htmlFor="jobs">Location: Yerevan </Label>{user?.address}</div>
              <div><Label htmlFor="jobs">Reviews: 12 </Label>{user?.address}</div>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
