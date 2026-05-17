import { Dexie, type EntityTable } from "dexie";

interface TodoItemTypes  {
  id: number,
  text: string,
  isCompleted: boolean,
}

const db = new Dexie("TodoDatabase") as Dexie & {
  todos: EntityTable<TodoItemTypes, "id">
}

// Schema declaration:
db.version(1).stores({
  todos: "++id, text, isCompleted"
});

export type { TodoItemTypes }
export { db }