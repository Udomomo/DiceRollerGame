import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface IndexProps {}

interface IndexState {
    rolling: boolean;
}

class Index extends React.Component<IndexProps, IndexState> {
    constructor(props: IndexProps) {
        super(props);
        this.state = {
            rolling: false
        }
        this.buttonClick = this.buttonClick.bind(this);
    }
    buttonClick(): void {
        this.setState({
            rolling: true
        })
    }
    render() {
        return (
            <div>
                <div id="container">
                    <Dice className="dice" dicePips='&#9856;' id='cb0'/>
                    <Dice className="dice" dicePips='&#9856;' id='cb1'/>
                    <Dice className="dice" dicePips='&#9856;' id='cb2'/>
                    <Dice className="dice" dicePips='&#9856;' id='cb3'/>
                    <Dice className="dice" dicePips='&#9856;' id='cb4'/>
                    <Dice className="dice" dicePips='&#9856;' id='cb5'/>
                    <Dice className="dice" dicePips='&#9856;' id='cb6'/>
                    <Dice className="dice" dicePips='&#9856;' id='cb7'/>
                    <Dice className="dice" dicePips='&#9856;' id='cb8'/>
                    <Dice className="dice" dicePips='&#9856;' id='cb9'/>
                    <Dice className="dice" dicePips='&#9856;' id='cb10'/>
                    <Dice className="dice" dicePips='&#9856;' id='cb11'/>
                    <Dice className="dice" dicePips='&#9856;' id='cb12'/>
                    <Dice className="dice" dicePips='&#9856;' id='cb13'/>
                    <Dice className="dice" dicePips='&#9856;' id='cb14'/>
                    <Dice className="dice" dicePips='&#9856;' id='cb15'/>
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
}

const Dice: React.StatelessComponent<DiceProps> = (props) => {
    return (
        <div className='panel'>
            <div className={props.className}>{props.dicePips}</div>
            <div className="hold"><input type="checkbox" id={props.id} disabled /><label htmlFor={props.id}>Hold</label></div>
        </div>
    );
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
