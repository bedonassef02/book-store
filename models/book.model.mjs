import mongoose from "mongoose";
import slugify from "slugify";

const BookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, 'Too short book name'],
        maxLength: [100, 'Too long book name'],
        unique: true,
    },
    slug: {
        type: String,
        // required: true,
        lowercase: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        minLength: [20, 'Too short description'],
    },
    price: {
        type: Number,
        required: true,
        min: [50, 'price must be between 50 and 10000'],
        max: [10000, 'price is too much expensive'],
    },
    price_after_discount: {
        type: Number,
    },
    authors: {
        type: [String],
        required: true,
    },
    pageCount: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true,
    },
    category_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Category',
    },
    subcategories_id: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Subcategory',
    }
}, {timestamps: true});

// Pre-save middleware to update the slug whenever the name is changed
BookSchema.pre('save', async function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, {lower: true});
    }
    next();
});

const Book = mongoose.model('Book', BookSchema);

export {Book};
