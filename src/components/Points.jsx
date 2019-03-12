class Points extends React.Component {

    state = {players: this.props.players,
             gameType: 'Golf',
             playerPoints: {} };

    setGameTypeGolf = (event) => {
        this.setState({gameType: 'Golf'})
    }

    setGameTypePoker = (event) => {
        this.setState({gameType: 'Poker'})
    }

    setGameTypeOther = (event) => {
        this.setState({gameType: 'Other'})
    }

    updatePoints = (id,val) => {
        console.log(id, val);
        this.setState(() => { this.state.playerPoints[id] = val });
    }


    render() {
        return(
            <Modal onClose={this.props.show}>
                <Modal.Header>
                    <Container>
                        <Row>
                        <Col>
                            <DropdownButton id="dropdown-basic-button" title="Add Point for ...">
                                <Dropdown.Item onSelect={this.setGameTypeGolf} id="Golf">Golf</Dropdown.Item>
                                <Dropdown.Item onSelect={this.setGameTypePoker} id="Poker">Poker</Dropdown.Item>
                                <Dropdown.Item onSelect={this.setGameTypeOther} id="Other">Other</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                        <Col>
                            <Button disabeled='true' variant="outline-primary">{this.state.gameType}</Button>
                        </Col>
                        </Row>
                    </Container>
                </Modal.Header>
                <Modal.Body padding>
                    <Container>
                        { this.props.players.map (player => <SimplePlayerCard updatefunc={this.updatePoints} key={uuid.v4()} {...player}/>) }
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ModalButton
                        btnStyle="primary"
                        >
                        Save
                    </ModalButton>
                 </Modal.Footer>
            </Modal >
        );
    }

}