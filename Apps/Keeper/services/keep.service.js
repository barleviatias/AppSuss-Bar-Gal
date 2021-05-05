'use strict'

import {utilService} from '../../../services/util-service.js'
import {storageService} from '../../../services/storage.service.js'

export const noteService = {
    query,
    addNote
}

const KEY='notes-keeper';

const gNotes = [
    {
        id: 'asfd4',
        type: "NoteText",
        isPinned: true,
        info: {
            title: '',
            txt: "Fullstack Me Baby!",
            url: '',
            todos: [],
            style: {
                backgroundColor: "#00d"
            }
        }
    }, {
        id: 'a4vc85',
        type: "NoteImg",
        isPinned: false,
        info: {
            title: "Me playing Mi",
            txt: '',
            url: "http://some-img/me",
            todos: [],
            style: {
                backgroundColor: "#00d"
            }
        }
    }, {
        id: 'df5sa',
        isPinned: false,
        type: "NoteTodos",
        info: {
            title: "How was it:",
            txt:'',
            url: '',
            todos: [
                { txt: "Do Todo List", doneAt: null },
                { txt: "Do this", doneAt: 187111111 }
            ],
            style: {
                backgroundColor: "#00d"
            }
        }
    }
];

function query() {
    return Promise.resolve(gNotes);
}

function addNote(type='noteTxt', isPinned=false, title='', txt='', url='') {
    const note = {
        id: Date.now(),
        type,
        isPinned,
        info: {
            title,
            txt,
            url,
        }
    }

    gNotes.unshift(note);
    // storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve(note)
}