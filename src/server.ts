import app from './app'
import {  createTableCourses, createTableUserCourses, createTableUsers, startDatabase } from './database'

const PORT: number = parseInt(process.env.PORT!) || 3000

app.listen(PORT, async () => {
    await startDatabase()
    await createTableUsers();
    await createTableCourses();
    await createTableUserCourses();
    console.log(`App running on port ${PORT}`)
})
