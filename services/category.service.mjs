import {Category} from "../models/category.model.mjs";
import {ApiFeatures} from "../utils/api.features.mjs";

class CategoryService {

    constructor() {
        this.apiFeatures = null;
    }

    async findAll(query) {
        const count = await Category.countDocuments();
        this.apiFeatures = new ApiFeatures(Category.find(), query).paginate(count).fields();
        const {mongooseQuery, paginationDetails} = this.apiFeatures;
        const categories = await mongooseQuery
        return {...paginationDetails, categories};
    }

    async findOne(id) {
        return Category.findById(id);
    }

    async create(category) {
        return await Category.create(category);
    }

    async update(id, category) {
        return Category.findOneAndUpdate(id, category, {new: true});
    }

    async delete(id) {
        await Category.findOneAndDelete(id);
    }
}

export {CategoryService};