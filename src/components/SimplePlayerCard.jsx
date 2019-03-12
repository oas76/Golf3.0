class SimplePlayerCard extends React.Component  {

    state = {   name: this.props.name,
                total: this.props.total,
                id: this.props.uuid
    };

    upstateValues = (event) => {
        let id = this.state.id;
        let val = event.target.value;
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
                            <input onChange={this.upstateValues} pattern='^[0-9]?[0-9](\.5)?$'
                                   size='4' type='number' step='0.5' defaultValue='0'/>

                        </div>
                    </Col>
                </Row>
            </div>

        );
    }
}
