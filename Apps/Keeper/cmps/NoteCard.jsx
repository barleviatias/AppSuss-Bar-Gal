
import {EditCard} from './NoteEdit.jsx'

export function NoteCard({ note, onRemoveNote, onPinNote }) {
    const { title, txt, url, todos } = note.info
    return (
        <div className={"note-card"}>
            {note.isPinned && <button className="pinned" onClick={()=>onPinNote(note.id)}>📌</button>}
            {!note.isPinned && <button className="not-pinned" onClick={()=>onPinNote(note.id)}>🔘</button>}
            <h1>{title}</h1>
            <p>{txt}</p>
            {url && <img src={url} alt={title} />}
            {note.isAddList &&
                <ul> {todos.map((todo, idx) => {
                    return <li key={idx}>{todo.txt} <span>{todo.doneAt}</span> </li>
                })}
                </ul>
            }
            <button onClick={() => onRemoveNote(note.id)}>remove</button>
        </div>
    )
}