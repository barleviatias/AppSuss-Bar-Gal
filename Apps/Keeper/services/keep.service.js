'use strict'

import { utilService } from '../../../services/util-service.js'
import { storageService } from '../../../services/storage.service.js'

export const noteService = {
    query,
    addNote,
    removeNote
}

const KEY = 'notes-keeper';

// const gNotes = (storageService.loadFromStorage(KEY)) ? storageService.loadFromStorage(KEY) : 
const gNotes = (storageService.loadFromStorage(KEY)) ? storageService.loadFromStorage(KEY) : ([
    {
        id: 'asfd4',
        type: "noteTxt",
        isAddList: false,
        isPinned: true,
        info: {
            title: '',
            txt: "Fullstack Me Baby!",
            // url: '',
            // todos: [],
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
            // txt: '',
            url: "https://www.itsme.co.il/wp-content/uploads/2019/02/itsme_smartphone-1.png",
            // todos: [],
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
    }
]);

function query() {
    return Promise.resolve(gNotes);
}

// function addNote(type = 'noteTxt', isPinned = false, isAddList = false, title = '', txt = '', url = '', todo = ['']) {
function addNote(note) {
    if (!note.isPinned && !note.title && !note.txt && !note.url) return Promise.reject('no note');
    const newNote = {
        id: utilService.makeId(),
        type: note.type,
        isPinned: note.isPinned,
        isAddList: note.isAddList,
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
    // console.log(noteId);
    var noteIdx = gNotes.findIndex(function (note) {
        return noteId === note.id
    })
    gNotes.splice(noteIdx, 1)
    _saveNotesToStorage();
    console.log('delete!');
    return Promise.resolve()
}


function _saveNotesToStorage() {
    storageService.saveToStorage(KEY, gNotes)
}