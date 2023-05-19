export enum Category {
  random = 'Random Thought',
  idea = 'Idea',
  task = 'Task'
}

export interface Notes {
  id: number;
  name: string;
  createAt: string;
  category: Category;
  content: string;
  isArchive: boolean;
}

export interface Stats {
  category: string;
  all: number;
  archive: number;
}
export type NewNotes = Omit<Notes, 'id' | 'createAt' | 'isArchive'>;

export interface Fields { content: unknown, name: unknown, category: unknown }
export interface FieldsPost extends Fields { isArchive: unknown }


export interface NotesPatch {
  name?: string;
  category?: Category;
  content?: string;
  isArchive?: boolean;
}