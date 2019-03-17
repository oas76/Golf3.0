class Points extends React.Component {

    state = {
        players: this.props.players,
        gameType: 'Golf',
        playerPoints: {},
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
        let currVal = _find(this.state.playerPoints,function(x){return x['uuid'] == id;})
        if(!currVal)
            this.setState({ ...this.state.playerPoints,
                               [uuid: id, points: val ]}

        //this.updateInputState();
    }

    updateAggregatedState = () => {
        isReady: re.test(val) && _.reduce(_.filter(prevState.playerPoints, function (x) {
            return Object.keys(x)[0] != id
        }), function (x, y) {
            return (re.test(y) && x)
        }, true)

    }


    updateInputState = () => {
        let re = new RegExp('^[0-9]?[0-9](\.5)?$');
        let new_state = _.reduce(this.state.playerPoints, function (x, y) { console.log(re.test(y)); return (re.test(y) && x);}, true)
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
                        { this.props.players.map (player => <SimplePlayerCard updatefunc={this.updatePoints} key={uuid.v4()} {...player}/>) }
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