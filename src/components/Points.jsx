class Points extends React.Component {

    state = {
        players: this.props.players,
        gameType: 'Golf',
        playerPoints: [],
        notValid: false
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
            this.setState((prevState) => { return {playerPoints: [...prevState.playerPoints, {'uuid': id, 'points': val}]} },this.updateInputState);
        }
        else if(currVal && currVal.points != val){
            let new_list = _.filter(this.state.playerPoints,function(x){return x.uuid != id;});
            this.setState(() => { return { playerPoints: [ ...new_list, {'uuid': id, 'points': val }]} },this.updateInputState);
            }
        else
            console.log('No Change')

    }

    updateInputState = () => {
        let re = new RegExp('^[0-9]?[0-9](.5)?$');
        let new_state = _.reduce(this.state.playerPoints, function (x, y) { return ((re.test(y.points) && Number(y.points)>=0 && Number(y.points) <= 40) && x);}, true);
        console.log(new_state);
        this.setState(() => { return {notValid: !new_state }});
    }

    savePoints = async (event) => {
        event.stopPropagation();
        let parray = [];
        for (let points of this.state.playerPoints) {
            if (points) {
                parray = [...parray, points];
            }
        }
        if (parray.length > 0) {
            const resp = await axios.post(`${WEB_DOMAIN}/points?gametype=${this.state.gameType}`, parray);
        }
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
                        disabled={this.state.notValid}
                        >
                        Save
                    </ModalButton>
                 </Modal.Footer>
            </Modal >
        );
    }

}