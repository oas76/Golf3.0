
class PlayerCard extends React.Component  {

    state = { url: `${WEB_DOMAIN}/player?uuid=${this.props.uuid}` };

    render() {
        return (
            <a href= {this.state.url}>
            <Row style={{margin: 5 }}>
                <Image src={this.props.avatar} width='50px' height='50px' roundedCircle/>
                <Col style={{display: 'inline-block', margin: 10}}>
                    <div style={{fontWeight: 'bold', fontSize: 14}}>
                        {this.props.name}
                    </div>
                    <div style={{fontSize: 8 }}>
                        PlayerHC: {this.props.hc}
                    </div>
                    <div style={{fontSize: 8 }}>
                        Points: {this.props.total }
                    </div>
                </Col>
            </Row>
            </a>
    );
    }
}


