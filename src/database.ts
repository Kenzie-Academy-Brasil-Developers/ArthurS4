import { Client, ClientConfig } from 'pg'
import 'dotenv/config'

const databaseConfig = (): ClientConfig => {
    if (process.env.NODE_ENV === 'test') {
        return {
            user: process.env.DB_TEST_USER!,
            password: process.env.DB_TEST_PASSWORD!,
            database: process.env.DB_TEST!,
            host: process.env.DB_TEST_HOST!,
            port: Number(process.env.DB_TEST_PORT!),
        }
    }
    return {
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB!,
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT!),
    }
}
const client: Client = new Client(databaseConfig())

const startDatabase = async () => {
    await client.connect()
    console.log('Database connected.')
}

export { client, startDatabase }


export const createTableUsers = async () => {
    try {
        const query = `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(120) NOT NULL,
        admin BOOLEAN NOT NULL DEFAULT false
     );`
        await client.query(query);
        console.log('Table users created')
    } catch (error) {
        console.log(error)
    }
}


export const createTableCourses = async () => {

    try {
        const query = `
     CREATE TABLE IF NOT EXISTS courses(
     id SERIAL PRIMARY KEY,
     name VARCHAR(15) NOT NULL,
     description TEXT NOT NULL
  );`
        await client.query(query);
        console.log('Table courses created')
    } catch (error) {
        console.log(error)
    }
}


export const createTableUserCourses = async () => {

    try {
        const query = `
     CREATE TABLE IF NOT EXISTS "userCourses"(
     id SERIAL PRIMARY KEY,
     active BOOLEAN NOT NULL DEFAULT true,
     "userId" INTEGER NOT NULL ,
     "courseId" INTEGER NOT NULL ,
     
     FOREIGN KEY ("userId") REFERENCES users("id"),
     FOREIGN KEY ("courseId") REFERENCES courses("id")
  );`
        await client.query(query);
        console.log('Table "userCourses" created')
    } catch (error) {
        console.log(error)
    }
}


