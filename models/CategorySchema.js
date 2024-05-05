import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
    name : {type :String , required : true}
})


const CategorySchema = new mongoose.Schema({
    name : {type:String , required : true},
    subcategories : [SubCategorySchema],

})

const Category = mongoose.model('Category' , CategorySchema)

export default Category;