import { Author } from "../../../domain/entities/author-entity";
import { AuthorRepository } from "../../../domain/repository/author-repository";
import { AuthorModel } from "../model/author-model";

export class AuthorRepositoryImpl implements AuthorRepository {
  async create(authorData: Partial<Author>): Promise<Author> {
    const createdAuthor = await AuthorModel.create(authorData);
    return createdAuthor.toJSON() as Author;
  }

  async findById(id: string): Promise<Author | null> {
    const author = await AuthorModel.findByPk(id);
    return author ? author.toJSON() as Author : null;
    
  }
  async update(author: Author): Promise<Author> {
    const existingAuthor = await AuthorModel.findByPk(author.id);
  
    if (!existingAuthor) {
      throw new Error('Author not found');
    }
  
    await existingAuthor.update(author);
  
    // Fetch the updated author again and return it
    const updatedAuthor = await AuthorModel.findByPk(author.id);
  
    if (!updatedAuthor) {
      throw new Error('Updated author not found');
    }
  
    return updatedAuthor as Author;
  }
  
  
  

  async delete(id: string): Promise<void> {
    const deletedRowsCount = await AuthorModel.destroy({
      where: { id },
    });

    if (!deletedRowsCount) {
      throw new Error('Author not found');
    }
  }

  async getAll(): Promise<Author[]> {
    const authors = await AuthorModel.findAll();
    return authors;
  }
  
}
