

class App extends React.Component {

    state = { pairings: [] };

    setNewPairings = (newdata) => {
        console.log(newdata);
        this.setState({pairings: newdata.pairings});
    }

    render() {
        return (
            < Container style={{margin: 5, minWidth: 320, maxWidth: 320}}>
                <StartForm onSubmit={this.setNewPairings}/>
                <PairingsList pairings={this.state.pairings} />
            </Container>
        );
    }

}

