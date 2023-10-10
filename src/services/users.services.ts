// logica, de criar , deletar etc
import { ILogin, IUsers, IUsersCreate, IUsersResult, IUsersUpdate } from "../interfaces";
import { client } from "../database";
import format from "pg-format";
import { compareSync, hashSync } from "bcryptjs";
import "dotenv/config"
import { AppError } from "../errors/errors";
import { sign } from "jsonwebtoken";
import { QueryConfig } from "pg";


const createUsers = async (payload: IUsers): Promise<IUsersCreate> => {

    payload.password = hashSync(payload.password, 12)

    const query = format(`
    INSERT INTO users (%I)
    VALUES (%L)
    RETURNING *;` , Object.keys(payload), Object.values(payload))


    const data: IUsersResult = await client.query(query);
    const newData = data.rows.map(({ id, name, email, admin }) => ({ id, name, email, admin }))

    return newData[0]
}

const login = async (payload: ILogin) => {

    const { email, password } = payload
    const query = `SELECT * FROM users WHERE email = %L;`

    const queryFormat = format(query, email)

    const data: IUsersResult = await client.query(queryFormat);

    const user = data.rows[0];

    if (user == undefined) {
        throw new AppError("Wrong email/password", 401)
    }
    const passwordIsValid: boolean = compareSync(password, user.password)

    if (!passwordIsValid) {
        throw new AppError("Wrong email/password", 401)
    }

    const token = sign(
        {
            email: user.email,
            admin: user.admin
        },
        process.env.SECRET_KEY!,
        {
            subject: String(user.id),
            expiresIn: process.env.EXPIRES_IN!
        }

    );
    return { token }
}

const getAllUsers = async (payload: IUsersUpdate) => {

    const query = `SELECT * FROM users;`
    const data = await client.query(query);

    const newData = data.rows.map(({ id, name, email, admin }) => ({ id, name, email, admin }))

    return newData
}

const coursesIdUser = async (id: string) => {

    const query = `SELECT d."courseId" as "courseId", c.name as "courseName",  c.description as "courseDescription", d.active as "userActiveInCourse" , u.id as "userId", u.name as "userName"
    FROM "userCourses" d 
JOIN users u 
    ON  u.id = d."userId"
JOIN courses c
	ON c.id = d."courseId"
    WHERE u.id = $1;`

    const queryConfig: QueryConfig = {
        text: query,
        values: [id]
    }
    const data = await client.query(queryConfig);

    if (data.rows.length == 0) {
        throw new AppError("No course found", 404)
    }

    return data.rows

}








export default {  createUsers, login, getAllUsers, coursesIdUser }