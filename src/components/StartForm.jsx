class StartForm extends React.Component {

    state = {pairingSize: '1'};

    handleInput = async (event) => {
        event.preventDefault();
        const resp = await axios.get(`http://127.0.0.1:5000/randomize?teamsize=${this.state.pairingSize}`);
        this.props.onSubmit(resp.data)
    }

    render () {
        return (
            <form onSubmit={this.handleInput}>
                <input
                    type="text"
                    value={this.state.pairingSize}
                    onChange={event => this.setState({pairingSize: event.target.value })}
                    placeholder="Team Size"
                    required />
                <button>Randomize</button>
            </form>
        );
    }
}
