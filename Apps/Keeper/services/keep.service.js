'use strict'

export const noteService = {
    query,
}

const gNotes = [
    {
        id:'asfd4',
        type: "NoteText",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id:'a4vc85',
        type: "NoteImg",
        isPinned: false,
        info: {
            url: "http://some-img/me",
            title: "Me playing Mi"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id:'df5sa',
        isPinned: false,
        type: "NoteTodos",
        info: {
            label: "How was it:",
            todos: [
                { txt: "Do Todo List", doneAt: null },
                { txt: "Do this", doneAt: 187111111 }
            ]
        }
    }
];

function query() {
    console.log('Lets start!');
    return Promise.resolve(gNotes);
}