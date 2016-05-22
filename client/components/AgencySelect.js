class AgencySelect extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(event) {
    this.props.onUserInput(event.target.value);
  }

  render() {
    return (
      <select onChange={this.handleChange.bind(this)}>
      {
        this.props.agencies.map(function(agency) {
          return (<option value={agency}>{agency}</option>);
        })
      }
    </select>
    );
  }
}

window.AgencySelect = AgencySelect;
