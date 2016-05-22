import RouteForm from './RouteForm.js';

export default class AlarmForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alarm: [{}]
    };
  }

  addRoute() {
    this.setState({'alarm': this.state.alarm.concat([{}])});
  }

  renderRouteForm(route, index) {
    return (
      <RouteForm key={index} index={index} updateRoute={this.updateRoute.bind(this)} />
    );
  }

  updateRoute(index, agency, line, direction, time) {
    var route = this.state.alarm[index];
    route.agency = agency;
    route.line = line;
    route.direction = direction;
    route.time = time;
  }

  saveAlarm() {
    this.props.saveAlarm(this.state.alarm);
    this.setState({'alarm': [{}]});
  }

  render() {
    return (
      <div>
        {this.state.alarm.map(this.renderRouteForm.bind(this))}
        <a href="#" onClick={this.addRoute.bind(this)}><span className="glyphicon glyphicon-plus"></span> Add Route</a>
        <a href="#" className="save-route" onClick={this.saveAlarm.bind(this)}><span className="glyphicon glyphicon-bell"></span> Save Alarm</a>
      </div>
    );
  }
}
