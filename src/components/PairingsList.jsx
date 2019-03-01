const PairingsList = (props) => {
    return (
        <Container>
            {props.pairings.map(pairing => <Pairing{...pairing}/>)}
        </Container>
    )
}

