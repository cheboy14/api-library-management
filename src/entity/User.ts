import { Entity, PrimaryGeneratedColumn, Column,Unique } from "typeorm"

@Entity("user")
@Unique(['email'])
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    fullName: string

    @Column()
    email:string;


    @Column()
    password:string;  

}
