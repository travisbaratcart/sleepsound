export default class RouteForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lines: null
    };

    this.getLines('SF-MUNI');

    this.agency = 'SF-MUNI';
    this.direction = 'Inbound';
  }

  getLines(agency) {
    const form = this;
    $.get('/lines', {agency: agency}, function(lines) {
      form.setState({lines});
      form.line = lines[0].Code;
      form.updateRoute();
    });
  }

  updateAgency(event) {
    const agency = event.target.value;
    this.agency = agency;
    this.getLines(agency);
  }

  setLine(event) {
    this.line = event.target.value;
    this.updateRoute();
  }

  setDirection(event) {
    this.direction = event.target.value;
    this.updateRoute();
  }

  setTime(event) {
    this.time = Number(Date.parse(event.target.value));
    this.updateRoute();
  }

  /** send updated route info to alarm form */
  updateRoute() {
    this.props.updateRoute(this.props.index,
      this.agency, this.line, this.direction, this.time);
  }

  componentDidMount() {
    var date = new Date();
    var adjustedDate = Date.now() - date.getTimezoneOffset() * 60 * 1000;
    var startTime = (new Date(adjustedDate)).toISOString().slice(0, 16);
    // "2016-04-05T11:45"
    document.getElementById("timeset" + this.props.index).defaultValue = startTime;
  }


  render() {
    let lineSelect;
    if (this.state.lines) {
      lineSelect = (
        <select onChange={this.setLine.bind(this)}>
        {this.state.lines.map((line) => {return (<option value={line.Code}>{line.Name}</option>);})}
        </select>
        );
    }

    let directionSelect
    if (this.state.lines) {
      directionSelect = (
        <select onChange={this.setLine.bind(this)}>
        <option value="Inbound">Inbound</option>
        <option value="Outbound">Outbound</option>
        </select>
      );
    }


    return (
      <div className="routeForm">
      <p>How would you get to work?</p>
      <div className="agency-wrapper">
      <select className="agency" onChange={this.updateAgency.bind(this)}>
      <option value="SF-MUNI">MUNI</option>
      <option value="BART">BART</option>
      </select>
      </div>
      {lineSelect}
      {directionSelect}
      <p>What time would you ideally wake up?</p>
      <input type="datetime-local" min="T" id={'timeset' + this.props.index}  onChange={this.setTime.bind(this)} />
      </div>
      );
  }
}
