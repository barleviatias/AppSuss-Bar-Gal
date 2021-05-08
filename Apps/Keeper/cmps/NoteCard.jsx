
import { noteService } from '../services/keep.service.js'


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


    // TODO: change features in service
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
    handleChangeStyle = ({ target }) => {
        const field = target.name;
        const value = (target.type === 'number') ? +target.value : target.value;
        this.setState(prevState => ({
            ...prevState,
            note: {
                ...prevState.note,
                info: {
                    ...prevState.note.info,
                    style: {

                        ...prevState.note.info.style,
                        [field]: value,
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
        const noteStyle = {
            backgroundColor: backgroundColor
        }
        console.log(todos);
        return (
            <div style={noteStyle} className={noteClass} onBlur={this.submitChange}>

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

                <nav className="note-actions-btns">

                    {/* INSPECT NOTE */}
                    {isNoteInspect && <button onClick={this.onNoteInspect}>-</button>}
                    {!isNoteInspect && <button onClick={this.onNoteInspect}>+</button>}

                    <input type="color" name="backgroundColor" className="note-color-btn" onChange={this.handleChangeStyle} />

                    {/* TODO: use email to send note */}
                    <button>send</button>

                    {/* PIN NOTE */}
                    {isPinned && <button className="note-pinned" onClick={() => onPinNote(note.id)}>📌</button>}
                    {!isPinned && <button className="note-pinned" onClick={() => onPinNote(note.id)}>🔘</button>}

                    {/* REMOVE NOTE */}
                    <button className="note-remove-btn" onClick={() => onRemoveNote(note.id)}>remove</button>


                </nav>
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
