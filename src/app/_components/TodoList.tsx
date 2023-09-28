"use client"

import React from 'react'
import { trpc } from '../_trpc/client'

function TodoList() {
  const getTodos = trpc.getTodos.useQuery();

  return (
    <div>
      <div>{JSON.stringify(getTodos.data)}</div>
    </div>
  )
}

export default TodoList