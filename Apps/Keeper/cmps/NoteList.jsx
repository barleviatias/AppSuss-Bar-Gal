


export function NoteList({notes}) {
    return <section className="notes-container">
        <h1>Your Notes</h1>
        {notes.map((note) => { 
            return <p key={note.id}> note={note.type}</p> })}
    </section>
}