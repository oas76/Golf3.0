const Pairing = (props) => {
    return (
        <Row  style={{marginBottom: 10, maxWidth: 345, minWidth: 345, backgroundColor: '#BFD3F6'}}>
            <Col xs={9}>
                {props.players.map(player => <PlayerCard key={uuid.v4()} {...player} />)}
            </Col >
            <Col xs={3} style={{marginTop: 5, fontWeight: 'bold', fontSize: 14, color: 'black', textAlign: 'center', alignContent: 'center', vAlign: 'center'}}>
                HC: {props.hc}
            </Col>
        </Row>
    );
}

