"use client"

import React from 'react'
import { trpc } from '../_trpc/client'
import { serverClient } from '../_trpc/serverClient';

function TodoList({
  initialTodos
}: {
  initialTodos: Awaited<ReturnType<(typeof serverClient)["getTodos"]>>
}) {
  const getTodos = trpc.getTodos.useQuery(undefined, {
    initialData: initialTodos,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => {
      getTodos.refetch()
    }
  });
  const deleteTodo = trpc.deleteTodo.useMutation({
    onSettled: () => {
      getTodos.refetch()
    }
  });
  const toggleTodo = trpc.toggleTodo.useMutation();

  const [content, setContent] = React.useState('')

  return (
    <div>
      <input
        type="text"
        className='border-2 border-gray-200 text-black' 
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className='border-2 border-gray-200 bg-black'
        onClick={async () => {
          if(!content) return
          addTodo.mutate(content)
          setContent('')
        }}
      >
        Add Todo
      </button>
      <div className='flex flex-col-reverse gap-2 mt-10'>
        {getTodos.data?.map((todo) => (
          <div key={todo.id} className='flex justify-between p-5 bg-gray-800 min-w-[700px]'>
            <div>{todo.title}</div>
            <input
              id={`${todo.id}`}
              type="checkbox"
              checked={todo.completed}
              onChange={(e: any) => {
                toggleTodo.mutate(todo.id);
              }}
            />
            <button onClick={async () => deleteTodo.mutate(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default TodoList