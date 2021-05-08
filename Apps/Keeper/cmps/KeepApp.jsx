
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
            title: '',
            txt: '',
            url: '',
            todos: '',
            backgroundColor: 'white',
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
        const { notes, visible, note, activeNote } = this.state
        const { type } = this.state.note
        const noteStyle = {
            backgroundColor: note.backgroundColor
        }
        if (!notes) return <div>Loading...</div>

        return (<section className="keeper-container">

            <header className="keeper-header">
                {/* TODO: add filter note cmp */}
            </header>

            {/* ////TODO: move input to component\\\\ */}
            {/* ----- NEW NOTES INPUT ----- */}
            <form className="keeper-new-note" style={noteStyle}>

                <div className="keeper-input-container">

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
                            name="txt" id=""
                            onChange={this.handleChange} placeholder="add a new note"></textarea>}

                        {/* ADD NEW IMAGE */}
                        {type === 'noteImg' && <input type="text" name="url" className="keeper-new-img"
                            onChange={this.handleChange} placeholder="add image link" />}

                        {/* ADD NEW VIDEO */}
                        {type === 'noteVid' && <input type="text" name="url" className="keeper-new-img"
                            onChange={this.handleChange} placeholder="add video link" />}

                        {/* ADD NEW TODOS */}
                        {type === 'noteTodos' && <NoteTodos onAddNewList={this.onAddNewList} />}
                        {type !== 'noteTodos' && <button classame="keeper-submit-note" type="submit" onClick={this.onAddNote}>Add Note</button>}

                    </React.Fragment>}

                </div>

                {/* KEEPER ADD INPUTS BUTTONS*/}
                <div className="keeper-btn-inputs">
                    <button type="button" className="keeper-txt-btn material-icons"
                        onClick={() => {
                            this.setInputType('noteTxt')
                        }}
                        title="add text">text_format</button>

                    <button type="button" className="keeper-img-btn material-icons"
                        onClick={() => { this.setInputType('noteImg') }}
                        title="add image material-icons">photo</button>

                    <button type="button" title=" Add-List" className="keeper-list-btn material-icons"
                        onClick={() => { this.setInputType('noteTodos'); }}
                        title="add list">list
                    </button>

                    <button type="button" className="keeper-vid-btn material-icons"
                        onClick={() => { this.setInputType('noteVid') }}
                        title="add video">slideshow
                        </button>

                    <input type="color" name="backgroundColor" className="keeper-new-img" onChange={this.handleChange} />

                    {/* PIN NEW NOTE */}
                    {!note.isPinned && <button type="button" className="new-note-pin unpinned material-icons" onClick={() => this.setNewNoteState('isPinned', true)}>push_pin</button>}
                    {note.isPinned && <button type="button" className="new-note-pin unpinned material-icons" onClick={() => this.setNewNoteState('isPinned', false)}>push_pin</button>}

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

