import mongoose from 'mongoose';

const SubCategorySchema = new mongoose.Schema({
    name:            { type: String, required: true },
    subCategorySlug: { type: String, required: true },
    categoryId :     { type: mongoose.Schema.Types.ObjectId , ref :'Category'}
    
});

const SubCategory = mongoose.models.SubCategory || mongoose.model('SubCategory', SubCategorySchema);

export default SubCategory;
