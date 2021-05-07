
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
        if (!todos) return <ul>
            <li><input type="text" name="txt" placeholder="add new note" onChange={this.handleChange} /></li>
            <button type="button" onClick={this.addTodo} onClick={this.onAddTodo}></button>
            <button classame="keeper-submit-note" type="button" onClick={() => {
                this.onAddTodo();
                this.props.onAddNewList(todos);
                }}>Add Note</button>
        </ul>
        return (
            <ul>
                {todos.map((todo, idx) => {
                    return <li key={idx}>{todo} <button type="button" onClick={() => this.onRemoveTodo(todos, idx)}>X</button></li>
                })}
                <li><input type="text" name="txt" placeholder="add new note" onChange={this.handleChange} /></li>
                <button type="button" onClick={this.onAddTodo}>New Todo</button>
                <button classame="keeper-submit-note" type="button" onClick={() =>{ 
                    this.onAddTodo();
                    this.props.onAddNewList(todos);
                    }}>Add Note</button>

            </ul>
        )
    }
}