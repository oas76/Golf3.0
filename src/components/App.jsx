

class App extends React.Component {

    state = { pairings: [] };

    setNewPairings = (newdata) => {
        console.log(newdata);
        this.setState({pairings: newdata});
    }

    requestPairings = async (event) => {
        const resp = await axios.get(`${WEB_DOMAIN}/randomize?teamsize=${event.target.value}`);
        this.setNewPairings(resp.data.pairings)
    }

    componentDidMount = async () => {
        const resp = await axios.get(`${WEB_DOMAIN}/result`);
        this.setNewPairings(resp.data.pairings)

    }

    render() {
        return (
            < Container style={{margin: 5, minWidth: 320, maxWidth: 320}}>
                <StartForm onSubmit={this.requestPairings}/>
                <PairingsList pairings={this.state.pairings} />
            </Container>
        );
    }

}

