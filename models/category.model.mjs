import mongoose from "mongoose";
import slugify from "slugify";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    slug: {
        type: String,
        lowercase: true,
    }
}, {timestamps: true});

CategorySchema.pre('save', async function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, {lower: true});
    }
    next();
});


const Category = mongoose.model('Category', CategorySchema);

export {Category};