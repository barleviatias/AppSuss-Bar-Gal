'use strict'

import { utilService } from '../../../services/util-service.js'
import { storageService } from '../../../services/storage.service.js'

export const noteService = {
    query,
    addNote,
    removeNote,
    pinNote,
    addTodo,
    removeTodo
}

const KEY = 'notes-keeper';

const gNotes = (storageService.loadFromStorage(KEY)) ? storageService.loadFromStorage(KEY) : ([
    {
        id: 'asfd4',
        type: "noteTxt",
        isAddList: false,
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
        isAddList: false,
        isPinned: false,
        info: {
            title: 'buy milk',
            style: {
                backgroundColor: "#00d"
            }
        }
    }, {
        id: 'b4vc85',
        type: "noteImg",
        isPinned: false,
        isAddList: false,
        info: {
            title: "Me playing Mi",
            url: "https://www.itsme.co.il/wp-content/uploads/2019/02/itsme_smartphone-1.png",
            style: {
                backgroundColor: "#00d"
            }
        }
    }, {
        id: 'df5sa',
        isPinned: false,
        isAddList: true,
        type: "noteList",
        info: {
            title: "How was it:",
            // txt: '',
            // url: '',
            todos: [
                { txt: "Do Todo List", doneAt: null },
                { txt: "Do this", doneAt: 187111111 }
            ],
            style: {
                backgroundColor: "#00d"
            }
        }
    }, {
        id: 'e34ksa',
        isPinned: true,
        isAddList: false,
        type: "noteList",
        info: {
            title: "Send to mom",
            txt: 'wowo',
            url: 'https://mymodernmet.com/wp/wp-content/uploads/2020/07/dan-zafra-adirondacks-4.jpg',
            style: {
                backgroundColor: "#00d"
            }
        }
    }
]);

function query() {
    return Promise.resolve(gNotes);
}

function addNote(note) {
    if (!note.isPinned && !note.title && !note.txt && !note.url) return Promise.reject('no note');
    console.log(note);
    const newNote = {
        id: utilService.makeId(),
        type: note.type,
        isPinned: note.isPinned,
        isList: note.isList,
        info: {
            title: note.title,
            txt: note.txt,
            url: note.url,
            todo: note.todo
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
    const newArray = todos;
    newArray.push(txt);
    return newArray
}

function removeTodo(todos, idx) {
    const newArray = todos;
    newArray.splice(idx, 1);
    return newArray
}

function _getNoteIndx(noteId) {
    return gNotes.findIndex(note => {
        return noteId === note.id
    })
}


function _saveNotesToStorage() {
    storageService.saveToStorage(KEY, gNotes)
}