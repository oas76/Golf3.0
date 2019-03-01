const PlayerCard = (props) => {
    return (
        <div class="row" style={{margin: 5}}>
            <img src={props.avatar} width='75px' height='75px'/>
            <div style={{display: 'inline-block', margin: 10}}>
                <div style={{fontWeight: 'bold', fontSize: 14}}>
                    {props.name}
                </div>
                <div style={{fontSize: 8 }}>
                    {props.handicap}.{props.handicapdec}
                </div>
            </div>
        </div>
    );
};

