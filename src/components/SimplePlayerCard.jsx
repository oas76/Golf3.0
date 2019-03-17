class SimplePlayerCard extends React.Component  {

    state = {   name: this.props.name,
                total: _.reduce(this.props.points, function(z,y){return z + y.points;},0),
                id: this.props.uuid,
                value: 0
    };

    upstateValues = (event) => {
        let id = this.state.id;
        let val = event.target.value;
        this.setState({value: val})
        this.props.updatefunc(id,val);
        event.stopPropagation();
    }

    render() {
        return (
            <div>
                <Row style={{margin: 1 }}>
                    <Col xs={1}>
                        <Image src={this.props.avatar} width='25px' height='25px' roundedCircle/>
                    </Col>
                    <Col xs={4} style={{display: 'inline-block', margin: 5}}>
                        <div style={{fontWeight: 'bold', fontSize: 14}}>
                            {this.state.name}
                        </div>
                    </Col>
                    <Col xs={3}>
                        <div style={{fontSize: 10 }}>
                            total: {this.state.total }
                        </div>
                    </Col>
                    <Col xs={3}>
                        <div style={{fontSize: 10 }}>
                            <InputGroup size="sm" className="mb-3">
                                <FormControl id="playerpoints" pattern='^[0-9]?[0-9](\.5)?$' type="number" maxLength="4"
                                             min="0" max="50" step="0.5"
                                             onChange={this.upstateValues} aria-label="hc"
                                             aria-describedby="inputGroup-sizing-sm"
                                             value={this.state.value} />
                            </InputGroup>
                        </div>
                    </Col>
                </Row>
            </div>

        );
    }
}
