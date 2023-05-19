
import { NewNotes, Notes, NotesPatch, Stats } from '../types';
const data = [
  {
    "id": 1,
    "name": "Dianna Rose",
    "createAt": "2022-06-11T09:38:49",
    "category": "Random Thought",
    "content": "Consequat pariatur 2018-06-09 ullamco velit est deserunt 2020.01.17 reprehenderit sit irure magna.",
    "isArchive": true
  },

  {
    "id": 2,
    "name": "Catalina Horton",
    "createAt": "2015-07-27T10:52:10",
    "category": "Random Thought",
    "content": "Adipisicing adipisicing 2020-08-18 nisi ut et qui nostrud.",
    "isArchive": false
  },
  {
    "id": 3,
    "name": "Jimenez Solis",
    "createAt": "2018-09-18T08:44:24",
    "category": "Task",
    "content": "In 2019-10-04 Lorem consequat excepteur consequat sint nisi.",
    "isArchive": false
  },
  {
    "id": 4,
    "name": "Cole Davenport",
    "createAt": "2015-01-12T05:42:23",
    "category": "Idea",
    "content": "Proident Lorem 2017-04-07 in nulla nisi sunt veniam eiusmod fugiat enim 2017-12-23 sit.",
    "isArchive": false
  },
  {
    "id": 5,
    "name": "Petty House",
    "createAt": "2018-03-15T03:43:09",
    "category": "Idea",
    "content": "Lorem 2021-05-18 veniam tempor 2015-10-22 consequat dolor proident mollit 2018-11-11 culpa dolor eiusmod eiusmod magna.",
    "isArchive": false
  },
  {
    "id": 6,
    "name": "Winifred Holt",
    "createAt": "2014-04-10T03:54:01",
    "category": "Idea",
    "content": "Occaecat quis 2022-01-27 dolor do culpa 2022-07-24.",
    "isArchive": true
  },
  {
    "id": 7,
    "name": "Holloway Barrett",
    "createAt": "2022-05-16T03:56:04",
    "category": "Random Thought",
    "content": "Officia 2018-03-11 deserunt enim 2019-12-01 sit id quis laborum ipsum dolor aute irure.",
    "isArchive": false
  },
  {
    "id": 8,
    "name": "Cervantes Hardin",
    "createAt": "2014-02-07T10:14:14",
    "category": "Task",
    "content": "Cillum elit ullamco aliqua 2022-08-01 ad labore sit qui incididunt est.",
    "isArchive": true
  },
  {
    "id": 9,
    "name": "Vaughn Yates",
    "createAt": "2018-11-14T11:54:01",
    "category": "Task",
    "content": "Labore cupidatat 2022-08-10 tempor est qui culpa nisi aute ad elit.",
    "isArchive": true
  },
  {
    "id": 10,
    "name": "Briana Diaz",
    "createAt": "2020-11-13T09:41:41",
    "category": "Idea",
    "content": "Ad nisi in reprehenderit 2017-02-08 nisi minim enim in do qui mollit ea et ut.",
    "isArchive": true
  }
];

let notesData: Notes[] = data.map(obj => {
  const object = obj as Notes;
  object.id = obj.id;
  return object;
});

const getNotes = (): Array<Notes> => {
  return notesData;
};
const getStatus = () => {
  let result: Stats[] = [];
  for (const note of notesData) {
    const checkCategory = result.find((n) => n.category === note.category);
    if (checkCategory) {
      const newObject = {
        category: checkCategory.category,
        all: checkCategory.all + 1,
        archive: note.isArchive ? checkCategory.archive + 1 : checkCategory.archive
      };
      result = result.map((c) => c.category === newObject.category ? newObject : c);
    } else {
      const newObject = {
        category: note.category,
        all: 1,
        archive: note.isArchive ? 1 : 0
      };
      result.push(newObject);
    }
  }
  return result;
};
const getById = (id: number): Notes | undefined => {
  const note = notesData.find((n) => n.id === id);
  return note;
};

const remove = (id: number) => {
  const newNotes = notesData.filter((n) => n.id !== id);
  notesData = newNotes;
  return '204';
};

const addNote = (notes: NewNotes): Notes => {
  const newNote = {
    ...notes,
    isArchive: false,
    id: Math.max(...notesData.map(n => n.id)) + 1,
    createAt: new Date().toString()
  };
  notesData.push(newNote);
  return newNote;
};
const updateNote = (id: number, note: NotesPatch): Notes | undefined => {
  const updateNote: Notes | undefined = notesData.find((n) => n.id === id);
  if (updateNote) {
    const newNote = Object.assign(updateNote, note);
    const newData = notesData.map((n) => n.id === id ? newNote : n);
    notesData = newData;
    return newNote;
  }
  throw new Error('Incorrect or missing isArchive');
};


export default {
  updateNote,
  getNotes,
  addNote,
  getStatus,
  getById,
  remove
};