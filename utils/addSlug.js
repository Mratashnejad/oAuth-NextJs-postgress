// utils/addSlug.js

const mongoose = require("mongoose");
const Category = require('../models/CategorySchema');
const generateSlug = require('./slugGenerator');
const { connectToDB } = require('./dbConnection');

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
