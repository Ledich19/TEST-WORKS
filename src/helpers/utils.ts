import { Category, Fields, FieldsPost, NewNotes, NotesPatch } from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isCategory = (param: any): param is Category => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Category).includes(param);
};
const parseName = (name: unknown): string => {
  if (!name|| !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};
const parseCategory = (category: unknown): Category => {
  if (!category|| !isCategory(category)) {
      throw new Error('Incorrect or missing category: ' + category);
  }
  return category;
};
const parseContent = (name: unknown): string => {
  if (!name|| !isString(name)) {
    throw new Error('Incorrect or missing content');
  }
  return name;
};

const toNewNotes = ({ content , name, category }: Fields): NewNotes => {
  const newNotes: NewNotes = {
    name: parseName(name),
    category: parseCategory(category),
    content: parseContent(content),
  };
  return newNotes;
};


export const toNewUpdateNotes = ({ content , name, category, isArchive}: FieldsPost): NotesPatch => {
  const newNotes: NotesPatch = {
  };
  if (name) {
    newNotes.name = parseName(name);
  }
  if (category) {
    newNotes.category = parseCategory(category);
  }
  if (content) {
    newNotes.content = parseContent(content);
  }
  if (typeof isArchive === 'boolean') {
    newNotes.isArchive = isArchive;
  }
  return newNotes;
};

export default toNewNotes ;