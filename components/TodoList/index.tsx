"use client"

import React, { useState, useEffect }  from "react"
import { v4 as uuidv4 } from 'uuid';
import { useLiveQuery } from 'dexie-react-hooks';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { TodoItem, TodoItemData } from "@/components/TodoItem";
import { db, TodoItemTypes } from "@/db";

interface AddTodoToDB {
  text: string,
  isCompleted: boolean,
}

function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const [editItemId, setEditItemId] = useState<number>(0);
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
    if (newTodo.trim() === "") return;

    // const newTodoItem: TodoItemData = {
    //   id: uuidv4(),
    //   text: newTodo,
    //   isCompleted: false,
    //   mode: 'view',
    // };

    const todoItem = {
      text: newTodo,
      isCompleted: false,
    }

    addTodoToDB(todoItem);

    //setTodos([...todos, newTodoItem]);
    setNewTodo("");
  }

  const onAddTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  }

  const toggleTodoItemComplete = (id: number) => {
    db.todos.update(id, (todo) => { 
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    });
  }

  const openTodoItemEditMode = (id: number) => {
    setEditItemId(id);
  }

  const closeTodoItemEditMode = () => {
    setEditItemId(0);
  }

  const updateTodoItemText = (id: number, newText: string) => {
    db.todos.update(id, (todo) => {
      if (todo) {
        todo.text = newText;
      }
    });
     setEditItemId(0);
  }

  const deleteTodoItem = (id: number) => {
    db.todos.delete(id);
  }

  // const allCount = todos.length;
  // const pendingCount = todos.filter(todo => !todo.isCompleted).length;
  // const completedCount = todos.filter(todo => todo.isCompleted).length;

  // const filteredTodos = todos.filter(todo => {
  //   if (selectedFilter === "pending") {
  //     return !todo.isCompleted;
  //   } else if (selectedFilter === "completed") {
  //     return todo.isCompleted;
  //   }
  //   return true;
  // });

  if (!isMounted) return null;
  
  return (
    <div className="flex flex-col w-full gap-4">
      <form className="flex gap-1 w-full" onSubmit={handleAddTodo}>
        <Input type="text" id="add-task" placeholder="Add todo item" value={newTodo} onChange={onAddTodoChange} />
        <Button type="submit" variant="secondary">Add</Button>
      </form>
      {/* <div className="flex gap-3">
        <Button size="sm" variant={selectedFilter === "all" ? "default" : "outline"} onClick={() => setSelectedFilter("all")}>
          All({allCount})
        </Button>
        <Button size="sm" variant={selectedFilter === "pending" ? "default" : "outline"} onClick={() => setSelectedFilter("pending")}>
          Pending({pendingCount})
        </Button>
        <Button size="sm" variant={selectedFilter === "completed" ? "default" : "outline"} onClick={() => setSelectedFilter("completed")}>
          Completed({completedCount})
        </Button>
      </div> */}
      <div className="flex flex-col gap-1">
        {todos.map((todo) => (
          <TodoItem 
            key={todo.id} 
            id={todo.id} 
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