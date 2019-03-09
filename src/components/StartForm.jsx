
const TeamSizeSelector = (props) => {
    return (
        <ButtonToolbar style={{margin: 15, width:300}} onClick={props.onClickHandler} className="lb-3" aria-label="Team Size">
            <ButtonGroup style={{width:300, align: 'centre' }} className="lr-2" aria-label="First group">
                <Button value='1' onClick={props.onClickHandler} variant="secondary">1</Button>
                <Button value='2' onClick={props.onClickHandler} variant="secondary">2</Button>
                <Button value='3' onClick={props.onClickHandler} variant="secondary">3</Button>
                <Button value='4' onClick={props.onClickHandler} variant="secondary">4</Button>
            </ButtonGroup>
        </ButtonToolbar>
    )
}

class StartForm extends React.Component {

    render () {
        return (
            <Row>
                <TeamSizeSelector onClickHandler={this.props.onSubmit} />
            </Row>
        );
    }
}
