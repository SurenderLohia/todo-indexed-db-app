import { Dexie, type EntityTable } from "dexie";

interface TodoItemTypes  {
  id?: number,
  text: string,
  isCompleted: number,
}

const db = new Dexie("TodoDatabase") as Dexie & {
  todos: EntityTable<TodoItemTypes, "id">
}

// Schema declaration:
db.version(2).stores({
  todos: "++id, isCompleted"
});

export type { TodoItemTypes }
export { db }