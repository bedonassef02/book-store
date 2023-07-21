import mongoose from "mongoose";

const SubcategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        lowercase: true
    }
}, {timestamps: true});

const SubCategory = mongoose.model('SubCategory', SubcategorySchema);

export {SubCategory};