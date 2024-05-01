'use client'
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import armenianCitiesData from '@/public/data/armenian-cities.json'

export function SearchMenu() {
  const [selectedCity, setSelectedCity] = useState('yerevan'); // Default to Yerevan
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedDistrict('');
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 space-x-4">
        {/* Dropdown for selecting city */}
        <div className="relative">
          <select
            className="block appearance-none w-40 bg-transparent border border-gray-300 text-gray-700 dark:text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={selectedCity}
            onChange={handleCityChange}
          >
            {/* Map over the array of cities to create options in the dropdown */}
            {armenianCitiesData.map((city, index) => (
              <option key={index} value={city.name.toLowerCase()}>
                {city.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            {/* Dropdown arrow icon */}
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 14.293a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 11.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4z"
              />
            </svg>
          </div>
        </div>

        {/* Dropdown for selecting city district */}
        {selectedCity && (
          <div className="relative">
            <select
              className="block appearance-none w-40 bg-transparent border border-gray-300 text-gray-700 dark:text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={selectedDistrict}
              onChange={handleDistrictChange}
            >
              {/* Map over the districts of the selected city to create options in the dropdown */}
              {armenianCitiesData.find((city) => city.name.toLowerCase() === selectedCity)?.districts.map((district, index) => (
                <option key={index} value={district.toLowerCase()}>
                  {district}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              {/* Dropdown arrow icon */}
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 14.293a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 11.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4z"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Text input for searching */}
        <div className="relative flex items-center">
          <Input
            type="search"
            placeholder="Search for your best expert..."
            className="w-80 md:w-96"
          />
          <button
            className="ml-2 p-2 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors focus:outline-none"
            aria-label="Search"
          >
            <Search className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
