let notes = [
  {
    "id": "1111111",
    "name": "Dianna Rose",
    "createAt": '2022-06-11T09:38:49',
      "category": "Random Thought",
      "content": "Consequat pariatur 2018-06-09 ullamco velit est deserunt 2020.01.17 reprehenderit sit irure magna.",
      "isArchive": true
  },

  {
    "id": "222222",
    "name": "Catalina Horton",
    "createAt": "2015-07-27T10:52:10",
    "category": "Random Thought",
    "content": "Adipisicing adipisicing 2020-08-18 nisi ut et qui nostrud.",
    "isArchive": false
  },
  {
    "id": "333333",
    "name": "Jimenez Solis",
    "createAt": "2018-09-18T08:44:24",
    "category": "Task",
    "content": "In 2019-10-04 Lorem consequat excepteur consequat sint nisi.",
    "isArchive": false
  },
  {
    "id": "4444444",
    "name": "Cole Davenport",
    "createAt": "2015-01-12T05:42:23",
    "category": "Idea",
    "content": "Proident Lorem 2017-04-07 in nulla nisi sunt veniam eiusmod fugiat enim 2017-12-23 sit.",
    "isArchive": false
  },
  {
    "id": "555555",
    "name": "Petty House",
    "createAt": "2018-03-15T03:43:09",
    "category": "Idea",
    "content": "Lorem 2021-05-18 veniam tempor 2015-10-22 consequat dolor proident mollit 2018-11-11 culpa dolor eiusmod eiusmod magna.",
    "isArchive": false
  },
  {
    "id": "666666",
    "name": "Winifred Holt",
    "createAt": "2014-04-10T03:54:01",
    "category": "Idea",
    "content": "Occaecat quis 2022-01-27 dolor do culpa 2022-07-24.",
    "isArchive": true
  },
  {
    "id": "777777",
    "name": "Holloway Barrett",
    "createAt": "2022-05-16T03:56:04",
    "category": "Random Thought",
    "content": "Officia 2018-03-11 deserunt enim 2019-12-01 sit id quis laborum ipsum dolor aute irure.",
    "isArchive": false
  },
  {
    "id": "888888",
    "name": "Cervantes Hardin",
    "createAt": "2014-02-07T10:14:14",
    "category": "Task",
    "content": "Cillum elit ullamco aliqua 2022-08-01 ad labore sit qui incididunt est.",
    "isArchive": true
  },
  {
    "id": "999999",
    "name": "Vaughn Yates",
    "createAt": "2018-11-14T11:54:01",
    "category": "Task",
    "content": "Labore cupidatat 2022-08-10 tempor est qui culpa nisi aute ad elit.",
    "isArchive": true
  },
  {
    "id": "1010101010101",
    "name": "Briana Diaz",
    "createAt": "2020-11-13T09:41:41",
    "category": "Idea",
    "content": "Ad nisi in reprehenderit 2017-02-08 nisi minim enim in do qui mollit ea et ut.",
    "isArchive": true
  }
]
interface Note {
  id: string;
  name: string;
  createAt: string;
  category: string;
  content: string;
  isArchive: boolean;
}

const getAll = () => {
  return notes
}

const deleteNote = (id: string) => {
  notes = notes.filter((n) => n.id !== id)
  return '204'
}

const updateNote = (note: Note) => {
  notes = notes.map((n) => {
    return n.id === note.id ? note : n
  })
  return note
}

const deleteNoteAll = (showArchive: boolean) => {
  notes = notes.filter((n) => n.isArchive === !showArchive)
  return notes
}
const updateAll = (showArchive: boolean) => {
  notes = notes.map((n) => {
    return {...n, isArchive: !showArchive}
})
  return notes
}
const addNote = (note: Note) => {
  const check = notes.find((n) => n.id === note.id)
  if (check) {
    return notes
  }
  notes.concat(note)
  return note
}

const notesServices = {
  getAll,
  deleteNote,
  updateNote,
  deleteNoteAll,
  addNote,
  updateAll
}

export default notesServices