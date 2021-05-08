

export class NoteColor extends React.Component {
    state = {
        isColorBoxOpen: false,
        color: this.props.backgroundColor
    }

    onPaletteClick = () => {
        if (this.isColorBoxOpen) this.setState({
            isColorBoxOpen: false,
        })
        else this.setState({
            isColorBoxOpen: true,
        })
    }

    onColorChange = (color) => {
        this.props.setBackgroundColor(color)
        this.setState({
            isColorBoxOpen: false,
        })
    }

    render() {
        const { isColorBoxOpen, color } = this.state;

        return (
            <React.Fragment>
                <button type="button" title="Change note color" onClick={this.onPaletteClick} className="note-color-btn material-icons">palette</button>
                {isColorBoxOpen && <div className="note-color-box">
                    <div onClick={() => this.onColorChange('default')} className="color-circle default"></div>
                    <div onClick={() => this.onColorChange('red')} className="color-circle red"></div>
                    <div onClick={() => this.onColorChange('orange')} className="color-circle orange"></div>
                    <div onClick={() => this.onColorChange('yellow')} className="color-circle yellow"></div>
                    <div onClick={() => this.onColorChange('green')} className="color-circle green"></div>
                    <div onClick={() => this.onColorChange('blue')} className="color-circle blue"></div>
                    <div onClick={() => this.onColorChange('purple')} className="color-circle purple"></div>
                    <div onClick={() => this.onColorChange('brown')} className="color-circle brown"></div>
                    <div onClick={() => this.onColorChange('gray')} className="color-circle gray"></div>
                </div>}
            </React.Fragment>
        )
    }

}