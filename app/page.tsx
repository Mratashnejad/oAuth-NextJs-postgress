import React from 'react';
import { SearchMenu } from '@/components/searchMenu';
import ImageMenu from '@/components/ImageMenu';
import { CodeXml, Construction, Car, Syringe, Cake } from 'lucide-react'; // Import icons

export default function Home() {
  // Text entries for top developers and top cleaning services
  const topDevelopers = [
    { name: 'John Doe', skills: 'React, Node.js, MongoDB' },
    { name: 'Jane Smith', skills: 'Python, Django, PostgreSQL' },
    { name: 'Mike Johnson', skills: 'Java, Spring Boot, MySQL' }
  ];

  const topCleaningServices = [
    { name: 'Clean Sweep Inc.', specialties: 'Residential Cleaning, Deep Cleaning' },
    { name: 'Sparkle Cleaners', specialties: 'Office Cleaning, Carpet Cleaning' },
    { name: 'Elite Shine Services', specialties: 'Eco-friendly Cleaning, Window Washing' }
  ];

  return (
    <section className='py-8'>
      <div className="container justify-center items-center">
        <div className="mb-8"> {/* Add margin bottom to create space */}
          <SearchMenu />
        </div>
        <ImageMenu />

        {/* Display top developers with icons */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="mr-2"><CodeXml size={24} /></span> Top Developers
          </h2>
          <ul className="list-disc list-inside">
            {topDevelopers.map((developer, index) => (
              <li key={index}>
                <strong>{developer.name}</strong> - Skills: {developer.skills}
              </li>
            ))}
          </ul>
        </div>

        {/* Display top cleaning services with icons */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="mr-2"><Syringe size={24} /></span> Top Cleaning Services
          </h2>
          <ul className="list-disc list-inside">
            {topCleaningServices.map((service, index) => (
              <li key={index}>
                <strong>{service.name}</strong> - Specialties: {service.specialties}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
