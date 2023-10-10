import { z } from 'zod';

const coursesSchema = z.object({
    name: z.string().max(15),
    description: z.string(),
})



export { coursesSchema }