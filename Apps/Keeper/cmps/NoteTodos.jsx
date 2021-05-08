
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
            <ul>
                <li><input type="text" name="txt" placeholder="add a new list" onChange={this.handleChange} /></li>
                <button type="button" onClick={this.addTodo} onClick={this.onAddTodo} ></button>
            </ul>
            <button classame="keeper-submit-note" type="button" onClick={() => {
                this.onAddTodo();
                this.props.onAddNewList(todos);
            }}>Add Note</button>
        </React.Fragment>
        return <React.Fragment>
            <ul>
                {todos.map((todo, idx) => {
                    return <li key={idx}>{todo} <button type="button" onClick={() => this.onRemoveTodo(todos, idx)}>X</button></li>
                })}
                <li><input type="text" name="txt" placeholder="add a new list" onChange={this.handleChange} input=""/></li>
                <button type="button" onClick={this.onAddTodo}>New Todo</button>

            </ul>
            <button classame="keeper-submit-note" type="button" onClick={() => {
                this.onAddTodo();
                this.props.onAddNewList(todos);
            }}>Add Note</button>
        </React.Fragment>
    }
}