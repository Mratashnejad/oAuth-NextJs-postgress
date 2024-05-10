import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
    name : {type :String , require : true},
    slug :  {type :String }
})


const CategorySchema = new mongoose.Schema({
    name : {type:String , require : true},
    slug : {type :String},
    subcategories : [SubCategorySchema],

})

const Category =    mongoose.model.Category|| mongoose.model('Category' , CategorySchema)

export default Category;