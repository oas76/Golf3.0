

class Randomizer extends React.Component {

    state = { pairings: [] };

    requestPairings = async (event) => {
        const resp = await axios.get(`${WEB_DOMAIN}/randomize?teamsize=${event.target.value}`);
        this.setState({pairings: resp.data.pairings});
    }

    componentDidMount = async () => {
        const resp = await axios.get(`${WEB_DOMAIN}/list`);
        this.setState({pairings: resp.data.pairings})

    }

    render() {
        return (
            < Container style={{margin: 'auto', minWidth: 375, maxWidth: 375}}>
                <StartForm onSubmit={this.requestPairings}/>
                <PairingsList pairings={this.state.pairings} />
            </Container>
        );
    }

}

