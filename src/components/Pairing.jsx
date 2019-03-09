const Pairing = (props) => {
    return (
        <Row  style={{marginBottom: 10, maxWidth: 420, minWidth: 420, backgroundColor: '#BFD3F6'}}>
            <Col xs={8}>
                {props.players.map(player => <PlayerCard key={uuid.v4()} {...player} />)}
            </Col >
            <Col xs={4} style={{marginTop: 5, fontWeight: 'bold', fontSize: 14, color: 'black', textAlign: 'center', alignContent: 'center', vAlign: 'center'}}>
                HC: {props.hc}
            </Col>
        </Row>
    );
}

