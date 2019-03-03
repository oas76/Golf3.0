const PlayerCard = (props) => {
    return (
        <Row style={{margin: 5 }}>
            <Image src={props.avatar} width='50px' height='50px' roundedCircle/>
            <Col style={{display: 'inline-block', margin: 10}}>
                <div style={{fontWeight: 'bold', fontSize: 14}}>
                    {props.name}
                </div>
                <div style={{fontSize: 8 }}>
                    {props.hc}
                </div>
            </Col>
        </Row>
    );
}

