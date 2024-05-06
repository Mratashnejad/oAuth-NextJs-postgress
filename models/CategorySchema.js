import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
    name : {type :String , require : true}
})


const CategorySchema = new mongoose.Schema({
    name : {type:String , require : true},
    subcategories : [SubCategorySchema],

})

const Category = mongoose.model('Category' , CategorySchema)

export default Category;