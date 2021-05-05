export function NoteTxt (handleChange){
    return (
        <React.Fragment>
        <textarea className="keeper-new-txt" name="txt" id="" cols="30" rows="3" onClick={handleChange}></textarea>
        <button className="submit"></button>
        </React.Fragment>
    )
}