import { connectToDB } from '../../../../utils/dbConnection';
import SubCategory from '../../../../models/SubCategorySchema'
import { NextResponse } from 'next/server';
import  generateSlug  from '../../../../utils/slugGenerator';
import Category from '../../../../models/CategorySchema';

//POST SUB CATEGORY
export async function POST(request,{params}){
    console.log('Received request at /api/category/[slug]')
    console.log('Request method' ,request.method);

    try {
        const   { slug } = params;
        const   {name,subCategorySlug} = await request.json();
        //const   slugSubCateogy = generateSlug(name);
        //connect to db
        await   connectToDB();


        //create subcategory under the parent category
        const   newSubCategory = new SubCategory({name , subCategorySlug})
        const   savedSubCategory = await newSubCategory.save()

        // Find the corresponding category and push the subcategory ID into subcategories array
        const category = await Category.findOne({slug});
        if (!category) {
            throw new Error('Category not found');
        }
        category.subcategories = category.subcategories || [];

        category.subcategories.push(savedSubCategory._id);
        await category.save();
       

         //await   SubCategory.create({_id :id },{name , subCategorySlug} , {new : true})
        
        //await   SubCategory.create({name,slugSubCateogy})
        return  NextResponse.json({message:'Sub Category Created'} , {status:201})

    } catch (error) {
        console.error('Error :' , error)
        return NextResponse.json({message : 'Faild to Create SubCategory'} , {status:500})
    }
}

export async function GET(request,{params}){
    console.log('Received request at /api/category/[slug]')
    console.log('Request method' ,request.method);
    try {
        const   {slug} = params;
        await   connectToDB();
        const   category = await Category.findOne({slug}).populate({path : 'subcategories'})
        if(!category){
            throw new Error('Category not Found')
        }

        //const   subCategory = await SubCategory.find({slug}).populate('CategorySlug');
        return  NextResponse.json({subcategories : category.subcategories} , {status:200})
    } catch (error) {
        console.error(error);
        return  NextResponse.json({message : "Faild to Get sub Category by slug"} , {status:500});
    }
}


