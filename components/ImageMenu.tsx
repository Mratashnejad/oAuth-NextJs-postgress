import React from 'react';
import Image from 'next/image';
import {
  Card,
} from "@/components/ui/card";

const ImageMenu = () => {
  return (
    <section className='mx-10'>
      <div className="flex justify-center items-center gap-4">
        <Card className='flex items-center justify-center'>
          <Image src='/assets/images/worker.jpg' height={100} width={70} alt='worker' className="rounded-md object-cover" />
        </Card>
        <Card className='flex items-center justify-center'>
          <Image src='/assets/images/beauty.jpg' height={100} width={70} alt='beauty' className="rounded-md object-cover" />
        </Card>
        <Card className='flex items-center justify-center'>
          <Image src='/assets/images/lawyer.jpg' height={100} width={70} alt='lawyer' className="rounded-md object-cover" />
        </Card>
        <Card className='flex items-center justify-center'>
          <Image src='/assets/images/HairStyles.jpg' height={100} width={70} alt='HairStyles' className="rounded-md object-cover" />
        </Card>
        <Card className='flex items-center justify-center'>
          <Image src='/assets/images/HairStyles.jpg' height={100} width={70} alt='HairStyles' className="rounded-md object-cover" />
        </Card>
        <Card className='flex items-center justify-center'>
          <Image src='/assets/images/HairStyles.jpg' height={100} width={70} alt='HairStyles' className="rounded-md object-cover" />
        </Card>
       
      </div>
    </section>
  );
};

export default ImageMenu;
