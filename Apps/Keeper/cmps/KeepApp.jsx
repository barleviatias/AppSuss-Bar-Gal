
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
            isList: false,
            title: '',
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

    // setIsList(bollean) {
    //     this.setState(prevState => ({
    //         note: {
    //             ...prevState.note,
    //             isList: bollean
    //         }
    //     }))
    //     console.log('pinned')
    // }

    onAddNote = (ev) => {
        ev.preventDefault();
        const { note } = this.state;
        noteService.addNote(note)
            .then(noteAded => {
                this.loadNotes;
                this.setState({
                    visible: false,
                    note: {
                        type: null,
                        isPinned: false,
                        isList: false,
                        title: '',
                        txt: '',
                        url: '',
                        todos: null,
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
        this.setState(prevState => ({
            note: {
                ...prevState.note,
                [field]: value
            }
        }))
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
                <input type="text" name="title" className="keeper-new-title"
                    onClick={() => this.setInputType('noteTxt')}
                    onChange={this.handleChange}
                    placeholder="Write a new note" />

                {visible && !note.isList && <React.Fragment>

                    <textarea className="keeper-new-txt"
                        name="txt" id="" cols="30" rows="3"
                        onChange={this.handleChange}></textarea>

                    {/* PIN NEW NOTE */}
                    {!note.isPinned && <button type="button" onClick={() => this.setNewNoteState('isPinned', true)}>Pin</button>}
                    {note.isPinned && <button type="button" onClick={() => this.setNewNoteState('isPinned', false)}>UnPin</button>}

                    {/* ADD NEW IMAGE */}
                    {type === 'noteImg' && <input type="text" name="url" className="keeper-new-img"
                        onChange={this.handleChange} placeholder="add image link" />}



                    {/* ADD NEW VIDEO */}
                    {type === 'noteVid' && <input placeholder="add video link" />}

                    {/* ADD NEW AUDIO */}
                    {type === 'noteAud' && <input placeholder="add audio link" />}
                    {/* {type === 'noteList' && <input  placeholder="add List"/> } */}

                    <button classame="keeper-submit-note" type="submit" onClick={this.onAddNote}>Add Note</button>
                </React.Fragment>}
                {/* ADD NEW TODOS */}
                {type === 'noteTodos' && note.isList && <NoteTodos note={note} onChange={this.handleChange} />}


                {/* KEEPER ADD INPUTS BUTTONS*/}
                <div className="keeper-btn-inputs">
                    <button type="button" className="keeper-img-btn"
                        onClick={() => {
                            this.setInputType('noteImg')
                            this.setNewNoteState('isList', false)
                        }}
                        title="add image">Image</button>

                    <button type="button" title=" Add-List" className="keeper-list-btn"
                        onClick={() => {
                            this.setInputType('noteTodos');
                            this.setNewNoteState('isList', true)
                        }}
                        title="add todo list">List
                    </button>

                    <button type="button" className="keeper-vid-btn"
                        onClick={() => {
                            this.setInputType('noteVid')
                            this.setNewNoteState('isList', false)
                        }}
                        title="add video">Video
                        </button>
                    <button type="button" className="keeper-aud-btn"
                        onClick={() => {
                            this.setInputType('noteAud')
                            this.setNewNoteState('isList', false)
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

