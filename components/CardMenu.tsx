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
import { useRouter } from 'next/navigation';


// Function to capitalize the first letter of a string, handling undefined or null
const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function CardMenu() {
  const { toast } = useToast();
  const { data, isLoading, isError, refetch } = useGetUserData();
  const router = useRouter();

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

  const handelCardClick = (userId)=>{
    router.push(`/user/${userId}`)
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data?.users?.map(user => (
        <div key={user._id} onClick={()=>handelCardClick(user._id)}>
          <Card className="h-full rounded-lg shadow-md overflow-hidden relative transition-transform transform hover:scale-105">
            <CardHeader className="bg-gray-100 p-2 flex items-center">
              <Avatar className='h-16 w-16 absolute left-2'>
                <AvatarImage src={user?.avatarUrl || "https://github.com/shadcn.png"} />
                <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="ml-20">
                <div className="font-bold text-lg mb-1">{capitalizeFirstLetter(user?.name)}</div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className={`h-4 w-4 ${index < user?.rate?.length ? 'text-yellow-500' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <CardDescription className="text-sm text-gray-600 mb-1">Skills: {user?.skills?.join(', ')}</CardDescription>
              <CardDescription className="text-sm text-gray-600 mb-1">Languages: {user?.languages?.join(', ')}</CardDescription>
              <CardDescription className="text-sm text-gray-600 mb-1">Experience: {user?.experience} years</CardDescription>
              <div className="flex items-center space-x-2">
                {user?.languages?.map((lang, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    {/* Replace 'flag-icon' with an appropriate icon component */}
                    <span className="bg-gray-200 rounded-full h-5 w-5 flex items-center justify-center">Icon</span>
                    <Label className="text-xs">{capitalizeFirstLetter(lang)}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-2 flex justify-between text-xs text-gray-500">
              <div><Label htmlFor="jobs">Jobs: </Label>{user?.completedJobCount}</div>
              <div><Label htmlFor="joinDate">Join Date: </Label>{new Date(user?.createdAt).toLocaleDateString()}</div>
              <div><Label htmlFor="location">Location: </Label>{user?.location || 'Yerevan'}</div>
              <div><Label htmlFor="reviews">Reviews: </Label>{user?.reviews || 12}</div>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
