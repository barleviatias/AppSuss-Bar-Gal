
export class EditCard extends React.Component {
    state = {
        isCardClicked: false
    }

    render() {
        const { note, onPinNote, onRemoveNote, handleChange, onNoteInspect } = this.props

        return <nav>

            <button >edit</button>
            {<button  onClick={onNoteInspect}>inspect</button>}
            <input type="color" name="backgroundColor" className="note-color-btn" onChange={handleChange} />

            {/* TODO: use email to send note */}
            <button>send</button>

            {/* PIN NOTE */}
            {note.isPinned && <button className="note-pinned" onClick={() => onPinNote(note.id)}>📌</button>}
            {!note.isPinned && <button className="note-pinned" onClick={() => onPinNote(note.id)}>🔘</button>}
            {/* REMOVE NOTE */}
            <button className="note-remove-btn" onClick={() => onRemoveNote(note.id)}>remove</button>

        </nav>
    }
}