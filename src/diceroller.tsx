import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IndexProps {
}

interface IndexState {
    rolling: boolean;
    dicePip: Array<string>;
    disabled: boolean
}

class Index extends React.Component<IndexProps, IndexState> {
    timerId: number;
    constructor(props: IndexProps) {
        super(props);
        this.state = {
            rolling: false,
            dicePip: ['\u2680', '\u2680', '\u2680', '\u2680', '\u2680', '\u2680', '\u2680', '\u2680', 
                      '\u2680', '\u2680', '\u2680', '\u2680', '\u2680', '\u2680', '\u2680', '\u2680'],
            disabled: false
        }
        this.buttonClick = this.buttonClick.bind(this);
    }
    static pipsList = ['\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685'];
    buttonClick(): void {
        this.setState({
            rolling: true,
            disabled: true
        });
        this.runSlot();
    }
    runSlot(): void {
        let counter: number = 0;
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
        let nextPips: Array<string> = new Array;
        for (let i=0; i<16; i++) {
            nextPips.push(Index.pipsList[Math.floor(Math.random() * Index.pipsList.length)]);
        }
        this.setState({
            dicePip: nextPips
        }) 
    }
    stopSlot(): void {
        this.setState({
            rolling: false,
            disabled: false
        });
    }
    render() {
        let diceElements: Array<JSX.Element> = new Array;
        for (let i=0; i<16; i++) {
            diceElements.push(
                <Dice className="dice" dicePips={this.state.dicePip[i]} id={'cb' + String(i)} rolling = {this.state.rolling} disabled={this.state.disabled}/>
            );
        }
        return (
            <div>
                <div id="container">
                    {diceElements}
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
    disabled: boolean
}

interface DiceState {
    checked: boolean
}

class Dice extends React.Component<DiceProps> {
    constructor (props: DiceProps) {
        super(props);
        this.state = {
            checked: false
        };
        this.checkboxClick = this.checkboxClick.bind(this);
    }
    checkboxClick(): void {
        this.setState((prevState: DiceState) => ({
            checked: !prevState.checked
        }));
    }

    render() {
        return (
            <div className='panel'>
                <div className={this.props.className}>{this.props.dicePips}</div>
                <div className="hold"><input type="checkbox" id={this.props.id} disabled={this.props.disabled} onClick={this.checkboxClick}/><label htmlFor={this.props.id}>Hold</label></div>
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