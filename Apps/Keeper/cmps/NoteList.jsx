
import { NoteCard } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteVid } from './NoteVideo.jsx'
import { NoteAud } from './NoteAudio.jsx'


export function NoteList({ notes, onRemoveNote }) {
    return <section className="notes-container">
        <h1>Your Notes</h1>
        {notes.map(note => {
             return <NoteCard note={note} key={note.id} onRemoveNote={onRemoveNote}/>
            // switch (note.type) {
            //     case 'noteTxt':
            //         return <NoteTxt note={note} key={note.id}/>
            //     case 'noteImg': 
            //         return <NoteImg note={note} key={note.id}/>
            //     case 'noteList':
            //         return <NoteTodos note={note}key={note.id}/>
            //     case 'noteVid':
            //         return <NoteVid note={note} key={note.id}/>
            //     case 'noteAud':
            //         return <NoteAud note={note} key={note.id}/>
            //     default:
            //         break;
            // }
        })}
    </section>
}