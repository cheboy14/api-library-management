import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("books")
export class Books{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string;

    @Column()
    description:string


    @Column()
    author: string;


}