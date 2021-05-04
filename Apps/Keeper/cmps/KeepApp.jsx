
import {NoteList} from './NoteList.jsx'
import {noteService} from '../services/keep.service.js'

export class KeepApp extends React.Component {
    state = {
        notes: null,
        visible: false,
        note: {
            type: "NoteText",
            isPinned: false,
            title: null,
            txt: null
        }
    }

    componentDidMount() {
        this.loadNotes()
    }
    
    loadNotes = () => {
        noteService.query()
        .then(notes => {
            this.setState({ notes })
        })
        
    }
    
    
    onAddNote = (ev) => {
        ev.preventDefault();
        console.log(ev);
        }

        handleClick=()=>{
            this.setState({visible: true})
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
        
        render (){
            const {notes} = this.state
            if (!notes) return <div>Loading...</div>
            this.state
        return(<section className="keeper-container">

            <header className="keeper-header">
                {/* TODO: add searce note cmp */}
            </header>
            <form className="keeper-new-note" onSubmit={this.onAddNote}>
                <input type="text" name="title" className="keeper-new-title" onClick={this.handleClick} placeholder="Write a note"/>
                {this.state.visible && <textarea className="keeper-new-txt" name="txt" id="" cols="30" rows="3" onClick={this.handleChange} visible={this.state.visible}></textarea>}
                <div className="keeper-new-extra">
                {/* <button>Image</button>
                <button>List</button>
                <button>Audio</button> */}
                {/* <button>Add Note</button> */}
                </div>
                {/* TODO: let the user add new note, make links to notes diffrent cmps */}
            </form>

            <main className="keeper-notes-container">
                {/* TODO: add saved notes to show, show pinned notes first */}
                <NoteList notes={notes}/>
            </main>
        </section>
        )
    }
}

