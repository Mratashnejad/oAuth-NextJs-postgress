import { connectToDB}   from '../../../utils/dbConnection';
import Category from '../../../models/CategorySchema';
import SubCategory from '@/models/SubCategorySchema';
import { NextResponse } from 'next/server';
import  generateSlug  from '../../../utils/slugGenerator';


//POST CATEGORY
export  async function POST(request){
    console.log('Received request at /api/category/');
    console.log('Request method:', request.method);

    
    try {
        const {name,subcategories } = await request.json();
        const slug = generateSlug(name);
        //connect to database.
        await   connectToDB();

            //check if subcategory is exists with the same name :
        const existingCategory = await Category.findOne({name, slug:slug});
            if(existingCategory){
                return NextResponse.json({message: 'Subcategory already exists'} , {status:400})
    
            }
        await   Category.create({name,slug,subcategories})
        return  NextResponse.json({message:'Category Created'}, {status:201})

    } catch (error) {
        console.error('Error:', error);
        return  NextResponse.json({messeage : 'Faild to Create Category '},{status:500});
    }
}
//GET CATEGORIES
export async function GET (request){
    console.log('Received request at /api/category/');
    console.log('Request method:', request.method);
    try {
        await   connectToDB();
        const   Categoreis = await Category.find();
        return  NextResponse.json({Categoreis} , {status:201})
        
    } catch (error) {
        console.error('Error : ' , error);
        return  NextResponse.json({message : 'Faild to get the category'} , {status:500})
    }
}
//DELETE CATEGORIY
export async function DELETE (request){
    console.log('Received request at /api/category/');
    console.log('Request method:', request.method);
    try {
        const   id = request.nextURL.searchParams.get('id');
        await   connectToDB();
        await   Category.findByIdAndDelete(id);
        return  NextResponse.json({message : 'Category has been deleted Successfuly'} , {status:201})
        
    } catch (error) {
        console.error('Error' , error)
        return  NextResponse.json({message : 'Faild to delete category'} , {status:500})
  }
}
