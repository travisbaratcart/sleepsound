class AlarmDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.adjustAllRoutes();
    setInterval(this.adjustAllRoutes.bind(this), 300000);
  }

  displayRoute(route) {
    var time = (new Date(route.time)).toUTCString();
    var adjTime = (new Date(route.adjTime)).toUTCString();
    var onTime = route.time === route.adjTime;
    return (
      <div className="route">
      <p>Route: {route.agency}: {route.line}-{route.direction} </p>
      <p>Set wake up time: {time}</p>
      <p>Scheduled wake up time: <span className={onTime ? 'on-time' : 'delayed'}>{adjTime}</span> </p>
      </div>
      );
  }

  setAlarm() {
    var routes = this.props.alarm;
    var latestRoute = routes[0];
    for (var i = 1; i < routes.length; i++) {
      var routeTime = routes[i].adjTime;
      if (routeTime === undefined) return;
      if (routeTime > latestRoute.adjTime) {
        latestRoute = routes[i];
      }
    }

    this.latest = latestRoute;

    var date = new Date();
    var offsetAlarmTime = latestRoute.adjTime + date.getTimezoneOffset() * 60 * 1000;
    var timeTillAlarm = offsetAlarmTime - date.getTime();

    const fiveMinutes = 300000;

    clearInterval(this.alarmTimeout);

    this.alarmTimeout = setTimeout(function() {
      console.log('test');
      this.triggerAlarm();
    }.bind(this), timeTillAlarm);
  }

  adjustAllRoutes() {
    this.props.alarm.forEach(this.adjustRoute.bind(this));
  }

  adjustRoute(route) {
    var url = 'http://127.0.0.1:3000/times';
    var params = {agency: route.agency, route: route.line, direction: route.direction};

    var alarm = this;

    $.get(url, params, function(times) {
      var waits = []
      console.log('times: ' + times);
      for (var i = 1; i < times.length; i++) {
        waits.push(Number(times[i]) - Number(times[i - 1]));
      }
      var maxWait = Math.max(...waits);
      if (maxWait > 7) {
        var minutesEarly = maxWait - 7;
        // alarm.setAlarm(alarm.baseTime - minutesEarly * 60 * 1000);
        route.adjTime = route.time - minutesEarly * 60 * 1000;
      } else {
        // alarm.setAlarm(alarm.baseTime);
        route.adjTime = route.time;
      }

      alarm.setAlarm();
      alarm.forceUpdate();
    })
  }

  triggerAlarm() {
    var recommended = `${this.latest.agency}: ${this.latest.line}-${this.latest.direction}`;
    $('#modal h5 span').text(recommended);
    $('.container').toggleClass('blur');
    $('#modal').toggle();
    $('#modal-overlay').toggle();
    $('audio').trigger('play');
    this.deleteAlarm();
  }

  deleteAlarm() {
    console.log(this.props.index);
    this.props.deleteAlarm(this.props.index);
  }

  render() {
    var latest = this.latest || {};
    var wakeUpTime = (new Date(latest.adjTime)).toUTCString()

    return (
      <div className="alarm">
      <div className="latest">
        <p> We will be waking you at: <span className="recommended">{wakeUpTime}</span> </p>
        <p> Recommended route: <span className="recommended">{latest.agency}: {latest.line}-{latest.direction}</span> </p>
      </div>
      <div className="routes">
      {this.props.alarm.map(this.displayRoute.bind(this))}
      </div>
      <div className="delete">
      <a href="#" onClick={this.deleteAlarm.bind(this)}><i className="glyphicon glyphicon-trash"></i> Delete</a>
      </div>
      </div>);
  }
}

window.AlarmDisplay = AlarmDisplay;
