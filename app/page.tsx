import React from 'react';
import { SearchMenu } from '@/components/searchMenu';
import ImageMenu from '@/components/ImageMenu';

export default function Home() {
  return (
    
    <section className='py-8'>
    <div className="container justify-center items-center">
      <div className="mb-8 text-center"> {/* Add margin bottom to create space */}
        <h1 className="text-5xl font-bold text-accent">Find The Best Around You</h1>
        <p className="text-lg text-muted-foreground mb-4">Discover the finest services and experiences near you.</p>
        <SearchMenu />
      </div>
      <ImageMenu />
    </div>
  </section>

  );
}
