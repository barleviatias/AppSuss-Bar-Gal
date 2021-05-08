
import { noteService } from '../services/keep.service.js'
import { NoteColor } from './NoteColor.jsx'


export class NoteCard extends React.Component {
    state = {
        isNoteInspect: false,
        isNoteEdit: false,
        noteClass: 'note-card',
        note: {
            id: this.props.note.id,
            type: this.props.note.type,
            isPinned: this.props.note.isPinned,
            isList: this.props.note.info.isList,
            info: {
                title: this.props.note.info.title,
                txt: this.props.note.info.txt,
                url: this.props.note.info.url,
                todos: this.props.note.info.todos,
                style: {
                    backgroundColor: this.props.note.info.style.backgroundColor
                }
            }
        }
    }

    // TODO: MAKE ONLY ONE NOTE LARGE
    onNoteInspect = () => {
        const isNoteInspect = this.state.isNoteInspect;
        if (isNoteInspect) {
            this.setState(prevState => ({
                ...prevState,
                isNoteInspect: false,
                noteClass: 'note-card'
            }))
        }
        else {
            this.setState(prevState => ({
                ...prevState,
                isNoteInspect: true,
                noteClass: 'note-card-clicked'
            }))

        }
    }


    onEditCard = () => {
        this.setState(prevState => ({
            ...prevState,
            isNoteEdit: true,
        }))
    }

    submitChange = () => {
        const { note } = this.state;
        noteService.editNote(note)
        this.setState(prevState => ({
            ...prevState,
            isNoteEdit: false,
        }))
        console.log('submit!');
    }

    handleChangeInfo = ({ target }) => {
        const field = target.name;
        const value = (target.type === 'number') ? +target.value : target.value;
        this.setState(prevState => ({
            ...prevState,
            note: {
                ...prevState.note,
                info: {
                    ...prevState.note.info,
                    [field]: value,
                }
            }
        }))
    }

    setBackgroundColor = (color) => {
        this.setState(prevState => ({
            ...prevState,
            note: {
                ...prevState.note,
                info: {
                    ...prevState.note.info,
                    style: {
                        ...prevState.note.info.style,
                        backgroundColor: color,
                    }
                }
            }
        }))
    }


    render() {
        const { note, onRemoveNote, onPinNote } = this.props
        const { isNoteEdit, noteClass, isNoteInspect } = this.state
        const { isPinned, type } = this.state.note
        const { title, txt, url, todos } = this.state.note.info
        const { backgroundColor } = this.state.note.info.style
        const styleClass = `${noteClass} ${backgroundColor}`

        return (
            <div className={styleClass} onBlur={this.submitChange}>

                {/* NOTE TITLE */}
                {!isNoteEdit && <h1 onClick={this.onEditCard}>{title}</h1>}
                {isNoteEdit && <input type="text" name="title" className="note-title-edit"
                    onChange={this.handleChangeInfo} value={title} placeholder="title" />}

                {/* NOTE TEXT */}
                {type === 'noteTxt' && <React.Fragment>
                    {!isNoteEdit && <p onClick={this.onEditCard}>{txt}</p>}
                    {isNoteEdit && <textarea className="note-txt-edit" name="txt"
                        onChange={this.handleChangeInfo}
                        placeholder="add text" value={txt}></textarea>}
                </React.Fragment>}

                {/* NOTE IMAGE */}
                {type === 'noteImg' && <React.Fragment>
                    {<img src={url} alt={title} />}
                    {isNoteEdit && <input type="text" name="url" className="note-title-edit"
                        onChange={this.handleChangeInfo} value={url} placeholder="enter a new image link" />}
                </React.Fragment>}

                {/* NOTE TODO */}
                <React.Fragment>
                    {type === 'noteTodos' && <ul> {todos.map((todo, idx) => {
                        return <li key={idx}>{todo}</li>
                    })}
                    </ul>
                    }
                </React.Fragment>

                {/* <React.Fragment>
                                        {note.type === 'notevid' && <video width="400" height="250"><source src={note.info.url} /></video>}
                                    </React.Fragment> */}
                {/* NOTE ACTION BUTTONS */}
                <nav className="note-actions-btns">

                    {/* INSPECT NOTE BUTTON*/}
                    {isNoteInspect && <button title="minimize" className="note-inspect-btn material-icons" onClick={this.onNoteInspect}>zoom_out</button>}
                    {!isNoteInspect && <button title="expand" className="note-inspect-btn material-icons" onClick={this.onNoteInspect}>zoom_in</button>}

                    {/* NOTE COLOR BUTTON */}
                    <NoteColor setBackgroundColor={this.setBackgroundColor} />

                    {/* TODO: use email to send note */}
                    <button className="material-icons">send</button>

                    {/* PIN NOTE BUTTON*/}
                    {isPinned && <button className="note-pin pinned material-icons" onClick={() => onPinNote(note.id)}>push_pin</button>}
                    {!isPinned && <button className="note-pin unpinned material-icons" onClick={() => onPinNote(note.id)}>push_pin</button>}

                    {/* REMOVE NOTE BUTTON*/}
                    <button className="note-remove-btn material-icons" onClick={() => onRemoveNote(note.id)}>delete</button>


                </nav>
            </div>
        )
    }
}


