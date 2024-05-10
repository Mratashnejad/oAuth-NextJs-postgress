import { connectToDB}   from '../../../utils/dbConnection';
import Category from '../../../models/CategorySchema';
import { NextResponse } from 'next/server';
import  generateSlug  from '../../../utils/slugGenerator';



//POST SUB CATEGORY
