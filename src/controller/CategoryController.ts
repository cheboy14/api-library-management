import { AppDataSource } from "../data-source";
import { Request, Response, NextFunction } from 'express';
import { Category } from "../entity/Categories";
import {loginAndAuthenticate} from '../middleware/auth';




export class CategoryController {

    private categoryRepository = AppDataSource.getRepository(Category)



    async getCategory(request: Request, response: Response, next: NextFunction) {
        return this.categoryRepository.find();

    }

    async getCategoryById(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        const category = await this.categoryRepository.findOne({ where: { id } });

        if (!category) {
            return response.json({ message: "Category with this id does not exist" });
        }
        return category;
    }

    async createCategory(request: Request, response: Response, next: NextFunction) {
        const { name } = request.body;
    
        // Check if a category with the same name already exists
        const existingCategory = await this.categoryRepository.findOne({ where: { name } });
    
        if (existingCategory) {
            return response.status(400).json({ message: "Category already exists" });
        }
    
        // Create a new category
        const newCategory = this.categoryRepository.create({ name });
    
        // Save the new category
        try {
            await this.categoryRepository.save(newCategory);
            return response.status(201).json({ message: "New Category Created", category: newCategory });
        } catch (error) {
            return response.status(500).json({ message: "Error creating the category" });
        }
    }
    

    async updateCategory(request: Request, response: Response, next: NextFunction) {

        const id = request.params.id;
        let category = await this.categoryRepository.findOne({ where: { id } })

        if (!category) {
            return response.json({ message: "cannot find the Category with this id" });
        }
        const { name } = request.body;
        category.name = name;
        return this.categoryRepository.save(category);

    }

    async deleteCategory(request: Request, response: Response, next: NextFunction) {

        const id = request.params.id;

        let category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            return response.json({ message: "cannot find the Category with this id" });
        }

        await this.categoryRepository.remove(category);
        return response.json({ message: "Category have been successfully delete" });


    }



}