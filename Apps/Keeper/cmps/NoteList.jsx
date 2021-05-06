
import { NoteCard } from './NoteCard.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteVid } from './NoteVideo.jsx'
import { NoteAud } from './NoteAudio.jsx'


export function NoteList({ notes, onRemoveNote, pinNote }) {
    return <section className="notes-container container">
            <h2>Pinned Notes 📌</h2>
        <div className="notes-pinned" key>
            {notes.map(note => {
                return note.isPinned &&
                <NoteCard note={note} key={note.id} onRemoveNote={onRemoveNote} pinNote={pinNote} />
            })}
            </div>
            <h2>Notes 🔘</h2>
        <div className="notes-not-pinned">
            {notes.map(note => {
                return (
                    !note.isPinned && <NoteCard note={note} key={note.id} onRemoveNote={onRemoveNote} pinNote={pinNote} />
                    
                    )
                })}
                </div>
    </section>
}