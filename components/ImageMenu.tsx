import React from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { CodeXml, Construction, Car, Syringe, Cake } from 'lucide-react';

const components = [
  {
    title: "Developers",
    href: "/categories/developers",
    description: "Skilled coders",
    icon: <CodeXml size={56} />,
  },
  {
    title: "Health and Beauty",
    href: "/categories/health-beauty",
    description: "Self-care services",
    icon: <Syringe size={56} />,
  },
  {
    title: "Event planning",
    href: "/categories/assemblies-events",
    description: "Assembeling events",
    icon: <Cake size={56} />,
  },
  {
    title: "Construction Works",
    href: "/categories/construction-works",
    description: "Construction labor",
    icon: <Construction size={56} />,
  },
  {
    title: "Car Services",
    href: "/categories/car-services",
    description: "Vehicle maintenance",
    icon: <Car size={56} />,
  },
];

const ImageMenu = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {components.map((component, index) => (
          <a key={index} href={component.href} className="block group">
            <Card className="overflow-hidden flex flex-col items-center justify-center h-36 w-40 md:w-48 hover:shadow-lg transition-shadow">
              <div className="mb-2">
                {component.icon}
              </div>
              <CardContent className="p-2 text-center">
                <CardTitle className="text-lg font-semibold">{component.title}</CardTitle>
                <CardDescription className="text-sm text-gray-900">{component.description}</CardDescription>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ImageMenu;
