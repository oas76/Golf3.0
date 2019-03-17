
class AppFooter extends React.Component {

    state = { pointsModal: false };

    handleClick = (event) => {
        this.toggleModal()
    };

    toggleModal = () => {
        this.setState({ pointsModal: !this.state.pointsModal });
        this.props.update();
    }

    render () {
        return (
            <div>
            <Row>
                <ButtonToolbar style={{margin: 15, width:345}} className="lb-3" aria-label="Team Size">
                    <ButtonGroup style={{width:345, align: 'centre' }} className="lr-2" aria-label="First group">
                        <Button onClick={this.handleClick} value='AddPoints' variant="outline-secondary">Add Points</Button>
                        <Button onClick={this.handleSettings} value='Settings' variant="outline-secondary">Settings</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Row>
                {this.state.pointsModal && (
                    <Points show={this.toggleModal} players={this.props.players} /> )}
            </div>

        );
    }
}