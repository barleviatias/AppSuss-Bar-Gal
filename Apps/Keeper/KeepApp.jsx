
import {NotesList} from './cmps/NoteList.jsx'
import {keepService} from './services/keep.service.js'

export class Keep extends React.Component {
    state = {
        notes: null,

    }

    componentDidMount() {
        this.loadKeeps()
    }

    loadKeeps = () => {
        keepService.query()
            .then((notes => {
                this.setState({ notes })
            }))
    }



    render (){
        return(<section className="keeper-container">

            <header className="keeper-header">
                {/* TODO: add searce note cmp */}
            </header>
            <div className="keeper-new-note">
                {/* TODO: let the user add new note, make links to notes diffrent cmps */}
            </div>

            <main className="keeper-notes-container">
                {/* TODO: add saved notes to show, show pinned notes first */}
                <NotesList/>
            </main>
        </section>
        )
    }
}

