const Pairing = (props) => {
    return (
        <div class="row" style={{margin: 15, backgroundColor: '#BFD3F6'}}>
            <div>
                {props.players.map(player => <PlayerCard {...player} />)}
            </div>
            <div style={{margin: 10, display: 'inline-block', fontWeight: 'bold', fontSize: 25, color: 'black', textAlign: 'center', alignContent: 'center'}}>
                HC: {props.handicap}
            </div>
        </div>
    );
}

