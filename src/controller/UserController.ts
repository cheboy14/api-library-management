import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import * as jwt from "jsonwebtoken"
import * as cookie from "cookie"


var bcrypt = require("bcrypt");


export class UserController {

    private userRepository = AppDataSource.getRepository(User)



    async login(request: Request, response: Response, next: NextFunction) {
        const { email, password } = request.body

        const user = await this.userRepository.findOne({ where: { email } })

        if (!user) {
            return response.json({ message: 'Authentication failed. User not found.' });
        }

        var passwordIsVavlid = bcrypt.compareSync(
            password,
            user.password
        );


        if (!passwordIsVavlid) {
            return response.json({ message: 'Authentication failed. Incorrect Username and password.' });
        }

        const token = jwt.sign({ userId: user.id, username: user.fullName }, 'your-secret-key', {
            expiresIn: '1h',
        });


        const sessionCookie = cookie.serialize('session', token, {
            httpOnly: true,
            maxAge: 3600,
            sameSite: 'strict',
            secure: true,
            path: '/',
            domain: 'localhost:8080',
        });

        response.setHeader('Set-Cookie', [sessionCookie]);

        response.status(200).json({ message: 'Authentication successful', token: token });

    }

    async getAllUsers(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async singleUser(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id


        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return response.json({ message: "unregistered user" });
        }
        return user
    }

    async registerUser(request: Request, response: Response, next: NextFunction) {
        const { fullName, email, password } = request.body;

        const hashPassword = bcrypt.hashSync(password, 8)

        const user = Object.assign(new User(), {
            fullName, email, password: hashPassword
        })

        return this.userRepository.save(user)
    }


    async updateUser(request: Request, response: Response, next: NextFunction) {

        const id = await request.params.id

        let userToEdit = await this.userRepository.findOneBy({ id })

        if (!userToEdit) {
            return response.json({ message: "this user not exist" });
        }

        const { fullName, email, password } = request.body;
        userToEdit.fullName = fullName
        userToEdit.email = email
        userToEdit.password = password
        return this.userRepository.save(userToEdit);


    }

    async deleteUser(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return response.json({ message: "this user not exist" });
        }

        await this.userRepository.remove(userToRemove)

        return response.json({ message: "user has been removed" });
    }

}