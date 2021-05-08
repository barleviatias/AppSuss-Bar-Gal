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
        id: 'asfd4',
        type: "noteTxt",
        isList: false,
        isPinned: true,
        info: {
            title: '',
            txt: "Fullstack Me Baby!",
            style: {
                backgroundColor: "#00d"
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
        id: 'b4vc85',
        type: "noteImg",
        isPinned: false,
        isList: false,
        info: {
            title: "Me playing Mi",
            url: "https://www.itsme.co.il/wp-content/uploads/2019/02/itsme_smartphone-1.png",
            style: {
                backgroundColor: "gray"
            }
        }
    }, {
        id: 'df5sa',
        isPinned: false,
        isList: true,
        type: "noteTodos",
        info: {
            title: "How was it:",
            todos: ["Do Todo List", "Do this"],
            style: {
                backgroundColor: "white"
            }
        }
    }, {
        id: 'e34ksa',
        isPinned: true,
        isList: false,
        type: "noteImg",
        info: {
            title: "Send to mom",
            txt: 'wowo',
            url: "https://mymodernmet.com/wp/wp-content/uploads/2020/07/dan-zafra-adirondacks-4.jpg",
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
    console.log('edit!');
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