"use client"

import React, { useState, useEffect }  from "react"
import { v4 as uuidv4 } from 'uuid';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { TodoItem, TodoItemData, TodoItemProps } from "@/components/TodoItem";

function TodoList() {
  const [todos, setTodos] = useState<TodoItemData[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = (e: any) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    const newTodoItem: TodoItemData = {
      id: uuidv4(),
      text: newTodo,
      isCompleted: false,
      mode: 'view',
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo("");
  }

  const onAddTodoChange = (e: any) => {
    setNewTodo(e.target.value);
  }

  const toggleTodoItemComplete = (id: string) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    }));
  }

  const openTodoItemEditMode = (id: string) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, mode: 'edit' };
      }
      return todo;
    }));
  }

  const closeTodoItemEditMode = (id: string) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, mode: 'view' };
      }
      return todo;
    }));
  }

  const updateTodoItemText = (id: string, newText: string) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: newText, mode: 'view' };
      }
      return todo;
    }));
  }

  const deleteTodoItem = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  }

  const allCount = todos.length;
  const pendingCount = todos.filter(todo => !todo.isCompleted).length;
  const completedCount = todos.filter(todo => todo.isCompleted).length;

  return (
    <div className="flex flex-col w-full gap-4">
      <form className="flex gap-1 w-full" onSubmit={handleAddTodo}>
        <Input type="text" id="add-task" placeholder="Add todo item" value={newTodo} onChange={onAddTodoChange} />
        <Button type="submit" variant="secondary">Add</Button>
      </form>
      <div className="flex gap-3">
        <Button size="sm" variant="outline">All({allCount})</Button>
        <Button size="sm" variant="outline">Pending({pendingCount})</Button>
        <Button size="sm" variant="outline">Completed({completedCount})</Button>
      </div>
      <div className="flex flex-col gap-1">
        {todos.map((todo) => (
          <TodoItem 
            key={todo.id} 
            id={todo.id} 
            text={todo.text}
            isCompleted={todo.isCompleted}
            toggleTodoItemComplete={toggleTodoItemComplete}
            mode={todo.mode}
            openTodoItemEditMode={openTodoItemEditMode}
            updateTodoItemText={updateTodoItemText}
            closeTodoItemEditMode={closeTodoItemEditMode}
            deleteTodoItem={deleteTodoItem}
          />
        ))}
      </div>
    </div>
  );
}

export { TodoList };