import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row: this.props.row, 
      col: this.props.col,
      color: 'rgba(200,200,200,1)'
    }
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleColorChange(obj) {
    this.setState({color: obj});
  }
  
  render() {
    return (
      <div id="board">
        <div className="LedMatrix container">
          {this.renderMatrix()}
        </div>
        <Toolbox onColorChange={this.handleColorChange}/>
      </div>
    )
  }

  renderMatrix() {
    return(
      [...Array( parseInt(this.state.row) ).keys()].map(function(j,key) {
        return <div className="row" data-index={j}>{this.renderRow()}</div>;
      }, this)
    )
  }

  renderRow() {
    return (
      [...Array( parseInt(this.state.col) ).keys()].map(function(i,key) {
        return <div className="col"> <Led color={this.state.color} n={i}/> </div>;
      }, this)
    ) 
  }

  renderLed() {
    return <Led />;
  }

} // Close LedMatrix


class Led extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      color: this.props.color,
      lastColor: '',
      power: -1
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    e.preventDefault();
    if(e.nativeEvent.which == 3)
      this.setState({power: this.state.power * -1})
    else {
      this.setState({color: this.props.color, power: 1});
    }
  }

  toggleState() {
    return (this.state.power == -1) ? 'off' : '';
  }

  style() {
    return (
      { backgroundColor: this.state.color }
    )
  }

  render() {
    return (
      <div className="LedWrapper">
        <div onClick={this.toggle} onContextMenu={this.toggle} style={this.style()} className={"Led col " + this.toggleState()} data-index={this.props.n}>     
        </div>
      </div>
    )
  }
} // Close Led


class Toolbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      r: '200',
      g: '200',
      b: '200',
      a: '1'
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    var key = e.target.getAttribute('data-prop');
    var val = e.target.value = this.manageLimits(e.target.value);
    var obj = {};
    obj[key] = val;
    this.setState(obj, function() {
      this.props.onColorChange(this.mixColors('string'));
    });
  }

  manageLimits(value) {
    if(value > 255) 
      value = 255
    else if(value < 0)
      value = 0;
    return value;
  }

  renderPalette() {
    return (
      <div style={this.mixColors()} className="color-palette"/>
    )
  }

  mixColors(type = 'obj') {
    var color = 'rgba(%r, %g, %b, %a)'
      .replace('%r', this.state.r)
      .replace('%g', this.state.g)
      .replace('%b', this.state.b)
      .replace('%a', this.state.a);
    if(type == 'string') 
      return color;
    return ({backgroundColor: color});
  }

  renderColorInput(label, prop) {
    return(
      <div>
        <span>{label}</span>
        <input onChange={this.handleChange} type='text' data-prop={prop} defaultValue={this.state[prop]} />
      </div>
    )
  }

  render() {
    return (
      <div className="toolbox container">
        {this.renderColorInput('r', 'r')}
        {this.renderColorInput('g', 'g')}
        {this.renderColorInput('b', 'b')}
        {this.renderColorInput('a', 'a')}
        {this.renderPalette()}
      </div>
    )
  }

} // Close rgbaTool



export default App;
