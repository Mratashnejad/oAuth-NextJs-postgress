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
    <>
      {data?.users?.map(user => (
        <div key={user._id}>
          <Card className="w-[350px]">
            <CardHeader>
              <div className='flex items-center'>
                <Avatar>
                  <AvatarImage src={user?.avatarUrl || "https://github.com/shadcn.png"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <div className="font-bold">{capitalizeFirstLetter(user?.name)}</div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} className={`h-4 w-4 ${index < user?.rate?.length ? 'text-yellow-500' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <CardTitle></CardTitle>
              <CardDescription>{user?.bio}</CardDescription>
            </CardHeader>
            <CardContent>
              <div><Label htmlFor="email">{capitalizeFirstLetter(user?.email)}</Label></div>
              <div className="flex items-center space-x-2">
                {user?.languages?.map((lang, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    {/* Replace 'flag-icon' with an appropriate icon component */}
                    <span className="flag-icon bg-gray-200 rounded-full h-6 w-6 flex items-center justify-center">Icon</span>
                    <Label>{capitalizeFirstLetter(lang)}</Label>
                  </div>
                ))}
              </div>
              <div><Label htmlFor="city">{capitalizeFirstLetter(user?.addresses?.city)}</Label></div>
              <Label htmlFor="rating">Rating: {user?.rate?.length}</Label>
            </CardContent>
            <CardFooter className="p-4 flex justify-between text-sm text-gray-500">
              <div><Label htmlFor="jobs">Jobs: </Label>{user?.completedJobCount}</div>
              <div><Label htmlFor="joinDate">Join At: </Label>{new Date(user?.createdAt).toLocaleDateString()}</div>
            </CardFooter>
          </Card>
        </div>
      ))}
    </>
  );
}
