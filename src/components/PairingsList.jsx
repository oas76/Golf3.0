const PairingsList = (props) => {
    return (
        <div class="container-fluid">
            {props.pairings.map(pairing => <Pairing{...pairing}/>)}
        </div>
    )
}

