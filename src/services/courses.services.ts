// logica, de criar , deletar etc
import { ICourses, ICoursesCreate} from "../interfaces";
import { client } from "../database";
import format from "pg-format";
import { QueryConfig } from "pg";



const createCourses = async (payload: ICoursesCreate) => {

  const query2 = format(`INSERT INTO courses (%I)
          VALUES (%L)
          RETURNING *;` , Object.keys(payload), Object.values(payload))
  const data = await client.query(query2);

  return data.rows[0]
}
const getAllCourses = async () => {

  const query = `SELECT * FROM courses;`
  const data = await client.query(query);

  return data.rows
}

const addMatricula = async (id: any, id2: any) => {

  const query = `INSERT INTO "userCourses" ( "courseId" , "userId" )
  VALUES ( $1 , $2  )
  RETURNING *;`

  const queryConfig: QueryConfig = {
    text: query,
    values: [id, id2]
  }
  const data = await client.query(queryConfig);

  return { message: "User successfully vinculed to course" }
}


const patchMatricula = async (id: any, id2: any) => {
  const query = `UPDATE "userCourses" SET active = false WHERE "courseId" = $1 AND "userId"= $2;`;

  const queryConfig: QueryConfig = {
    text: query,
    values: [id, id2]
  }
  const data = await client.query(queryConfig);

  return data.rows[0]
}

const idMatriculas = async (id: any) => {


  const query = `SELECT u.id as "userId", u.name as "userName", d."courseId" as "courseId", c.name as "courseName", c.description as "courseDescription", d.active as "userActiveInCourse"
  FROM "userCourses" d 
JOIN users u 
  ON  u.id = d."userId"
JOIN courses c
ON c.id = d."courseId"
  WHERE d."courseId" = $1;`

  const queryConfig: QueryConfig = {
    text: query,
    values: [id]
  }
  const data = await client.query(queryConfig);

  return data.rows
}




export default {  createCourses, getAllCourses, addMatricula, patchMatricula, idMatriculas }