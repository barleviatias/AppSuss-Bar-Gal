
import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteVid } from './NoteVideo.jsx'
import { NoteAud } from './NoteAudio.jsx'


export function NoteList({ notes }) {
    return <section className="notes-container">
        <h1>Your Notes</h1>
        {notes.map((note) => {
            switch (note.type) {
                case 'noteTxt':
                    return <NoteTxt note={note}/>
                case 'noteImg':
                    return <NoteImg note={note}/>
                case 'noteList':
                    return <NoteTodos note={note}/>
                case 'noteVid':
                    return <NoteVid note={note}/>
                case 'noteAud':
                    return <NoteAud note={note}/>
                default:
                    break;
            }
        })}
    </section>
}