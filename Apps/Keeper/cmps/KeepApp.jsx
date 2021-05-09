
import { NoteList } from './NoteList.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { noteService } from '../services/keep.service.js'
import { NoteColor } from './NoteColor.jsx'

export class KeepApp extends React.Component {

    state = {
        notes: null,
        visible: false,
        note: {
            type: null,
            isPinned: false,
            title: '',
            txt: '',
            url: '',
            todos: '',
            backgroundColor: 'default',
        }
    }

    componentDidMount() {
        this.loadNotes()
    }



    // NOTE FUNCTIONS 

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

    setNewNoteState = (type, val) => {
        this.setState(prevState => ({
            note: {
                ...prevState.note,
                [type]: val
            }
        }))

    }

    setInputType(type) {
        this.setState({
            visible: true,
            note: { type, }
        })
    }

    setBackgroundColor = (color) => {
        this.setState(prevState => ({
            ...prevState,
            note: {
                ...prevState.note,
                backgroundColor: color,

            }
        }))
    }


    onAddNewList = (list) => {
        this.setState(prevState => ({
            note: {
                ...prevState.note,
                todos: list
            }
        }), this.onAddNote)
    }

    // NOTE ADD / REMOVE / EDIT

    onAddNote = () => {
        event.preventDefault();
        const { note } = this.state;
        noteService.addNote(note)
            .then(() => {
                this.loadNotes;
                this.setState(state => ({
                    ...state,
                    visible: false,
                    note: {
                        type: null,
                        isPinned: false,
                        isAddTodo: false,
                        title: '',
                        txt: '',
                        url: '',
                        todos: '',
                    }
                }))
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
        this.setState(prevState => ({
            note: {
                ...prevState.note,
                [field]: value,
            }
        }))
    }


    render() {
        const { notes, visible, note } = this.state
        const { type, backgroundColor } = this.state.note
        if (!notes) return <div>Loading...</div>

        return (<section className="keeper-container">

            <header className="keeper-header">
                {/* TODO: add filter note cmp */}
            </header>

           
            {/* ----- NEW NOTES INPUT ----- */}
            <form className="keeper-new-note" >

                <div className={`keeper-input-container ${backgroundColor}`}>

                    {/* ADD NEW TITLE */}
                    {!type && <input type="text" name="title" className="keeper-new-title"
                        onClick={() => this.setInputType('noteTxt')}
                        placeholder="Write a new note" />}

                    {type && <input type="text" name="title" className="keeper-new-title"
                        onClick={() => this.setInputType(type)}
                        onChange={this.handleChange}
                        placeholder="title" />}

                    {visible && <React.Fragment>

                        {/* ADD NEW TEXT */}
                        {type === 'noteTxt' && <textarea className="keeper-new-txt"
                            name="txt" rows="3"
                            onChange={this.handleChange} placeholder="add a new note"></textarea>}

                        {/* ADD NEW IMAGE */}
                        {type === 'noteImg' && <input type="text" name="url" className="keeper-new-img"
                            onChange={this.handleChange} placeholder="add image link" />}

                        {/* ADD NEW VIDEO */}
                        {type === 'noteVid' && <input type="text" name="url" className="keeper-new-img"
                            onChange={this.handleChange} placeholder="add a video link, make sure its embeded and not watch in the url" />}

                        {/* ADD NEW TODOS */}
                        {type === 'noteTodos' && <NoteTodos onAddNewList={this.onAddNewList} />}

                        {/* ADD NEW NOTE BUTTON */}
                        {type !== 'noteTodos' && <button className="keeper-submit-btn" type="submit" onClick={this.onAddNote}>Add Note</button>}
                    </React.Fragment>}

                </div>

                {/* KEEPER ADD INPUTS BUTTONS*/}
                <div className="keeper-btn-inputs">
                    {/* NEW TEXT BUTTON */}
                    <button type="button" className="keeper-txt-btn material-icons"
                        onClick={() => {
                            this.setInputType('noteTxt')
                        }}
                        title="add text">text_format</button>

                    {/* NEW IMAGE BUTTON */}
                    <button type="button" className="keeper-img-btn material-icons"
                        onClick={() => { this.setInputType('noteImg') }}
                        title="add image material-icons">photo</button>

                    {/* NEW TODOS BUTTON */}
                    <button type="button" title=" Add-List" className="keeper-list-btn material-icons"
                        onClick={() => { this.setInputType('noteTodos'); }}
                        title="add list">list
                    </button>

                    {/* NEW VIDEO BUTTON */}
                    <button type="button" className="keeper-vid-btn material-icons"
                        onClick={() => { this.setInputType('noteVid') }}
                        title="add video">slideshow
                        </button>

                    {/* PIN NEW NOTE */}
                    {!note.isPinned && <button type="button" className="new-note-pin unpinned material-icons" onClick={() => this.setNewNoteState('isPinned', true)}>push_pin</button>}
                    {note.isPinned && <button type="button" className="new-note-pin pinned material-icons" onClick={() => this.setNewNoteState('isPinned', false)}>push_pin</button>}

                    {/* SET COLOR BUTTON */}
                    <NoteColor setBackgroundColor={this.setBackgroundColor} />

                </div>
            </form>

            {/* DISPLAY NOTES */}
            <main className="keeper-notes-container">
                <NoteList notes={notes}
                    setNewNoteState={this.setNewNoteState}
                    onRemoveNote={this.onRemoveNote}
                    onPinNote={this.onPinNote} />
            </main>
        </section >
        )
    }
}

