import React, { Component } from 'react';
import './App.css';

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date,
            timeDiff : Number(this.props.timeDiff),
            place: this.props.place};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
  
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    
    tick() {
        let newdate = new Date();
        newdate.setHours(newdate.getHours() + this.state.timeDiff);

        this.setState({
          date: newdate
        });
      }

    render() {
        return (
            <div>
                <h2>It is {this.state.date.toLocaleTimeString()} in {this.state.place}</h2>
            </div>
        );
    }
}

export default Clock;