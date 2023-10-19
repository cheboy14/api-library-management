import { AppDataSource } from "../data-source";
import { Books } from "../entity/Books";
import { Request, Response, NextFunction } from 'express';


export class BooksController {

    private booksRepository = AppDataSource.getRepository(Books)

    async getallBooks(request: Request, response: Response, next: NextFunction) {
        return this.booksRepository.find();

    }


    async getOne(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const books = await this.booksRepository.findOne({
            where: {
                id
            }
        });

        if (!books) {
            return response.json({message:"Book with this id does not exist on our database"});
        }

        return books
    }

    async createBooks(request: Request, response: Response) {

        const { title , description,
            price, author, category} = request.body;
        const existingBooks = await this.booksRepository.findOneBy({ title });

        if (existingBooks) {
            return  response.json({message:"Book already exist in our Database"});
        }


        if (!author) {
          return response.status(404).json({error:"Author not found"});
        }

        if (!category) {
            return response.status(404).json({error:"Category not found"});
          }
        const newBook = this.booksRepository.create({
            title,
            description,
            price,
            author, 
            category
          });
        await this.booksRepository.save(newBook);
        response.json({message:`New Book with created`},);
    }


    async deleteBooks(request: Request, response: Response) {

        const id = parseInt(request.params.id);
        let userToRemove = await this.booksRepository.findOneBy({ id });

        if (!userToRemove) {
            return  response.json({message:"cannot find book with this id"});
        }
        await this.booksRepository.remove(userToRemove);
        return  response.json({message:"book have been successfully delete"});
    }


    async editBooks(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);
        let booksToEdit = await this.booksRepository.findOne({ where: { id } });
        if (!booksToEdit) {
            return response.json({message:"cannot find the book with this id"});
        }
        const { title, description, author,price } = request.body;
        booksToEdit.title = title;
        booksToEdit.description = description;
        booksToEdit.author = author
        booksToEdit.price=price
        return this.booksRepository.save(booksToEdit);

    }


}