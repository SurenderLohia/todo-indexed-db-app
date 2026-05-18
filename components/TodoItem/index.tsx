import React, { useState } from "react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"
import { EditIcon, TrashIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils";

interface TodoItemData  {
  text: string,
  isCompleted: number,
  id: number,
  mode: 'view' | 'edit',
}
interface TodoItemProps extends TodoItemData {
  toggleTodoItemComplete: (id: number) => void,
  openTodoItemEditMode: (id: number) => void,
  closeTodoItemEditMode: (id: number) => void,
  updateTodoItemText: (id: number, newText: string) => void,
  deleteTodoItem: (id: number) => void,
}

function TodoItem(props: TodoItemProps) {
  const {id, text, isCompleted, toggleTodoItemComplete, openTodoItemEditMode, closeTodoItemEditMode, updateTodoItemText, deleteTodoItem, mode = 'view'} = props;

  const [todoItemText, setTodoItemText] = useState(text);

  const onTodoItemTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoItemText(e.target.value);
  }

  const handleCloseEditMode = (id: number) => {
    closeTodoItemEditMode(id);
    setTodoItemText(text);
  }

  const handleEditSave = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedText = todoItemText.trim();
    if (!trimmedText) return;
    updateTodoItemText(id, trimmedText);
  }

  return (
    <div>
      {mode === 'view' && (
        <div className="flex gap-2 w-full items-center border-b px-2 py-1">
          <Checkbox
            id={`checkbox-${id}`}
            checked={isCompleted === 1} 
            onCheckedChange={() => toggleTodoItemComplete(id)}
          />
          <div className="flex-1">
            <label
              className={cn("cursor-pointer", isCompleted === 1 && "line-through")}
              htmlFor={`checkbox-${id}`}>{text}
            </label>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => openTodoItemEditMode(id)}
          >
            <EditIcon className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => deleteTodoItem(id)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
          </div>
        )
      }
      {mode === 'edit' && (
        <form 
          className="flex gap-2 w-full items-center border-b px-2 py-1"
          onSubmit={handleEditSave}
        >
          <Input
            type="text"
            value={todoItemText}
            className="flex-1"
            onChange={onTodoItemTextChange}
            autoFocus
          />
          <Button variant="ghost" type="submit">
            Save
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCloseEditMode(id)} type="button">
            <XIcon className="h-4 w-4" />
          </Button>
        </form>
      )}
    </div>
  );
}

export { TodoItem, type TodoItemData, type TodoItemProps };