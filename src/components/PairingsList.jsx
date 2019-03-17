const PairingsList = (props) => {
    return (
        <Container>
            {props.pairings.map(pairing => <Pairing settings={props.settings} key={uuid.v4()} {...pairing}/>)}
        </Container>
    )
}

