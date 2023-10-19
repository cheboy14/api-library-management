import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Books } from "./Books";

@Entity("authors")
export class Author {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    biography: string;


    @OneToMany(() => Books, (book) => book.author) 
    books: Books[];
}
