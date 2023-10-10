import { z } from 'zod';

const usersSchema = z.object({
    name: z.string().max(50),
    email: z.string().email().max(50),
    password: z.string().max(120),
    admin: z.boolean().optional().nullish().default(false),
})
const loginSchema = z.object({
    email: z.string().email().max(50),
    password: z.string().max(120),
})

const usersCreateSchema = usersSchema.omit({ name: true })
const usersReturnSchema = usersSchema.omit({ admin: true })
const usersRetunrManySchema = usersReturnSchema.array()

export { usersSchema, usersCreateSchema, usersReturnSchema, usersRetunrManySchema, loginSchema }