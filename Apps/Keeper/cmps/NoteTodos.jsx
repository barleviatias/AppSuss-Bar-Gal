
// import { NoteAddTodo } from './NoteMap.jsx'
import { noteService } from '../services/keep.service.js'


export class NoteTodos extends React.Component {

    state = {
        todos: [],
        txt: null,
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState(prevState => ({
            ...prevState,
            [field]: value

        }))
    }

    
    onAddTodo = () => {
        event.preventDefault();
        const { txt, todos } = this.state
        const newTodos = noteService.addTodo(txt, todos)
        this.setState({
            todos: newTodos,
            txt: null
        })
    }


    onRemoveTodo = (todos, idx) => {
        event.preventDefault();
        const newTodos = noteService.removeTodo(todos, idx)
        this.setState({ todos: newTodos })
    }


    render() {
        const { todos } = this.state
        if (!todos) return <React.Fragment>
            <ul className="keeper-new-todos">
                <li><input type="text" name="txt" placeholder="add a new list" onChange={this.handleChange} /></li>
                <button className="todo-add-btn material-icons" type="button" onClick={this.addTodo} onClick={this.onAddTodo} >add</button>
            </ul>
            <button className="keeper-submit-btn" type="button" onClick={() => {
                this.onAddTodo();
                this.props.onAddNewList(todos);
            }}>Add Note</button>
        </React.Fragment>
        return <React.Fragment>
            <ul className="keeper-new-todos">
                {todos.map((todo, idx) => {
                    return <li  className="note-todo" key={idx}><p>{todo}</p> <button type="button" onClick={() => this.onRemoveTodo(todos, idx)}>X</button></li>
                })}
                <li><input type="text" name="txt" placeholder="add a new list" onChange={this.handleChange} input=""/></li>
                <button type="button" className="todo-add-btn material-icons" onClick={this.onAddTodo}>add</button>

            </ul>
            <button className="keeper-submit-btn" type="button" onClick={() => {
                this.onAddTodo();
                this.props.onAddNewList(todos);
            }}>Add Note</button>
        </React.Fragment>
    }
}