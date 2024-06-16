'use client';
import React , { useEffect } from 'react';
import ProgressBar from "./ProgressBar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useGetUserData } from "@/app/hooks/useGetUserData"
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from "@/components/ui/toast"

export default function CardMenu() {
  const { toast } = useToast();
  const {data , isLoading , isError , refetch}= useGetUserData();
  // const router = useRouter();
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
    {data?.users?.map(i =>(
      <div key ={i._id}>
      <Card className="w-[350px]">
      <CardHeader>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
        <CardTitle>{i?.name}</CardTitle>
        <CardDescription>{i?.bio}</CardDescription>
      </CardHeader>
      <CardContent>
        <div><Label htmlFor="name">{i?.email}</Label></div>
        <div><Label htmlFor="name">{i?.language}</Label></div>
        <div><Label htmlFor="name">{i?.addresses?.city}</Label></div>
        <Label htmlFor="rating">Rating : {i?.rate?.length }</Label>
      </CardContent>
      <CardFooter>
      <div><Label htmlFor="name">Jobs :   {i?.completedJobCount}</Label></div><br/>
      <div><Label htmlFor="name">Join At  {i?.createdAt}</Label></div>
      </CardFooter>
    </Card>
    </div>
    ))}
  </>
  )
}

