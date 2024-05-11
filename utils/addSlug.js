// utils/addSlug.js
import mongoose from "mongoose";
import Category from "../models/CategorySchema.js";
import generateSlug from "./slugGenerator.js";
import { connectToDB } from "./dbConnection.js";

async function addSlug(){
    try {
        await connectToDB();
        const categories = await Category.find();

        for (const category of categories){
            const slug = generateSlug(category.name);

            // Update each category with the generated slug
            await Category.findByIdAndUpdate(category._id, { slug });
        }
        console.log('Slugs added to categories successfully!');
    } catch(error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

addSlug();
