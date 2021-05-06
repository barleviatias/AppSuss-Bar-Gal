
export function NoteCard({ note, onRemoveNote, pinNote }) {
    const { title, txt, url, todos } = note.info
    return (
        <div className={"note-card"}>
            {note.isPinned && <button className="pinned" onClick={pinNote}>📌</button>}
            {!note.isPinned && <button className="not-pinned" onClick={pinNote}>🔘</button>}
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