class Pairing extends React.Component {

    state = {hc: this.props.hc,
             strokes: Math.round((((Number(this.props.hc) * this.props.settings.slope_value) / 113) * 100) / 100) };

    render() {
        return (
            <Row style={{marginBottom: 10, maxWidth: 345, minWidth: 345, backgroundColor: '#BFD3F6'}}>
                <Col xs={9}>
                    {this.props.players.map(player => <PlayerCard key={uuid.v4()} {...player} />)}
                </Col>
                <Col xs={3} style={{
                    marginTop: 5,
                    fontWeight: 'bold',
                    fontSize: 10,
                    color: 'black',
                    textAlign: 'center',
                    alignContent: 'center',
                    vAlign: 'center'
                }}>
                    HC: {this.props.hc}<br/>
                    Strokes: {this.state.strokes}
                </Col>
            </Row>
        );
    }
}


