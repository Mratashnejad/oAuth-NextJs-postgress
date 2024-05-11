import { connectToDB } from '../../../../utils/dbConnection';
import SubCategory from '@/models/SubCategorySchema';
import { NextResponse } from 'next/server';
import  generateSlug  from '../../../../utils/slugGenerator';
import Category from '../../../../models/CategorySchema';

//POST SUB CATEGORY
export async function POST(request,{params}){
    console.log('Received request at /api/category/[slug]')
    console.log('Request method' ,request.method);

    try {
        const   { slug } = params;
        const   { name } = await request.json();
        const   slugSubCateogy = generateSlug(name);
        //connect to db
        await   connectToDB();

        //Find the parent categoty by slug
        const parentCategory = await Category.findOne({slug : slug});

        if(!parentCategory){
            return NextResponse.json({message : 'Parent Category Not Founded'} , {status:404})
        }


        //check if subcategory is exists with the same name :
        const existingSubCategory = await SubCategory.findOne({name, slug:slugSubCateogy});
        if(existingSubCategory){
            return NextResponse.json({message: 'Subcategory already exists'} , {status:400})

        }


        //create subcategory under the parent category
        await SubCategory.create({name , slug:slugSubCateogy})
        
        //await   SubCategory.create({name,slugSubCateogy})
        return  NextResponse.json({message:'Sub Category Created'} , {status:201})

    } catch (error) {
        console.error('Error :' , error)
        return NextResponse.json({message : 'Faild to Create SubCategory'} , {status:500})
    }
}


