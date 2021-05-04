
import {NoteList} from './NoteList.jsx'
import {noteService} from '../services/keep.service.js'

export class KeepApp extends React.Component {
    state = {
        notes: null,
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
        
        

        render (){
            const {notes} = this.state
            console.log(notes);
            if (!notes) return <div>Loading...</div>
        return(<section className="keeper-container">

            <header className="keeper-header">
                {/* TODO: add searce note cmp */}
            </header>
            <div className="keeper-new-note">
                {/* TODO: let the user add new note, make links to notes diffrent cmps */}
            </div>

            <main className="keeper-notes-container">
                {/* TODO: add saved notes to show, show pinned notes first */}
                <NoteList notes={notes}/>
            </main>
        </section>
        )
    }
}

