'use strict'

import { utilService } from '../../../services/util-service.js'
import { storageService } from '../../../services/storage.service.js'

export const noteService = {
    query,
    addNote,
    removeNote,
    pinNote,
    addTodo,
    removeTodo,
    editNote
}

const KEY = 'notes-keeper';

const gNotes = (storageService.loadFromStorage(KEY)) ? storageService.loadFromStorage(KEY) : ([
    {
        id: 'gdasfd4',
        type: "noteTxt",
        isPinned: false,
        isList: false,
        info: {
            title: 'dont forget to plan stops on the trip to Eilat',
            txt: '',
            style: {
                backgroundColor: "red"
            }
        }
    }, {
        id: 'ka2sk22',
        type: "noteTxt",
        isList: false,
        isPinned: false,
        info: {
            title: 'buy milk',
            style: {
                backgroundColor: "yellow"
            }
        }
    }, {
        id: 'bg4vc85',
        type: "noteImg",
        isPinned: false,
        isList: false,
        info: {
            title: "just me saying hi",
            url: 'https://i.pinimg.com/236x/c0/51/25/c051256ad2d29c450507fa2bb11568d0--chubby-cheeks-fit.jpg',
            style: {
                backgroundColor: "gray"
            }
        }
    }, {
        id: 'dhf5sa',
        isPinned: false,
        isList: true,
        type: "noteTodos",
        info: {
            title: 'shoppin list',
            todos: ['Cheese', 'Milk', 'Cookies', 'Banana', ''],
            style: {
                backgroundColor: "green"
            }
        }
    }, {
        id: 'zfsa5sa',
        isPinned: true,
        isList: false,
        type: "noteVid",
        info: {
            title: "Good Morning chipi style",
            url: 'https://www.youtube.com/embed/dawZk4FqWH8',
            style: {
                backgroundColor: "green"
            }
        }
    }, {
        id: 'asf45a3',
        isPinned: false,
        isList: false,
        type: "noteVid",
        info: {
            title: "group power",
            url: 'https://www.youtube.com/embed/fxsPMHY3H3k',
            style: {
                backgroundColor: "orange"
            }
        }
    }, {
        id: 'ke3a4kadsa',
        isPinned: true,
        isList: false,
        type: "noteImg",
        info: {
            title: ' ',
            url: 'https://mymodernmet.com/wp/wp-content/uploads/2020/07/dan-zafra-adirondacks-4.jpg',
            style: {
                backgroundColor: 'blue'
            }
        }
    }, {
        id: 'kao3ak2',
        isPinned: false,
        isList: false,
        type: 'noteImg',
        info: {
            title: 'got to send mom img from my new place',
            url: 'https://i.ytimg.com/vi/Yz7iuJsr4Qg/sddefault.jpg',
            style: {
                backgroundColor: "gray"
            }
        }
    }, {
        id: 'akslasmdg43',
        isPinned: false,
        isList: false,
        type: 'noteTxt',
        info: {
            title: "philosophical thinking...",
            txt: ' Common sense requires scientific formulation. Both AI and philosophy require it, and philosophy might even be regarded as an attempt to make common sense into a science.            ',
                        style: {
                backgroundColor: "blue"
            }
        }
    }, {
        id: 'aj2de122',
        isPinned: false,
        isList: false,
        type: 'noteImg',
        info: {
            title: '',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3aZ9cvMb5trOAqySjE0pdb0f5QSN0I1wUJw&usqp=CAU',
                        style: {
                backgroundColor: "blue"
            }
        }
    }, {
        id: 'vda2da3sd',
        isPinned: false,
        isList: false,
        type: 'noteVid',
        info: {
            title: '',
            url: 'https://www.youtube.com/embed/eX2qFMC8cFo',
                        style: {
                backgroundColor: "brown"
            }
        }
    }, {
        id: 'fas33da',
        isPinned: true,
        isList: true,
        type: 'noteTodos',
        info: {
            title: 'wedding must',
            todos: ['find a dj', 'make inventation list', 'find a place','set a date', 'find a suit', 'IMPORTANT: keep her calm'],
            style: {
                backgroundColor: "red"
            }
        }
    }, {
        id: 'dfdsa3d',
        isPinned: true,
        isList: false,
        type: 'noteImg',
        info: {
            title: 'come closer body',
            url: 'https://i.pinimg.com/originals/ae/c0/44/aec0445c6b1673136db065b176d1e888.gif',
            style: {
                backgroundColor: 'purpule'
            }
        }
    }, {
        id: 'fgasoi3i3',
        isPinned: false,
        isList: false,
        type: "noteTxt",
        info: {
            title: 'nice one',
            txt: 'i told my gilfriend she drawing her eyebrows too high, she looked suprise',
            style: {
                backgroundColor: "default"
            }
        }
    }, {
        id: 'asasfas3',
        isPinned: true,
        isList: false,
        type: 'noteImg',
        info: {
            title:'hello',
            url: 'https://lh6.googleusercontent.com/proxy/Pj0eM3hJTfnuDIy5GsFyyVLoAADfBaGQBm-UZfmnVTmLzRrkHPxAU_UpWWtHkfwhqBcSORFI8aSOEf3yFmyqlaCGSQ9aPmWMTTNYBWwVT45HfHtjPvbcldIH=s0-d',
            style: {
                backgroundColor: 'default',
            }
        }
    }, {
        id: 'dasf3sas',
        isPinned: false,
        isList: false,
        type: "noteTxt",
        info: {
            title: 'Start your day',
            txt: 'How you start the morning sets the tone for the rest of the day. Have you ever woken up late, panicked, and then felt like nothing good happened the rest of the day? This is likely because you started out the day with a negative emotion and a pessimistic view that carried into every other event you experienced. Instead of letting this dominate you, start your day with positive affirmations. Talk to yourself in the mirror, even if you feel silly, with statements like, “Today will be a good day” or “I’m going to be awesome today.” You’ll be amazed how much your day improves.',
            style: {
                backgroundColor: "white"
            }
        }
    }
]);

function query() {
    return Promise.resolve(gNotes);
}

function addNote(note) {
    if (!note.isPinned && !note.title && !note.txt && !note.url && !note.todos) return Promise.reject('no note');
    const newNote = {
        id: utilService.makeId(),
        type: note.type,
        isPinned: note.isPinned,
        isList: note.isList,
        info: {
            title: note.title,
            txt: note.txt,
            url: note.url,
            todos: note.todos,
            style: {
                backgroundColor: note.backgroundColor
            }
        }
    }
    gNotes.unshift(newNote);
    _saveNotesToStorage();
    return Promise.resolve(newNote)
}


function removeNote(noteId) {
    let noteIdx = _getNoteIndx(noteId)
    gNotes.splice(noteIdx, 1)
    _saveNotesToStorage();
    return Promise.resolve()
}

function pinNote(noteId) {
    const noteIdx = _getNoteIndx(noteId);
    const note = gNotes[noteIdx];
    if (note.isPinned) note.isPinned = false;
    else note.isPinned = true;
    _saveNotesToStorage();

    return Promise.resolve(note)
}

function addTodo(txt, todos) {
    if (!txt) return todos;
    const newTodos = todos;
    newTodos.push(txt);
    return newTodos
}

function removeTodo(todos, idx) {
    const newTodos = todos;
    newTodos.splice(idx, 1);
    return newTodos
}

function editNote(note) {
    console.log('note', note);
    const noteIdx = _getNoteIndx(note.id)
    gNotes.splice(noteIdx, 1, note)
    _saveNotesToStorage()
    return Promise.resolve()
}






function _getNoteIndx(noteId) {
    return gNotes.findIndex(note => {
        return noteId === note.id
    })
}

function _saveNotesToStorage() {
    storageService.saveToStorage(KEY, gNotes)
}