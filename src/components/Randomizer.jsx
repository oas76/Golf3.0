

class Randomizer extends React.Component {

    state = { pairings: [],
              players: [] };

    requestPairings = async (event) => {
        const resp = await axios.get(`${WEB_DOMAIN}/randomize?teamsize=${event.target.value}`);
        this.setState({pairings: resp.data.pairings});
    }

    componentDidMount = () => {
        this.refreshPairing();
    }

    refreshPairing = async () => {
        const resp = await axios.get(`${WEB_DOMAIN}/list`);
        this.setState({pairings: resp.data.pairings});
        this.setState({players: _.map(resp.data.pairings,(pairing) => {return pairing.players[0]})});
    }

    render() {
        return (
            < Container style={{margin: 'auto', minWidth: 375, maxWidth: 375}}>
                <StartForm onSubmit={this.requestPairings}/>
                <PairingsList pairings={this.state.pairings} />
                <AppFooter update={this.refreshPairing} players={this.state.players} />
            </Container>
        );
    }

}

