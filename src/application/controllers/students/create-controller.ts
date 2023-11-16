import { StudentRepositoryImpl } from "../../../infrastructure/database/repository/students-repository";
import { CreateStudentUseCase } from "../../use-cases/Students/create-use-case";
import { Request, Response } from 'express';

export class CreateStudentController {
    private createStudentUseCase: CreateStudentUseCase;

    constructor() {
        const studentsRepository = new StudentRepositoryImpl();
        this.createStudentUseCase = new CreateStudentUseCase(studentsRepository);
    }

    async createStudent(req: Request, res: Response) {
        try {
            const {firstname,lastname,email,dob,gender,phone,levelId, studentId} = req.body;
            const newStudent = await this.createStudentUseCase.execute(firstname,lastname,email,dob,phone,gender,levelId,studentId);
            res.status(200).json(newStudent);  
        } catch (error) {
            res.status(500).json({ message: "Something went wrong",error });
        }
    }
}
