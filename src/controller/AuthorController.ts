import { AppDataSource } from "../data-source";
import { Author } from "../entity/Authors";
import { Request, Response } from 'express';


export class AuthorController{

    private authorRepository=AppDataSource.getRepository(Author);

    async createAuthor(request:Request,response:Response){
        const newAuthor = this.authorRepository.create({...request.body});
        await  this.authorRepository.save(newAuthor) ;
        response.status(201).send(`New author with id  created`);
    }
}