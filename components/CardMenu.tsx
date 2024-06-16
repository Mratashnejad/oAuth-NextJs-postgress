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
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <div className="font-bold">{user?.name}</div>
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
              <div><Label htmlFor="email">{user?.email}</Label></div>
              <div><Label htmlFor="language">{user?.language}</Label></div>
              <div><Label htmlFor="city">{user?.addresses?.city}</Label></div>
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
