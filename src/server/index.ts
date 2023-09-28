// import { db } from './db';
import { publicProcedure, router } from './trpc';
 
export const appRouter = router({
  getTodos: publicProcedure
    .query(async () => {
      // Retrieve users from a datasource, this is an imaginary database
      // const users = await db.user.findMany();
      // return users;
      return [1,2,3]
    }),
});

export type AppRouter = typeof appRouter;