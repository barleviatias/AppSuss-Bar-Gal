
export class EditCard extends React.Component {
    state = {
        isCardClicked: false
    }

    render() {
        const { note, onPinNote, onRemoveNote, handleChange } = this.props
        // console.log(note);

        return <nav>

            <button>edit</button>
            
            <input type="color" name="backgroundColor" className="keeper-new-img" onChange={handleChange} />
            {/* TODO: use email to send note */}
            <button>send</button>
{/* PIN NOTE */}
            {note.isPinned && <button className="pinned" onClick={() => onPinNote(note.id)}>📌</button>}
            {!note.isPinned && <button className="not-pinned" onClick={() => onPinNote(note.id)}>🔘</button>}

            <button onClick={() => onRemoveNote(note.id)}>remove</button>

        </nav>
    }
}