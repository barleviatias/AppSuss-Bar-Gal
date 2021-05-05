'use strict'

import { utilService } from '../../../services/util-service.js'
import { storageService } from '../../../services/storage.service.js'

export const noteService = {
    query,
    addNote
}

const KEY = 'notes-keeper';

const gNotes = [
    {
        id: 'asfd4',
        type: "noteTxt",
        isAddList: false,
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
        type: "noteImg",
        isPinned: false,
        isAddList: false,
        info: {
            title: "Me playing Mi",
            txt: '',
            url: "https://www.itsme.co.il/wp-content/uploads/2019/02/itsme_smartphone-1.png",
            todos: [],
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
            txt: '',
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

function addNote(type = 'noteTxt', isPinned = false,isAddList = false,  title = '', txt = '', url = '', todo = ['']) {
    // if (isPinned === false &&
    //     title === '' &&
    //     txt === '' &&
    //     url === '' &&
    //     todo === ['']) return Promise.reject('no note');
    const note = {
        id: utilService.makeId(),
        type,
        isPinned,
        isAddList,
        info: {
            title,
            txt,
            url,
            todo
        }
    }

    gNotes.unshift(note);
    storageService.saveToStorage(KEY, gNotes)
    return Promise.resolve(note)
}