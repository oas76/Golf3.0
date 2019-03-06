
class PlayerDetails extends React.Component {

    state = { player: [] };

    render() {
        return (
            < Container style={{margin: 5, minWidth: 320, maxWidth: 320}}>
                <div>
                    {this.state.player}
                </div>
            </Container>
        );
    }

}