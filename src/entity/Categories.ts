import { PrimaryGeneratedColumn, Column, OneToMany, Unique, Entity } from 'typeorm';
import { Books } from "./Books";


@Unique(['name'])
@Entity("category")
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string;


    @Column()
    name: string;

    @OneToMany(() => Books, (book) => book.category) 
    books: Books[];

    
}
