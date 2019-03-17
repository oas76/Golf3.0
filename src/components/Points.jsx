class Points extends React.Component {

    state = {
        players: this.props.players,
        gameType: 'Golf',
        playerPoints: [],
        isReady: true
    };

    setGameTypeGolf = (event) => {
        this.setState({gameType: 'Golf'})
    }

    setGameTypePoker = (event) => {
        this.setState({gameType: 'Poker'})
    }

    setGameTypeOther = (event) => {
        this.setState({gameType: 'Other'})
    }

    updatePoints = (id, val) => {
        console.log(id, val);
        let currVal = _.find(this.state.playerPoints,function(x){return x['uuid'] == id;});
        if(!currVal && val > 0) {
            this.setState({playerPoints: [...this.state.playerPoints, {'uuid': id, 'points': val}]});
            this.updateInputState();
        }
        else if(currVal && currVal.points != val){
            let new_list = _.filter(this.state.playerPoints,function(x){return x.uuid != id;});
            this.setState({ playerPoints: [ ...new_list, {'uuid': id, 'points': val }] });
            this.updateInputState();
            }
        else
            console.log('No Change')
    }

    updateInputState = () => {
        let re = new RegExp('^[0-9]?[0-9](\.5)?$');
        let new_state = _.reduce(this.state.playerPoints, function (x, y) { return (re.test(y) && x);}, true)
        this.setState(() => { return {isReady: new_state }});
    }

    savePoints = async (event) => {
        let points;
        for (points in this.state.playerPoints) {
            if (points) {
                const resp = axios.post(`${WEB_DOMAIN}/points?gametype=${this.state.gameType}&uuid=${points}&value=${this.state.playerPoints[points]}`)
                console.log(resp)
            }
        }
        event.stopPropagation();
        this.props.show()
    }

    readPoints = (id) => {
        let res = _.find(this.state.playerPoints, function(x){return x.uuid == id;} );
        if(res)
            return res.points;
        else
            return 0;
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
                    <Container >
                        { this.props.players.map (player => <SimplePlayerCard readpoints={this.readPoints} updatefunc={this.updatePoints} key={uuid.v4()} {...player}/>) }
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ModalButton
                        btnStyle="primary"
                        onClick={this.savePoints}
                        disabled={ this.state.isReady ? false : true  }
                        >
                        Save
                    </ModalButton>
                 </Modal.Footer>
            </Modal >
        );
    }

}