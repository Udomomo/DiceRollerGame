import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IndexProps {
}

interface IndexState {
    rolling: boolean;
    dicePip: Array<string>;
}

class Index extends React.Component<IndexProps, IndexState> {
    timerId: number;
    constructor(props: IndexProps) {
        super(props);
        this.state = {
            rolling: false,
            dicePip: ['\u2680', '\u2680', '\u2680', '\u2680', '\u2680', '\u2680', '\u2680', '\u2680', 
                      '\u2680', '\u2680', '\u2680', '\u2680', '\u2680', '\u2680', '\u2680', '\u2680']
        }
        this.buttonClick = this.buttonClick.bind(this);
    }
    static pipsList = ['\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685'];
    buttonClick(): void {
        this.setState({
            rolling: true
        });
        this.runSlot();
    }
    runSlot(): void {
        let counter = 0;
        this.timerId = setInterval(
            () => {
                this.randomDicePips();
                counter++;
                if (counter >= 20) {
                    clearInterval(this.timerId);
                    this.stopSlot();
                }
            }, 50
        );
    }
    randomDicePips(): void {
        let newArray: Array<string> = new Array(16)
        for(let i=0; i<16; i++) {
            newArray[i] = Index.pipsList[Math.floor(Math.random() * Index.pipsList.length)];
        }
        this.setState({
            dicePip: newArray
        }) 
    }
    stopSlot(): void {
        this.setState({
            rolling: false
        });
    }
    render() {
        return (
            <div>
                <div id="container">
                    <Dice className="dice" dicePips={this.state.dicePip[0]} id='cb0' rolling = {this.state.rolling}/>
                    <Dice className="dice" dicePips={this.state.dicePip[1]} id='cb1' rolling = {this.state.rolling}/>
                    <Dice className="dice" dicePips={this.state.dicePip[2]} id='cb2' rolling = {this.state.rolling}/>
                    <Dice className="dice" dicePips={this.state.dicePip[3]} id='cb3' rolling = {this.state.rolling}/>
                    <Dice className="dice" dicePips={this.state.dicePip[4]} id='cb4' rolling = {this.state.rolling}/>
                    <Dice className="dice" dicePips={this.state.dicePip[5]} id='cb5' rolling = {this.state.rolling}/>
                    <Dice className="dice" dicePips={this.state.dicePip[6]} id='cb6' rolling = {this.state.rolling}/>
                    <Dice className="dice" dicePips={this.state.dicePip[7]} id='cb7' rolling = {this.state.rolling}/>
                    <Dice className="dice" dicePips={this.state.dicePip[8]} id='cb8' rolling = {this.state.rolling}/>
                    <Dice className="dice" dicePips={this.state.dicePip[9]} id='cb9' rolling = {this.state.rolling}/>
                    <Dice className="dice" dicePips={this.state.dicePip[10]} id='cb10' rolling = {this.state.rolling}/>
                    <Dice className="dice" dicePips={this.state.dicePip[11]} id='cb11' rolling = {this.state.rolling}/>
                    <Dice className="dice" dicePips={this.state.dicePip[12]} id='cb12' rolling = {this.state.rolling}/>
                    <Dice className="dice" dicePips={this.state.dicePip[13]} id='cb13' rolling = {this.state.rolling}/>
                    <Dice className="dice" dicePips={this.state.dicePip[14]} id='cb14' rolling = {this.state.rolling}/>
                    <Dice className="dice" dicePips={this.state.dicePip[15]} id='cb15' rolling = {this.state.rolling}/>
                </div>
                <div id = "menu">
                    <Button buttonClick = {this.buttonClick} rolling = {this.state.rolling}/>
                    <Score />
                </div>
            </div>
        );
    }
}

interface DiceProps {
    className: string;
    dicePips: string;
    id: string;
    rolling: boolean;
}

class Dice extends React.Component<DiceProps> {
    constructor (props: DiceProps) {
        super(props);
    }

    render() {
        return (
            <div className='panel'>
                <div className={this.props.className}>{this.props.dicePips}</div>
                <div className="hold"><input type="checkbox" id={this.props.id} disabled /><label htmlFor={this.props.id}>Hold</label></div>
            </div>
        );
    }
}

interface ButtonProps {
    buttonClick(): void;
    rolling: boolean;
}

const Button: React.StatelessComponent<ButtonProps> = (props) => {
    return (
        <div id="button" className={props.rolling ? "inactive" : ""} onClick={props.buttonClick}>
            <span id="label">Roll</span>
        </div>
    );
}

const Score: React.StatelessComponent = () => {
    return (
        <div id="score">
            <div className="total">total: <span id="totalnum">0</span></div>
            <div className="goal">goal: <span id="goalnum">0</span></div>
        </div>
    );
}

ReactDOM.render(
    <Index />,
    document.querySelector('.content')
);
