
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

            {note.type = 'noteImg' && <img src={url} alt={title} />}
            
            {/* {note.type = 'noteVid' && <iframe src={note.info.url}></iframe>}
            {note.type = 'noteAud' && <iframe src={note.info.url}></iframe>} */}

            {todos && <ul> {todos.map((todo, idx) => {
                return <li key={idx}>{todo.txt}</li>
            })}
            </ul>
            }
            <button onClick={() => onRemoveNote(note.id)}>remove</button>
        </div>
    )
}