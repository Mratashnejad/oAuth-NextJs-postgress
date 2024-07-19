'use client'
import React, { useState } from 'react';
import UserSchema from "@/schemas/userSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function ProfileForm() {
    const [activeTab, setActiveTab] = useState('personal');

    const form = useForm({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            uid: "",
            email: "",
            password: "",
            phoneNumber: "",
            name: "",
            family: "",
            avatar: "",
            bio: "",
            category: "",
            location: "",
            skills: [],
            language: [],
            rate: [],
            addresses: [],
            receivedReviews: [],
            givenReviews: [],
            redFlags: [],
            KPI: [],
            violations: [],
            breaches: [],
            emergencyContact: {
                name: "",
                relationship: "",
                phoneNumber: ""
            },
            emergencyNumber: "",
        }
    });

    const handleSubmitButton = (data) => {
        console.log(data);  // Log the form data
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Update Your Profile</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitButton)} className="space-y-6">
                    
                    {/* Tab Navigation */}
                    <div className="flex space-x-4 mb-6">
                        <button
                            type="button"
                            className={`px-4 py-2 rounded-md ${activeTab === 'personal' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setActiveTab('personal')}
                        >
                            Personal Information
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-2 rounded-md ${activeTab === 'professional' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setActiveTab('professional')}
                        >
                            Professional Details
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-2 rounded-md ${activeTab === 'emergency' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setActiveTab('emergency')}
                        >
                            Emergency Contact
                        </button>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'personal' && (
                        <div className="space-y-6">
                            {/* UID */}
                            <FormField
                                control={form.control}
                                name="uid"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">UID</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border rounded-md p-2 w-full" readOnly />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />

                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Email Address</FormLabel>
                                        <FormControl>
                                            <Input type="email" {...field} className="border rounded-md p-2 w-full" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />

                            {/* Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} className="border rounded-md p-2 w-full" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />

                            {/* Phone Number */}
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Phone Number</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border rounded-md p-2 w-full" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />

                            {/* Name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border rounded-md p-2 w-full" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />
                            
                            {/* Family */}
                            <FormField
                                control={form.control}
                                name="family"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Family</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border rounded-md p-2 w-full" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />
                            
                            {/* Avatar */}
                            <FormField
                                control={form.control}
                                name="avatar"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Avatar URL</FormLabel>
                                        <FormControl>
                                            <Input type="url" {...field} className="border rounded-md p-2 w-full" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />
                            
                            {/* Bio */}
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Bio</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border rounded-md p-2 w-full" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    {activeTab === 'professional' && (
                        <div className="space-y-6">
                            {/* Category */}
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Category</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border rounded-md p-2 w-full" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />
                            
                            {/* Location */}
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Location</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border rounded-md p-2 w-full" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />
                            
                            {/* Skills */}
                            <FormField
                                control={form.control}
                                name="skills"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Skills</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border rounded-md p-2 w-full" placeholder="Comma separated" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />
                            
                            {/* Language */}
                            <FormField
                                control={form.control}
                                name="language"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Languages</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border rounded-md p-2 w-full" placeholder="Comma separated" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />
                            
                            {/* Rate */}
                            <FormField
                                control={form.control}
                                name="rate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Rate</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border rounded-md p-2 w-full" placeholder="Comma separated" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />
                            
                            {/* Addresses */}
                            <FormField
                                control={form.control}
                                name="addresses"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Addresses</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border rounded-md p-2 w-full" placeholder="Comma separated" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />
                            
                            {/* Received Reviews */}
                            <FormField
                                control={form.control}
                                name="receivedReviews"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Received Reviews</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border rounded-md p-2 w-full" placeholder="Comma separated" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />
                            
                            {/* Given Reviews */}
                            <FormField
                                control={form.control}
                                name="givenReviews"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Given Reviews</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border rounded-md p-2 w-full" placeholder="Comma separated" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />
                            
                            {/* Red Flags */}
                            <FormField
                                control={form.control}
                                name="redFlags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Red Flags</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border rounded-md p-2 w-full" placeholder="Comma separated" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />
                            
                            {/* KPI */}
                            <FormField
                                control={form.control}
                                name="KPI"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">KPI</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border rounded-md p-2 w-full" placeholder="Comma separated" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />
                            
                            {/* Violations */}
                            <FormField
                                control={form.control}
                                name="violations"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Violations</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border rounded-md p-2 w-full" placeholder="Comma separated" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />
                            
                            {/* Breaches */}
                            <FormField
                                control={form.control}
                                name="breaches"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Breaches</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border rounded-md p-2 w-full" placeholder="Comma separated" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    {activeTab === 'emergency' && (
                        <div className="space-y-6">
                            {/* Emergency Contact Name */}
                            <FormField
                                control={form.control}
                                name="emergencyContact.name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Emergency Contact Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border rounded-md p-2 w-full" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />
                            
                            {/* Emergency Contact Relationship */}
                            <FormField
                                control={form.control}
                                name="emergencyContact.relationship"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Emergency Contact Relationship</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border rounded-md p-2 w-full" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />
                            
                            {/* Emergency Contact Phone Number */}
                            <FormField
                                control={form.control}
                                name="emergencyContact.phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Emergency Contact Phone Number</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border rounded-md p-2 w-full" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />
                            
                            {/* Emergency Number */}
                            <FormField
                                control={form.control}
                                name="emergencyNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Emergency Number</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="border rounded-md p-2 w-full" />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    <Button type="submit" className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md">Submit</Button>
                </form>
            </Form>
        </div>
    );
}
