import React, { useState } from "react"
import clsx from 'clsx';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"
import { EditIcon, TrashIcon, XIcon } from "lucide-react"

interface TodoItemData  {
  text: string,
  isCompleted: boolean,
  id: string,
  mode?: 'view' | 'edit',
}
interface TodoItemProps extends TodoItemData {
  toggleTodoItemComplete: (id: string) => void,
  openTodoItemEditMode: (id: string) => void,
  closeTodoItemEditMode: (id: string) => void,
  updateTodoItemText: (id: string, newText: string) => void,
  deleteTodoItem: (id: string) => void,
}

function TodoItem(props: TodoItemProps) {
  const {id, text, isCompleted, toggleTodoItemComplete, openTodoItemEditMode, closeTodoItemEditMode, updateTodoItemText, deleteTodoItem, mode = 'view'} = props;

  const [todoItemText, setTodoItemText] = useState(text);

  const onTodoItemTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoItemText(e.target.value);
  }

  return (
    <div className="flex gap-2 w-full items-center border-b px-2 py-1">
      {mode === 'view' && (
        <>
          <Checkbox
            id={`checkbox-${id}`} 
            checked={isCompleted} 
            onCheckedChange={() => toggleTodoItemComplete(id)}
          />
          <div className="flex-1">
            <label className={clsx("cursor-pointer", isCompleted && "line-through")} htmlFor={`checkbox-${id}`}>{text}</label>
          </div>
          <Button variant="ghost" onClick={() => openTodoItemEditMode(id)}>
            <EditIcon />
          </Button>
          <Button variant="ghost" onClick={() => deleteTodoItem(id)}>
            <TrashIcon />
          </Button>
          </>
        )
      }
      {mode === 'edit' && (
        <>
          <Input type="text" value={todoItemText} className="flex-1" onChange={onTodoItemTextChange} />
          <Button variant="ghost" onClick={() => updateTodoItemText(id, todoItemText)}>
            Save
          </Button>
          <Button variant="ghost" onClick={() => closeTodoItemEditMode(id)}>
            <XIcon />
          </Button>
        </>
      )}
    </div>
  );
}

export { TodoItem, type TodoItemData, type TodoItemProps };