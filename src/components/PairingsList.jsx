const PairingsList = (props) => {
    return (
        <Container>
            {props.pairings.map(pairing => <Pairing key={uuid.v4()} {...pairing}/>)}
        </Container>
    )
}

