import {CategoryService} from "../services/category.service.mjs";

class CategoryController {

    constructor() {
        this.categoryService = new CategoryService();
    }

    async findAll(request, response) {
        const categories = await this.categoryService.findAll(request.query);
        response.status(200).json(categories)
    }

    async findOne(request, response) {
        const {id} = request.params;
        const category = await this.categoryService.findOne(id);
        if (category) {
            response.status(200).json(category);
        } else {
            response.status(404).json(`book not found with id ${id}`);
        }
    }

    async create(request, response) {
        const {name} = request.body;
        const category = await this.categoryService.create({name});
        response.status(201).json(category);
    }

    async update(request, response) {
        const {id} = request.params;
        const category = await this.categoryService.update(id, request.body);
        if (category) {
            response.status(200).json(category);
        } else {
            response.status(404).json(`book not found with id ${id}`);
        }
    }

    async delete(request, response) {
        const {id} = request.params;
        const category = await this.categoryService.delete(id);
        if (category) {
            response.status(200).json({message: 'category deleted successfully'});
        } else {
            response.status(404).json(`book not found with id ${id}`);
        }
    }
}

export {CategoryController};