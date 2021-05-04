'use strict'

import utilService from '../../../services/util-service.js'

export const noteService = {
    query,
}

const gNotes = [
    {
        id: 'asfd4',
        type: "NoteText",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!",
            style: {
                backgroundColor: "#00d"
            }
        }
    }, {
        id: 'a4vc85',
        type: "NoteImg",
        isPinned: false,
        info: {
            url: "http://some-img/me",
            title: "Me playing Mi",
            style: {
                backgroundColor: "#00d"
            }
        }
    }, {
        id: 'df5sa',
        isPinned: false,
        type: "NoteTodos",
        info: {
            label: "How was it:",
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

function addNote(type, isPinned,info) {
    const note = {
        id: utilService.makeId(),
        type,
        isPinned,
        info,
    }

}