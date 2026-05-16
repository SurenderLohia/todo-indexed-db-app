import * as React from "react"

import { EditIcon, TrashIcon } from "lucide-react"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { TodoItem, TodoItemProps } from "@/components/TodoItem";

function TodoList() {
  
  return (
    <>
    <form className="flex gap-1 w-full my-4">
      <Input type="text" id="add-task" placeholder="Add todo item" />
      <Button type="submit" variant="secondary">Add</Button>
    </form>
    <TodoItem id="1" text="Item 1" isCompleted={true} />
    </>
  );
}

export { TodoList };