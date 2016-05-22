export default class LineSelect extends React.Component {
  constructor(props) {
    super(props);
    this.line = undefined;
    this.direction = 'Inbound';
  }

  setLine(event) {
    this.line = event.target.value;
    this.props.onUserInput(this.line, this.direction);
  }

  setDirection(event) {
    this.direction = event.target.value;
    this.props.onUserInput(this.line, this.direction);
  }

  render() {
    return (
      <div>
      <select onChange={this.setLine.bind(this)}>
      {
        this.props.lines.map(function(line) {
          return (<option value={line.Code}>{line.Name}</option>);
        })
      }
    </select>
    <select onChange={this.setDirection.bind(this)}>
      <option value="Inbound">Inbound</option>
      <option value="Outbound">Outbound</option>
    </select>
    </div>
    );
  }
}
