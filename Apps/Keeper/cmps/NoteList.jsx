
import { NoteCard } from './NoteCard.jsx'

export function NoteList({ notes, onRemoveNote, onPinNote }) {
    return <section className="notes-container container">
        <h2>Pinned Notes 📌</h2>
        <div className="notes-pinned" key>
            {notes.map(note => {
                return note.isPinned &&
                    <NoteCard note={note} key={note.id}
                        onRemoveNote={onRemoveNote}
                        onPinNote={onPinNote} />
            })}
        </div>
        <h2>Notes 🔘</h2>
        <div className="notes-not-pinned">
            {notes.map(note => {
                return (
                    !note.isPinned && <NoteCard note={note} key={note.id}
                        onRemoveNote={onRemoveNote}
                        onPinNote={onPinNote} />

                )
            })}
        </div>
    </section>
}