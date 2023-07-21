import {SubCategoryService} from "../services/subCategory.service.mjs";

class SubCategoryController {

    constructor() {
        this.subCategoryService = new SubCategoryService();
    }

    async findAll(request, response) {
        const categories = await this.subCategoryService.findAll(request.query);
        response.status(200).json(categories)
    }

    async findOne(request, response) {
        const {id} = request.params;
        const subCategory = await this.subCategoryService.findOne(id);
        if (subCategory) {
            response.status(200).json(subCategory);
        } else {
            response.status(404).json(`book not found with id ${id}`);
        }
    }

    async create(request, response) {
        const {name, category_id} = request.body;
        const subCategory = await this.subCategoryService.create({name, category_id});
        response.status(201).json(subCategory);
    }

    async update(request, response) {
        const {id} = request.params;
        const subCategory = await this.subCategoryService.update(id, request.body);
        if (subCategory) {
            response.status(200).json(subCategory);
        } else {
            response.status(404).json(`book not found with id ${id}`);
        }
    }

    async delete(request, response) {
        const {id} = request.params;
        const subCategory = await this.subCategoryService.delete(id);
        if (subCategory) {
            response.status(200).json({message: 'subCategory deleted successfully'});
        } else {
            response.status(404).json(`book not found with id ${id}`);
        }
    }
}

export {SubCategoryController};