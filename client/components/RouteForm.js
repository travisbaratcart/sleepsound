class RouteForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasAgencies: false,
      hasLines: false
    };

    var form = this;
    $.get('http://127.0.0.1:3000/agencies', function(data) {
      form.agencies = data;
      form.setState({'hasAgencies': true});
    });
  }

  getLines(agency) {
    var form = this;
    form.agency = agency;
    $.get('http://127.0.0.1:3000/lines', {agency: agency}, function(data) {
      form.lines = data;
      form.setState({hasLines: true});
    });
  }

  setLine(line, direction) {
    this.line = line;
    this.direction = direction;
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
    console.log(startTime);
    document.getElementById("timeset" + this.props.index).defaultValue = startTime;
  }


  render() {
    return (
      <div className="routeForm">
        <p>How would you get to work?</p>
        {this.state.hasAgencies ? <AgencySelect agencies={this.agencies} onUserInput={this.getLines.bind(this)}/> : null}
        {this.state.hasLines ? <LineSelect lines={this.lines} onUserInput={this.setLine.bind(this)} /> : null}
        <p>What time would you ideally wake up?</p>
        <input type="datetime-local" min="T" id={'timeset' + this.props.index}  onChange={this.setTime.bind(this)} />
      </div>
    );
  }
}

window.RouteForm = RouteForm;
