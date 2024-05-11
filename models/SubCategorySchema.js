import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
    name : {type :String    , require : true},
    slug :  {type :String   , require : true}
})

const SubCategory =    mongoose.models.SubCategory || mongoose.model('Category' , SubCategorySchema)

export default SubCategory;