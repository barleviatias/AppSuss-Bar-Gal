
import { NoteList } from './NoteList.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { noteService } from '../services/keep.service.js'

export class KeepApp extends React.Component {
    state = {
        notes: null,
        visible: false,
        note: {
            type: null,
            isPinned: false,
            title: null,
            txt: null,
            urc: null
        }
    }

    componentDidMount() {
        this.loadNotes()
    }

    

    // SETING STATE FUNCTIONS

    loadNotes = () => {
        noteService.query()
            .then(notes => {
                this.setState({ notes })
            })
    }

    onPinNote = (noteId) => {
        noteService.pinNote(noteId)
            .then(() => {
                this.loadNotes()
            })
    }

    setNewNoteState(type, bollean) {
        this.setState(prevState => ({
            note: {
                ...prevState.note,
                [type]: bollean
            }
        }))
    }

    setInputType(type) {
        this.setState({
            visible: true,
            note: { type, }
        })
    }


    // NOTE ADD / REMOVE / EDIT

    onAddNote = (ev) => {
        ev.preventDefault();
        const { note } = this.state;
        // console.log(note);
        noteService.addNote(note)
            .then(noteAded => {
                this.loadNotes;
                this.setState({
                    // visible: false,
                    note: {
                        type: null,
                        isPinned: false,
                        isAddTodo: false,
                        title: '',
                        txt: '',
                        url: '',
                    }
                })

            })
            .catch(() => {
                this.setState({ visible: false })
            })
    }

    onRemoveNote = (noteId) => {
        noteService.removeNote(noteId)
            .then(() => {
                this.loadNotes()
            })
    }


    handleChange = ({ target }) => {
        const field = target.name;
        const value = (target.type === 'number') ? +target.value : target.value;
        console.log(value);
        this.setState(prevState => ({
            note: {
                [field]: value,
                ...prevState.note,
            }
        }))
        // console.log(this.state.note);
    }

    render() {
        const { notes, visible, note } = this.state
        const { type } = this.state.note

        if (!notes) return <div>Loading...</div>

        return (<section className="keeper-container">

            <header className="keeper-header">
                {/* TODO: add filter note cmp */}
            </header>

            {/* ---- NEW NOTES INPUT ---- */}
            <form className="keeper-new-note">
                {!type && <input type="text" name="title" className="keeper-new-title"
                    onClick={() => this.setInputType('noteTxt')}
                    onChange={this.handleChange}
                    placeholder="Write a new note"/>}
                {type && <input type="text" name="title" className="keeper-new-title"
                    onClick={() => this.setInputType(type)}
                    onChange={this.handleChange}
                    placeholder="Write a new note"/>}

                {visible && <React.Fragment>

                    {/* PIN NEW NOTE */}
                    {!note.isPinned && <button type="button" onClick={() => this.setNewNoteState('isPinned', true)}>Pin</button>}
                    {note.isPinned && <button type="button" onClick={() => this.setNewNoteState('isPinned', false)}>UnPin</button>}


                    {/* ADD NEW TEXT */}
                    {type === 'noteTxt' && <textarea className="keeper-new-txt"
                        name="txt" id="" cols="30" rows="3"
                        onChange={this.handleChange}></textarea>}

                    {/* ADD NEW IMAGE */}
                    {type === 'noteImg' && <input type="text" name="url" className="keeper-new-img"
                        onChange={this.handleChange} placeholder="add image link" />}

                    {/* ADD NEW VIDEO */}
                    {type === 'noteVid' && <input placeholder="add video link" />}

                    {/* ADD NEW AUDIO */}
                    {type === 'noteAud' && <input placeholder="add audio link" />}

                </React.Fragment>}
                {/* ADD NEW TODOS */}
                {type === 'noteTodos' && <NoteTodos note={note} />}

                <button classame="keeper-submit-note" type="submit" onClick={this.onAddNote}>Add Note</button>

                {/* KEEPER ADD INPUTS BUTTONS*/}
                <div className="keeper-btn-inputs">
                    <button type="button" className="keeper-txt-btn"
                        onClick={() => {
                            this.setInputType('noteTxt')
                        }}
                        title="add text">Text</button>

                    <button type="button" className="keeper-img-btn"
                        onClick={() => {
                            this.setInputType('noteImg')
                        }}
                        title="add image">Image</button>

                    <button type="button" title=" Add-List" className="keeper-list-btn"
                        onClick={() => {
                            this.setInputType('noteTodos');
                        }}
                        title="add todo list">List
                    </button>

                    <button type="button" className="keeper-vid-btn"
                        onClick={() => {
                            this.setInputType('noteVid')
                        }}
                        title="add video">Video
                        </button>
                    <button type="button" className="keeper-aud-btn"
                        onClick={() => {
                            this.setInputType('noteAud')
                        }}
                        title="add sound">Audio</button>
                </div>
            </form>

            {/* DISPLAY NOTES */}
            <main className="keeper-notes-container">
                <NoteList notes={notes}
                    onRemoveNote={this.onRemoveNote}
                    onPinNote={this.onPinNote} />
            </main>
        </section >
        )
    }
}

