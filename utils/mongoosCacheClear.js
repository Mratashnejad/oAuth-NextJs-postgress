import mongoose from "mongoose"

const clearModelsCache = ()=>{
    Object.keys(mongoose.models).forEach(modelName=>{
        delete mongoose.model[modelName];

    });
    mongoose.models = [];
    mongoose.modelSchema = {};

};

clearModelsCache()