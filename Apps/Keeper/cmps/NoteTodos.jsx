export function NoteTodos ({note, key}){
    return (
        <div className={key}>
            <h1>{note.title}</h1>
            <p>{note.txt}</p>
            {note.img && <img src={note.url} alt=""/>}
            <button>Close</button>
        </div>
    )
}