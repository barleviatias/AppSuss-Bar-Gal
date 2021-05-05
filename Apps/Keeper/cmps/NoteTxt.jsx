
export function NoteCard({ note}) {
    const {title, txt, url, todos} = note.info
    return (
        <div className={note.id}>
            <h1>{title}</h1>
            <p>{txt}</p>
            {url && <img src={url} alt={title}/>}
            {note.isAddList && 
            <ul> {todos.map((todo, idx)=>{
                return <li key={idx}>{todo.txt} <span>{todo.doneAt}</span> </li>
            })}
            </ul>
            }
            <button>remove</button>
        </div>
    )
}