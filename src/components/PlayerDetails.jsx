
class PlayerDetails extends React.Component {

    state = {
              player: this.props.data,
              nameOk: true,
              hcOk: true,
              totalPoints: _.reduce(this.props.data.points, function(z,y){return z + y.points;},0),
              golfPoints: _.reduce(_.filter(this.props.data.points,function(x){return x.game =='Golf';}), function(z,y){return z + y.points;},0),
              pokerPoints: _.reduce(_.filter(this.props.data.points,function(x){return x.game =='Poker';}), function(z,y){return z + y.points;},0),
              otherPoints: _.reduce(_.filter(this.props.data.points,function(x){return x.game =='Other';}), function(z,y){return z + y.points;},0)
    };

    name_reg = new RegExp('^[a-øA-Ø]{1,20}$');
    hc_reg = new RegExp('^([1-3])?[0-9]\.[0-9]?$');

    noAction = (event) => {
        event.stopPropagation();
        console.log('Nothing');
    }

    updateEntry = async (event) => {
        let newname = document.getElementById('playername').value;
        let newhc = document.getElementById('playerhc').value;
        const resp = await axios.post(`${WEB_DOMAIN}/player?uuid=${this.state.player.uuid}&name=${newname}&hc=${newhc}`);
        console.log(resp);
        this.props.toggleFunc(event) ;
    }

    componentDidMount = async () => {
        const resp = await axios.get(`${WEB_DOMAIN}/player?uuid=${this.state.player.uuid}`);
        console.log(resp.data);
        this.setState (
            {player: resp.data,
            totalPoints: _.reduce(resp.data.points, function(z,y){return z + y.points;},0),
            golfPoints: _.reduce(_.filter(resp.data.points,function(x){return x.game =='Golf';}), function(z,y){return z + y.points;},0),
            pokerPoints: _.reduce(_.filter(resp.data.points,function(x){return x.game =='Poker';}), function(z,y){return z + y.points;},0),
            otherPoints: _.reduce(_.filter(resp.data.points,function(x){return x.game =='Other';}), function(z,y){return z + y.points;},0)
            });
    }

    verifyValue = (event) => {

        event.stopPropagation();
        console.log(event.target.id);
        switch (event.target.id) {

            case 'playername': {
                if (this.name_reg.test(event.target.value))
                    {this.setState(() => { return { nameOk: true }} );}
                else
                    {this.setState(() => { return { nameOk: false }} );}
                break;
            }
            case 'playerhc': {
                if (this.hc_reg.test(event.target.value) && Number(event.target.value) <= 36)
                    {this.setState(() => { return { hcOk: true }} );}
                else
                    {this.setState(() => { return { hcOk: false }} );}
                break;
            }
        }
    }

    render() {
        return (

            <Modal onClick={this.noAction} showCloseButton={false}>
                <Modal.Header>
                    <Container>
                        <Row>
                            <Col xs={4}>
                                <Image src={this.state.player.avatar} width='75px' height='75px' roundedCircle/>
                            </Col>
                            <Col xs={4} style={{fontWeight: 'bold', fontSize: 18, vAlign: 'center', textAlign: 'center'}}>
                                {this.state.player.name}
                            </Col>
                            <Col xs={4} style={{fontSize: 14, vAlign: 'center', textAlign: 'left'}}>
                                Golf: {this.state.golfPoints} <br/>
                                Poker: {this.state.pokerPoints} <br/>
                                Other: {this.state.otherPoints} <br/>
                                <b size="16">Total: {this.state.totalPoints}</b>
                            </Col>

                        </Row>
                    </Container>
                </Modal.Header>
                <Modal.Body padding>
                    <Row>
                        <Col>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-sm">Name</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl id="playername" pattern='^[a-øA-Ø]{1,10}$' type="text" maxLength="10"
                                             defaultValue={this.state.player.name} aria-label="name"
                                             aria-describedby="inputGroup-sizing-sm" onChange={this.verifyValue}/>
                            </InputGroup>
                            <InputGroup size="sm" className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-sm">HC</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl id="playerhc" pattern='^([1-3])?[0-9]\.[0-9]?$' type="number" maxLength="4"
                                             min="-4" max="36" step="0.1" defaultValue={this.state.player.hc}
                                             onChange={this.verifyValue} aria-label="hc"
                                             aria-describedby="inputGroup-sizing-sm"/>
                            </InputGroup>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <ModalButton
                        btnStyle="primary"
                        disabled={!(this.state.hcOk && this.state.nameOk)}
                        onClick={this.updateEntry}>
                        Done
                    </ModalButton>
                </Modal.Footer>
            </Modal>
        );
    }

}