
import { EditCard } from './NoteEdit.jsx'


export class NoteCard extends React.Component {
    state = {
        isNoteClicked: 'note-card',
        backgroundColor: this.props.note.info.style.backgroundColor,
        title: this.props.note.info.title,
        txt: this.props.note.info.txt,
        url: this.props.note.info.url,
        todos: this.props.note.info.todos
    }

    
    onNoteClicked = () => {
        console.log(event);
        if (this.state.isNoteClicked === 'note-card-clicked') {
            this.setState(prevState => ({
                ...prevState,
                isNoteClicked: 'note-card'
            }))
        } else {
            this.setState(prevState => ({
                ...prevState,
                isNoteClicked: 'note-card-clicked'
            }))
        }
        console.log(this.state.isNoteClicked);
    }
    
    // TODO: change features in service
        onEditCard = () => {
    }
    


    handleChange = ({ target }) => {
        const field = target.name;
        const value = (target.type === 'number') ? +target.value : target.value;
        this.setState(prevState => ({
            ...prevState,
            [field]: value,

        }))
    }


    render() {
        const { note, onRemoveNote, onPinNote } = this.props
        const { title, txt, url, todos, backgroundColor, isNoteClicked } = this.state

        const noteStyle = {
            backgroundColor: backgroundColor
        }
        return (
            <div style={noteStyle} onClick={this.onNoteClicked} className={isNoteClicked} onBlur={isNoteClicked}>

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
                <EditCard note={note} key={note.id}
                    onRemoveNote={onRemoveNote}
                    onPinNote={onPinNote}
                    handleChange={this.handleChange} />
            </div>
        )
    }
}