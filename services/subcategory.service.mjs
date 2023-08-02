import {SubCategory} from "../models/subcategory.model.mjs";
import {ApiFeatures} from "../utils/api.features.mjs";

class SubCategoryService {

    constructor() {
        this.apiFeatures = null;
    }

    async findAll(query) {
        const count = await SubCategory.countDocuments();
        this.apiFeatures = new ApiFeatures(SubCategory.find(), query).paginate(count).fields();
        const {mongooseQuery, paginationDetails} = this.apiFeatures;
        const subcategories = await mongooseQuery
        return {...paginationDetails, subcategories};
    }

    async findOne(id) {
        return SubCategory.findById(id);
    }

    async create(subSubCategory) {
        return SubCategory.create(subSubCategory);
    }

    async update(id, subSubCategory) {
        return SubCategory.findOneAndUpdate(id, subSubCategory, {new: true});
    }

    async delete(id) {
        return SubCategory.findOneAndDelete(id);
    }
}

export {SubCategoryService};