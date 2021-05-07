
import { EditCard } from './NoteEdit.jsx'

export function NoteCard({ note, onRemoveNote, onPinNote }) {
    const { title, txt, url, todos, style } = note.info
    const noteStyle = {
        background: style.backgroundColor
    }
    return (
        <div className={"note-card"} style={noteStyle}>
            {note.isPinned && <button className="pinned" onClick={() => onPinNote(note.id)}>📌</button>}
            {!note.isPinned && <button className="not-pinned" onClick={() => onPinNote(note.id)}>🔘</button>}

            <h1>{title}</h1>

            <p>{txt}</p>

            {note.type === 'noteImg' && <img src={url} alt={title} />}

            {/* {note.type === 'notevid' && <video width="400" height="250"><source src={note.info.url}/></video>}
            {note.type === 'noteAud' && <video width="400" height="250"><source src={note.info.url}/></video>} */}

            {todos && <ul> {todos.map((todo, idx) => {
                return <li key={idx}>{todo}</li>
            })}
            </ul>
            }
            <button onClick={() => onRemoveNote(note.id)}>remove</button>
        </div>
    )
}