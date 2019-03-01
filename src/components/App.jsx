let data = [
    {
        players: [{name: "Oddis", handicap: "10", handicapdec: "4", avatar: "https://avatars0.githubusercontent.com/u/2941042?s=400&u=dab56bd704c3b8c7eec0f26b085746b739aedebe&v=4"},
            {name: "Bjorn", handicap: "10", handicapdec: "4", avatar: "https://scontent.fosl4-1.fna.fbcdn.net/v/t1.0-9/22310194_10213880588546377_3352603420073342897_n.jpg?_nc_cat=105&_nc_ht=scontent.fosl4-1.fna&oh=821ae1e339b1daa8b7991554240bf4f8&oe=5D1D87E5"},
            {name: "SMU", handicap: "10", handicapdec: "4", avatar: "https://avatars1.githubusercontent.com/u/502358?s=460&v=4"},
        ],
        handicap: "3.3"
    },
    {
        players: [{name: "Poggen", handicap: "10", handicapdec: "4", avatar: "https://pbs.twimg.com/profile_images/1354488042/pam_usa1_400x400.jpg"},
            {name: "Jørgen", handicap: "10", handicapdec: "4", avatar: "https://scontent.fosl4-1.fna.fbcdn.net/v/t1.0-1/c0.33.200.200a/1797586_10152362399350561_1413026494_n.jpg?_nc_cat=104&_nc_ht=scontent.fosl4-1.fna&oh=b5a350608cbaaa1eed4d9e5fcefb2ac8&oe=5D16C379"},
            {name: "Anders", handicap: "10", handicapdec: "4", avatar: "https://s3-eu-west-1.amazonaws.com/apps.o5.no/apdm/lifeloop/op/birthday/20130901102314-1506-zr18/700.jpg"},
        ],
        handicap: "2.1"
    },
]

class Form extends React.Component {

    state = { pairingSize: ''};
    handleInput = async (event) => {
        event.preventDefault();
        const resp = await axios.post(`http://127.0.0.1:5000/randomize?teamsize=${this.state.pairingSize}`);
        console.log(resp.data);
    }

    render () {
        return (
            <form onSubmit={this.handleInput}>
                <input
                    type="text"
                    placeholder="# of players per team"
                    value={this.state.pairingSize}
                    onChange={event => this.setState({pairingSize: event.target.value })}
                />
                <button> Randomize</button>
                <input
                    type="text"
                    align="center"
                    pattern="[0-9.]"
                    maxLength="1"
                    name="teamsize"
                    placeholder="Team Size"
                    required autoFocus
                />
                <button>
                    Randomize
                </button>

            </form>
        );
    }
}


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pairings: data,
        };
    }

    render() {
        return (
            < div>
                <PairingsList pairings={this.state.pairings} />
            </div>
        );
    }

}

