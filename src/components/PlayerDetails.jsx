
class PlayerDetails extends React.Component {

    state = {
              player: this.props.data,
              nameOk: true,
              hcOk: true
            }

    name_reg = new RegExp('^[a-øA-Ø]{1,20}$');
    hc_reg = new RegExp('^([1-3])?[0-9]\.[0-9]?$');

    noAction = (event) => {
        event.stopPropagation()
        console.log('Nothing')
    }

    updateEntry = async (event) => {
        let newname = document.getElementById('playername').value;
        let newhc = document.getElementById('playerhc').value;
        const resp = await axios.post(`${WEB_DOMAIN}/player?uuid=${this.state.player.uuid}&name=${newname}&hc=${newhc}`);
        console.log(resp)
        this.props.toggleFunc(event) ;
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
                            <Col>
                                <Image src={this.state.player.avatar} width='75px' height='75px' roundedCircle/>
                            </Col>
                            <Col style={{fontWeight: 'bold', fontSize: 18, vAlign: 'center', textAlign: 'center'}}>
                                {this.state.player.name}
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
                                <FormControl id="playername" pattern='^[a-øA-Ø]{1,20}$' type="text" maxLength="20"
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