export enum EStatusTodo {
  ACTIVE = "active",
  INACTIVE = "inActive",
}
export interface ITodo {
  id: number;
  todoText: string;
  status: EStatusTodo;
}
