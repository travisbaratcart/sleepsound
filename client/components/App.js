import AlarmForm from './AlarmForm.js';
import AlarmDisplay from './AlarmDisplay.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alarms: props.alarms
    };
  }

  renderAlarm (alarm, index) {
    return (
      <AlarmDisplay alarm={alarm} key={index} index={index} deleteAlarm={this.deleteAlarm.bind(this)} />
      );
  }

  saveAlarm(alarm) {
    this.state.alarms.push(alarm);
    this.forceUpdate();
  }

  deleteAlarm(key) {
    this.state.alarms.splice(key, 1);
    this.setState({'alarms': this.state.alarms});
  }

  cacheAlarms() {
    localStorage.setItem('alarms', JSON.stringify(this.state.alarms));
  }

  render() {
    return (
      <div>
      <AlarmForm saveAlarm={this.saveAlarm.bind(this)} />
      <div className="cache">
        {this.state.alarms.length > 0 ? <a href="#" onClick={this.cacheAlarms.bind(this)}><span className="glyphicon glyphicon-save"></span> Save alarms to disk</a> : null}
      </div>
      <div className="Alarms">
      {this.state.alarms.map(this.renderAlarm.bind(this))}
      </div>
      </div>
      );
  }
}

var savedAlarms = JSON.parse(localStorage.getItem('alarms')) || []

ReactDOM.render(<App alarms={savedAlarms} />, document.getElementById('app'));

$(document).ready(function() {
  $('#modal a').click(function() {
    $('#modal').toggle();
    $('#modal-overlay').toggle();
    $('.container').toggleClass('blur');
    $('audio').trigger('pause');
  });
})
