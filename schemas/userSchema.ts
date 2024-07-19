// /schemas/userSchema.ts
import { z } from 'zod';

const UserSchema = z.object({
  uid: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  phoneNumber: z.string().min(10),
  name: z.string().optional(),
  family: z.string().optional(),
  avatar: z.string().url().optional(),
  bio: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  skills: z.array(z.string()).optional(),
  language: z.array(z.string()).optional(),
  rate: z.array(z.string()).optional(),
  addresses: z.array(z.string()).optional(),
  receivedReviews: z.array(z.string()).optional(),
  givenReviews: z.array(z.string()).optional(),
  redFlags: z.array(z.string()).default([]),
  KPI: z.array(z.string()).default([]),
  violations: z.array(z.string()).default([]),
  breaches: z.array(z.string()).default([]),
  emergencyContact: z.object({
    name: z.string().optional(),
    relationship: z.string().optional(),
    phoneNumber: z.string().optional(),
  }).optional(),
  emergencyNumber: z.string().optional(),
});

export default UserSchema;
