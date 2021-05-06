
import { NoteList } from './NoteList.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { noteService } from '../services/keep.service.js'

export class KeepApp extends React.Component {
    state = {
        notes: null,
        visible: false,
        isAddList: false,
        note: {
            type: null,
            isPinned: false,
            isAddList: false,
            title: '',
            // txt: '',
            // url: '',
            // todos: null
        }
    }

    componentDidMount() {
        this.loadNotes()
        // console.log(this.state);
    }

    loadNotes = () => {
        noteService.query()
            .then(notes => {
                this.setState({ notes })
            })
    }

    pinNote = () => {
        console.log('pinning');
    }

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
                        isAddList: false,
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


    setInputType(type) {
        this.setState({
            visible: true,
            note: { type, }
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
        const { notes, visible } = this.state
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

                {visible && <React.Fragment>
                    <textarea className="keeper-new-txt"
                        name="txt" id="" cols="30" rows="3"
                        onChange={this.handleChange}></textarea>

                    {/* ADD NEW IMAGE */}
                    {type === 'noteImg' && <input type="image" name="noteImg" className="keeper-new-img"
                        onChange={this.handleChange} placeholder="add image link" />}

                    {/* ADD NEW TODOS */}
                    {type === 'noteTodos' && <NoteTodos />}

                    {/* ADD NEW VIDEO */}
                    {type === 'noteVid' && <input placeholder="add video link" />}

                    {/* ADD NEW AUDIO */}
                    {type === 'noteAud' && <input placeholder="add audio link" />}
                    {/* {type === 'noteList' && <input  placeholder="add List"/> } */}

                    <button classame="keeper-submit-note" onClick={this.onAddNote}>Add Note</button>N
                </React.Fragment>}

                <div className="keeper-btn-inputs">
                    <button className="keeper-img-btn"
                        onClick={() => this.setInputType('noteImg')}>
                        Image</button>
                    <button className="keeper-list-btn"
                        onClick={() => this.setInputType('noteList')}>
                        List</button>
                    <button className="keeper-vid-btn"
                        onClick={() => this.setInputType('noteVid')}>
                        Video</button>
                    <button className="keeper-aud-btn"
                        onClick={() => this.setInputType('noteAud')}>
                        Audio</button>
                </div>
            </form>

            <main className="keeper-notes-container">
                <NoteList notes={notes}  
                onRemoveNote={this.onRemoveNote} pinNote={this.pinNote}/>
            </main>
        </section>
        )
    }
}

