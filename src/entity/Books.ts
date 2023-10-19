import { Entity, PrimaryGeneratedColumn, Column ,ManyToOne } from "typeorm"
import {Author}  from "./Authors";
import { Category } from "./Categories";


@Entity("books")
export class Books{

    @PrimaryGeneratedColumn('uuid')
    id:number

    @Column()
    title:string;

    @Column()
    description:string


    @ManyToOne(() => Author, (author)=>author.books)
    author: Author; 


    @ManyToOne(() => Category, (category)=>category.books)
    category: Category; 

    @Column("decimal", { precision: 10, scale: 2 })
    price: number;


}