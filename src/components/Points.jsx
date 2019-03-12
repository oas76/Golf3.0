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
        let re = new RegExp('^[0-9]?[0-9](\.5)?$');
        if(re.test(val))
            this.setState(() => { this.state.playerPoints[id] = val });
    }

    savePoints = async (event) => {
        let points, val ;
        for(points in this.state.playerPoints){
            if(points){
                const resp = axios.post(`${WEB_DOMAIN}/points?gametype=${this.state.gameType}&uuid=${points}&value=${this.state.playerPoints[points]}`)
            }
        }
        event.stopPropagation();
        this.props.show()
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
                        onClick={this.savePoints}
                        >
                        Save
                    </ModalButton>
                 </Modal.Footer>
            </Modal >
        );
    }

}