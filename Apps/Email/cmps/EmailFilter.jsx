export class EmailFilter extends React.Component {
    
    state = {
        filterBy: {
            keyword: '',
            maxPriceRange: 200,
        }
    }

    handleChange = (ev) =>{
        const field = ev.target.name
        const value = ev.target.type === 'range' ? +ev.target.value : ev.target.value
        this.setState({ filterBy: { ...this.state.filterBy, [field]: value }})
    }

    onFilter = (ev) => {
        ev.preventDefault()
        const {filterBy} = this.state
        console.log(this.props);
        this.props.onSetFilter(filterBy)
    }

    render() {
        const { keyword, maxPriceRange } = this.state.filterBy
        return (
            <form className="email-filter" onSubmit={this.onFilter}>
                <label htmlFor="byName">search</label>
                <input type="text" id="byName" placeholder="search" name="keyword" value={keyword} onChange={this.handleChange} />
                {/* <label htmlFor="byPriceRange">Price range</label>
                <input type="range" id="byPriceRange" name="maxPriceRange" min={10} max={200} value={maxPriceRange} onChange={this.handleChange}/>
                <span>{`10 - ${maxPriceRange}`}</span> */}
                <button>Apply Changes</button>
            </form>
        )
    }
}