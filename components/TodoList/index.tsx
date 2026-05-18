"use client"

import React, { useState, useEffect }  from "react"
import { useLiveQuery } from 'dexie-react-hooks';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { TodoItem } from "@/components/TodoItem";
import { db } from "@/db";

interface AddTodoToDB {
  text: string,
  isCompleted: number,
}

function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "pending" | "completed">("all");

  const todos = useLiveQuery(() => db.todos.toArray(), []) || [];
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const addTodoToDB = async (todo: AddTodoToDB) => {
    try {
      await db.todos.add({...todo})
    } catch (error) {
      console.error("Error adding todo item to DB:", error);
    }
  }

  const handleAddTodo = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanText = newTodo.trim();
    if (!cleanText) return;

    const todoItem = {
      text: cleanText,
      isCompleted: 0,
    }

    addTodoToDB(todoItem);
    setNewTodo("");
  }

  const onAddTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  }

  const toggleTodoItemComplete = async (id: number) => {
    const todo = await db.todos.get(id);
    if(!todo) return;
    db.todos.update(id, { isCompleted: todo.isCompleted === 1 ? 0 : 1 });
  }

  const openTodoItemEditMode = (id: number) => {
    setEditItemId(id);
  }

  const closeTodoItemEditMode = () => {
    setEditItemId(null);
  }

  const updateTodoItemText = (id: number, newText: string) => {
    db.todos.update(id, { text: newText });
    setEditItemId(null);
  }

  const deleteTodoItem = (id: number) => {
    db.todos.delete(id);
  }

  const pendingTodos = todos.filter((todo) => todo.isCompleted === 0);
  const completedTodos = todos.filter((todo) => todo.isCompleted === 1);

  if (!isMounted) return null;

  const displayedTodos = 
    selectedFilter === "pending" ? pendingTodos : 
    selectedFilter === "completed" ? completedTodos : 
    todos;
  
  return (
    <div className="flex flex-col w-full gap-4">
      <form className="flex gap-1 w-full" onSubmit={handleAddTodo}>
        <Input type="text" id="add-task" placeholder="Add todo item" value={newTodo} onChange={onAddTodoChange} />
        <Button type="submit" variant="secondary">Add</Button>
      </form>
      <div className="flex gap-3">
        <Button size="sm" variant={selectedFilter === "all" ? "default" : "outline"} onClick={() => setSelectedFilter("all")}>
          All({todos.length})
        </Button>
        <Button size="sm" variant={selectedFilter === "pending" ? "default" : "outline"} onClick={() => setSelectedFilter("pending")}>
          Pending({pendingTodos?.length || 0})
        </Button>
        <Button size="sm" variant={selectedFilter === "completed" ? "default" : "outline"} onClick={() => setSelectedFilter("completed")}>
          Completed({completedTodos?.length || 0})
        </Button>
      </div>
      <div className="flex flex-col gap-1">
        {displayedTodos.map((todo) => (
          <TodoItem 
            key={`${todo.id}-${editItemId === todo.id ? 'edit' : 'view'}`}
            id={todo.id as number} 
            text={todo.text}
            isCompleted={todo.isCompleted}
            toggleTodoItemComplete={toggleTodoItemComplete}
            mode={editItemId === todo.id ? 'edit' : 'view'}
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