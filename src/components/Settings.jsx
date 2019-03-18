class Settings extends React.Component {

    state = {
        slope: this.props.settings.slope_value,
        disableUpdate: false
    }

    saveSettings = async (event) => {
        event.stopPropagation();
        const resp = await axios.post(`${WEB_DOMAIN}/settings/slopevalue?slope=${this.state.slope}`);
        console.log(resp);
        this.props.show();
    }

    updateSlope = (event) => {
        let val = event.target.value;
        let re = new RegExp('^[1,5-9]?[0-9][0-9]?$');
        if (re.test(val) && Number(val) >= 55 && Number(val) <= 155 && val != this.state.slope) {
            this.setState({disableUpdate: false});
            this.setState({slope: val});
        }
        else{
            this.setState({disableUpdate: true});
        }
    }

    render() {
        return(
            <Modal onClose={this.props.show}>
                <Modal.Header>
                </Modal.Header>
                <Modal.Body padding>
                    <Container >
                        <Col>
                            <div style={{fontSize: 10 }}>
                                <InputGroup size="sm" className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroup-sizing-sm">Slope Value</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="slopevalue" pattern='^[1,5-9]?[0-9][0-9]?$' type="number" maxLength="3"
                                                 min="55" max="155" step="1"
                                                 aria-label="slope"
                                                 onChange={this.updateSlope}
                                                 aria-describedby="inputGroup-sizing-sm"
                                                 defaultValue={this.state.slope} />
                                </InputGroup>
                            </div>
                        </Col>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ModalButton
                        btnStyle="primary"
                        onClick={this.saveSettings}
                        disabled={this.state.disableUpdate}
                    >
                        Save
                    </ModalButton>
                </Modal.Footer>
            </Modal >
        );
    }

}