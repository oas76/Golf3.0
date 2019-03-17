
class AppFooter extends React.Component {

    state = { pointsModal: false,
              settingsModal: false };

    handleClick = (event) => {
        this.toggleModal();
    }

    handleSettings = (event) => {
        this.toggleSettings();
    }

    toggleModal = () => {
        this.setState({ pointsModal: !this.state.pointsModal });
        this.props.update();
    }

    toggleSettings = () => {
        this.setState({ settingsModal: !this.state.settingsModal });
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
                {this.state.settingsModal && (
                    <Settings settings={this.props.settings} show={this.toggleSettings}  /> )}
            </div>

        );
    }
}