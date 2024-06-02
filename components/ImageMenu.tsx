import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';

const ImageMenu = () => {
  return (
    <div className="flex justify-center items-center">
      <div className='gap-4'>
      <Card >
            <Image src='/assets/images/worker.jpg' height={200} width={200} alt='worker' className="rounded-md object-cover" />
        </Card>
       </div>
       <div className='gap-4'>
      <Card >
            <Image src='/assets/images/beauty.jpg' height={200} width={200} alt='beauty' className="rounded-md object-cover" />
        </Card>
       </div>
       <div className='gap-4'>
        <Card>
            <Image src='/assets/images/lawyer.jpg' height={200} width={200} alt='lawyer' className="rounded-md object-cover" />
        </Card>
       </div>
       <div className='gap-4'>
      <Card >
            <Image src='/assets/images/HairStyles.jpg' height={200} width={200} alt='HairStyles ' className="rounded-md object-cover" />
        </Card>
       </div>
    </div>
  );
};

export default ImageMenu;
