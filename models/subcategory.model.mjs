import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        lowercase: true
    },
    category_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Category',
    },
}, {timestamps: true});

const SubCategory = mongoose.model('SubCategory', SubCategorySchema);

export {SubCategory};