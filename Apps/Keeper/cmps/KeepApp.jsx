
import { NoteList } from './NoteList.jsx'
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
            txt: '',
            url: '',
            todos: null
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


    onAddNote = (ev) => {
        ev.preventDefault();
        const { type, isPinned, title, isAddList, txt, url, todo } = this.state.note;
        noteService.addNote(type, isPinned, isAddList, title, txt, url, todo)
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
                this.setState({visible: false})
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
                    <button className="keeper-submit-note" onClick={this.onAddNote}>Add Note</button>
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


                {/* TODO: let the user add new note, make links to notes cmps */}
            </form>

            <main className="keeper-notes-container">
                {/* TODO: add saved notes to show, show pinned notes first */}
                <NoteList notes={notes} handleChange={this.handleChange} onRemoveNote={this.onRemoveNote}
                 />
            </main>
        </section>
        )
    }
}

