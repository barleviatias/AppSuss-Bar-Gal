
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
        console.log(value);
    }

    onAddTodo = () => {
        event.preventDefault();
        const { txt, todos } = this.state
        const newTodos = noteService.addTodo(txt, todos)
        this.setState({todos: newTodos})
    }
    
    onRemoveTodo = (todos, idx) => {
        event.preventDefault();
        const newTodos = noteService.removeTodo(todos, idx)
        this.setState({todos: newTodos})
        console.log('remove todo');
    }




    render() {
        const { todos, txt } = this.state
        if (!todos) return <ul>
            <li><input type="text" name="txt" placeholder="add new note" onChange={this.handleChange} /></li>
            <button type="button" onClick={this.addTodo} onClick={this.onAddTodo}></button>
        </ul>
        return (
            <ul>
                {todos.map((todo, idx) => {
                    return <li key={idx}>{todo} <button type="button" onClick={() => this.onRemoveTodo(todos, idx)}>X</button></li>
                })}
                <li><input type="text" name="txt" placeholder="add new note" onChange={this.handleChange} /></li>
                <button type="button" onClick={this.onAddTodo}>New Todo</button>
            </ul>
        )
    }
}