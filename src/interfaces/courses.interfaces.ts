// interfaces

import { QueryResult } from "pg"

type ICourses = {
    name: string,
    description: string
}



type ICoursesvResult = QueryResult<ICourses>
type ICoursesCreate = Omit<ICourses, 'id'>
type ICoursesUpdate = Partial<ICoursesCreate>

export { ICourses, ICoursesCreate, ICoursesvResult, ICoursesUpdate }

