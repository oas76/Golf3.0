
const TeamSizeSelector = (props) => {
    return (
        <ButtonToolbar style={{margin: 10, width:300}} onClick={props.onClickHandler} className="mb-3" aria-label="Team Size">
            <ButtonGroup className="mr-2" aria-label="First group">
                <Button value='1' onClick={props.onClickHandler} variant="secondary">1</Button>
                <Button value='2' onClick={props.onClickHandler} variant="secondary">2</Button>
                <Button value='3' onClick={props.onClickHandler} variant="secondary">3</Button>
                <Button value='4' onClick={props.onClickHandler} variant="secondary">4</Button>
            </ButtonGroup>
        </ButtonToolbar>
    )
}

class StartForm extends React.Component {

    state = {pairingSize: '1'};

    handleInput = async (event) => {
        event.preventDefault();
        this.setState({pairingSize: event.target.value})
        const resp = await axios.get(`http://127.0.0.1:5000/randomize?teamsize=${event.target.value}`);
        this.props.onSubmit(resp.data)
    }

    render () {
        return (
            <Row>
                <TeamSizeSelector onClickHandler={this.handleInput} />
            </Row>
        );
    }
}
