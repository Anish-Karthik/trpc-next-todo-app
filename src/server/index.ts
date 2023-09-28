import { trpc } from '@/app/_trpc/client';
import { publicProcedure, router } from './trpc';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
 
export const appRouter = router({
  getTodos: publicProcedure
    .query(async () => {
      const todos = await prisma.todo.findMany();
      return todos;
    }),
  addTodo: publicProcedure
    .input(z.string())
    .mutation(async (opts) => {
      const todo = await prisma.todo.create({
        data: {
          title: opts.input,
          completed: false
        }
      });
      return true;
    }),
  deleteTodo: publicProcedure
    .input(z.number())
    .mutation(async (opts) => {
      const todo = await prisma.todo.delete({
        where: {
          id: opts.input
        }
      });
      return true;
    }),
  toggleTodo: publicProcedure
    .input(z.number())
    .mutation(async (opts) => {
      const todo = await prisma.todo.findUnique({
        where: {
          id: opts.input
        }
      });
      if (!todo) {
        throw new Error('Todo not found');
      }
      await prisma.todo.update({
        where: {
          id: opts.input
        },
        data: {
          completed: !todo.completed
        }
      });
      return todo.completed;
    }),
});

export type AppRouter = typeof appRouter;