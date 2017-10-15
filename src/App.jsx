import React, {Component} from 'react';
import {TransitionGroup} from 'react-transition-group'
import './App.css';
import Fade from './fade'

const SOURCE = 'SOURCE';
const DESTINATION = 'DESTINATION';
const AUX = 'AUX';
const EVEN = {
    0: [SOURCE, AUX],
    1: [SOURCE, DESTINATION],
    2: [AUX, DESTINATION]
};
const ODD = {
    0: [SOURCE, DESTINATION],
    1: [SOURCE, AUX],
    2: [AUX, DESTINATION]
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfDisks: 0,
            [SOURCE]: [],
            [DESTINATION]: [],
            [AUX]: [],
            pair: [],
            index: 0,
            pairs: {},
            show: false,
        };
    }

    componentDidMount() {
        let numberOfDisks = parseInt(prompt("Please enter the number of Disks"));
        this.step = (120 / numberOfDisks);
        this.setState({
            numberOfDisks: numberOfDisks,
            pair: numberOfDisks % 2 === 0 ? EVEN[0] : ODD[0],
            [SOURCE]: [...new Array(numberOfDisks).keys()],
            pairs: numberOfDisks % 2 === 0 ? EVEN : ODD
        });

        this.start();
    }


    move = () => {
        let firstArray = [...this.state[this.state.pair[0]]];
        let secondArray = [...this.state[this.state.pair[1]]];
        if (firstArray.length !== 0 || secondArray.length !== 0) {
            let firstElement = firstArray[firstArray.length - 1];
            let secondElement = secondArray[secondArray.length - 1];
            console.log(firstElement, secondElement);
            if (typeof firstElement === 'undefined') {
                firstArray.push(secondElement);
                secondArray.pop();
            } else if (typeof secondElement === 'undefined') {
                secondArray.push(firstElement);
                firstArray.pop();
            } else {
                if (firstElement < secondElement) {
                    firstArray.push(secondElement);
                    secondArray.pop();
                } else {
                    secondArray.push(firstElement);
                    firstArray.pop();
                }
            }
            this.setState({
                [this.state.pair[0]]: firstArray,
                [this.state.pair[1]]: secondArray
            })
        } else return 0
    };

    next = () => {
        this.setState({
            index: this.state.index + 1,
            pair: this.state.pairs[(this.state.index + 1) % 3]
        });
        console.log('source: ' + this.state[SOURCE]);
        console.log('aux: ' + this.state[AUX]);
        console.log('destination: ' + this.state[DESTINATION]);
    };

    start = () => {
        let interval = setInterval(() => {
            let move = this.move();
            if (move !== 0)
                this.next();
            else
                clearInterval(interval)
        }, 2000)
    };


    render() {
        return (
            <div className='container'>
                <h2>Towers of Hanoi</h2>
                <span> Tower 1
                    <TransitionGroup className='diskHolder'>
                        {[...this.state[SOURCE]].reverse().map((item) => {
                            return (
                                <Fade in={true} key={item}>
                                     <span
                                         className='disk'
                                         style={{width:(150 - this.step * item).toFixed(2) + 'px'}}
                                     > {`${item} `} </span>
                                </Fade>
                            )
                        })}
                    </TransitionGroup>
                </span>
                <span> Tower 2
                    <TransitionGroup className='diskHolder'>
                        {[...this.state[AUX]].reverse().map((item) => {
                            return (
                                <Fade in={true} key={item}>
                                    <span
                                        className='disk'
                                        style={{width:(150 - this.step * item).toFixed(2) + 'px'}}
                                    > {`${item} `} </span>
                                </Fade>
                            )
                        })}
                    </TransitionGroup>
                </span>
                <span> Tower 3
                    <TransitionGroup className='diskHolder'>
                        {[...this.state[DESTINATION]].reverse().map((item) => {
                            return (
                                <Fade in={true} key={item}>
                                     <span
                                         className='disk'
                                         style={{width:(150 - this.step * item).toFixed(2) + 'px'}}
                                     > {`${item} `} </span>
                                </Fade>
                            )
                        })}
                    </TransitionGroup>
                </span>

            </div>

        );
    }
}

export default App;
