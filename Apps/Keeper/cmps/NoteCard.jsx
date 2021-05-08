
import { EditCard } from './NoteEdit.jsx'
import { noteService } from '../services/keep.service.js'


export class NoteCard extends React.Component {
    state = {
        isNoteClicked: false,
        isNoteEdit: false,
        noteClass: 'note-card',
        note: {
            backgroundColor: this.props.note.info.style.backgroundColor,
            title: this.props.note.info.title,
            txt: this.props.note.info.txt,
            url: this.props.note.info.url,
            todos: this.props.note.info.todos
        }
    }

    // TODO: MAKE ONLY ONE NOTE LARGE
    onNoteInspect = () => {
        const isNoteClicked = this.state.isNoteClicked;
        if (isNoteClicked) {
            this.setState(prevState => ({
                ...prevState,
                isNoteClicked: false,
                noteClass: 'note-card'
            }))
        }
        if (!isNoteClicked) {
            this.setState(prevState => ({
                ...prevState,
                isNoteClicked: true,
                noteClass: 'note-card-clicked'
            }))
            
        }
    }
    

    // TODO: change features in service
    onEditCard = () => {
        this.setState(prevState => ({
            ...prevState,
            isNoteEdit: true,
        }))
    }

    submitChange = () =>{
        const {title, txt, url, todos, backgroundColor} = this.state
        this.setState(prevState => ({
            ...prevState,
            isNoteEdit: false,
        }))
        console.log('submit!');
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = (target.type === 'number') ? +target.value : target.value;
        this.setState(prevState => ({
            note: {
                ...prevState.note,
                [field]: value,
            }

        }))
    }


    render() {
        const { note, onRemoveNote, onPinNote } = this.props
        const { isNoteEdit, noteClass } = this.state
        const { title, txt, url, todos, backgroundColor, } = this.state.note
        const noteStyle = {
            backgroundColor: backgroundColor
        }
        console.log(todos);
        return (
            <div style={noteStyle} className={noteClass} onBlur={this.submitChange}>

                {!isNoteEdit && <h1 onDoubleClick={this.onEditCard}>{title}</h1>}
                {isNoteEdit && <input type="text" name="title" className="note-title"
                   onChange={this.handleChange}
                    value={title} placeholder="title"/>}

                {note.type === 'noteTxt' && <React.Fragment>
                    {!isNoteEdit && <p onDoubleClick={this.onEditCard}>{txt}</p>}
                    {isNoteEdit && <textarea className="keeper-edit-txt" name="txt"
                        onChange={this.handleChange}
                        placeholder="add text" value={txt}></textarea>}
                </React.Fragment>}
                {note.type === 'noteImg' && <React.Fragment>
                    <img src={url} alt={title} />

                </React.Fragment>}
                {/* <React.Fragment>
                    {note.type === 'notevid' && <video width="400" height="250"><source src={note.info.url} /></video>}
                </React.Fragment>
                <React.Fragment>
                    {note.type === 'noteAud' && <video width="400" height="250"><source src={note.info.url} /></video>}
                </React.Fragment> */}

                {/* NOTE TODO */}
                <React.Fragment>
                    {note.type === 'noteTodos' && <ul> {todos.map((todo, idx) => {
                        return <li key={idx}>{todo}</li>
                    })}
                    </ul>
                    }
                </React.Fragment>
                <EditCard note={note} key={note.id}
                    onRemoveNote={onRemoveNote}
                    onPinNote={onPinNote}
                    handleChange={this.handleChange}
                    onNoteInspect={this.onNoteInspect}
                />
            </div>
        )
    }
}



// {/* ADD NEW IMAGE */}
// {type === 'noteImg' && <input type="text" name="url" className="keeper-new-img"
// onChange={this.handleChange} placeholder="add image link" />}

// {/* ADD NEW VIDEO */}
// {type === 'noteVid' && <input type="text" name="url" className="keeper-new-img"
// onChange={this.handleChange} placeholder="add video link" />}

// {/* ADD NEW AUDIO */}
// {type === 'noteAud' && <input placeholder="add audio link" />}

// {/* ADD NEW TODOS */}
// {type === 'noteTodos' && <NoteTodos onAddNewList={this.onAddNewList} />}

// {type !== 'noteTodos' && <button classame="keeper-submit-note" type="submit" onClick={this.onAddNote}>Add Note</button>}
