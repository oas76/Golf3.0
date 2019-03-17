
class PlayerCard extends React.Component  {

    state = {   name: this.props.name,
                hc: this.props.hc,
                total: _.reduce(this.props.points, function(z,y){return z + y.points;},0),
                openModal: false
    };

    handleClick = (event) => {
        this.toggleModal()
    };

    toggleModal = () => {
        if(this.state.openModal){
            let newname = document.getElementById('playername').value;
            let newhc = document.getElementById('playerhc').value;
            this.setState({name: newname});
            this.setState({hc: newhc});
        }
        this.setState({ openModal: !this.state.openModal });
    }

    render() {
        return (
            <div onClick={this.handleClick}>
            <Row style={{margin: 5 }}>
                <Image src={this.props.avatar} width='50px' height='50px' roundedCircle/>
                <Col style={{display: 'inline-block', margin: 5}}>
                    <div style={{fontWeight: 'bold', fontSize: 14}}>
                        {this.state.name}
                    </div>
                    <div style={{fontSize: 10 }}>
                        PlayerHC: {this.state.hc}
                    </div>
                    <div style={{fontSize: 10 }}>
                        Points: {this.state.total }
                    </div>
                </Col>
            </Row>
            {this.state.openModal && (
                <PlayerDetails data={this.props} toggleFunc={this.handleClick}/> )}
            </div>

        );
    }
}


