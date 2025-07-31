export interface Task {
  id: string;
  columnId: string;
  content: string;
  order: number;
}

export interface Column {
  id: string;
  boardId: string;
  title: string;
  order: number;
  tasks: Task[];
}

export interface Board {
  id: string;
  title: string;
  columns: Column[];
}