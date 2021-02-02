import * as React from "react";
import {Component} from "react";

interface IFlowerpot {
    level: number,
}

/**
 * Displays a flowerpot with animated level
 * Like bucket
 */
export default class Flowerpot extends Component<IFlowerpot> {
    filling;
    animate = (prevlevel, level) => {
        let ref = this;
        let pos = this.filling.current.clientHeight;
        let id = setInterval(frame, 10);

        function frame() {
            if (prevlevel < level) {
                if (pos >= level) {
                    clearInterval(id);
                } else {
                    pos++;
                    ref.setState({level: pos});
                }
            }
            else if (prevlevel > level) {
                if (pos <= level) {
                    clearInterval(id);
                } else {
                    pos--;
                    ref.setState({level: pos});
                }
            }
        }
    };

    constructor(props) {
        super(props);
        this.filling = React.createRef();
    }

    state = {
        level: 0,
    };

    componentDidMount() {
        this.animate(0, this.props.level);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.animate(this.props.level, nextProps.level);
    }

    render() {
        return (
            <div style={{height: "6em", width: "6em"}}>
                <div className="flowerpot">
                    <div className={"pot"}>
                        <div ref={this.filling} className={"fill"} style={{height: (this.state.level == 80 ? 0:this.state.level*2) + "%"}}>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 xmlnsXlink="http://www.w3.org/1999/xlink"
                                 x="0px" y="0px" width="300px" height="300px" viewBox="0 0 300 300"
                                 enableBackground="new 0 0 300 300" xmlSpace="preserve">
                                <path fill="#04ACFF" id="waveShape" d="M300,300V2.5c0,0-0.6-0.1-1.1-0.1c0,0-25.5-2.3-40.5-2.4c-15,0-40.6,2.4-40.6,2.4
                        c-12.3,1.1-30.3,1.8-31.9,1.9c-2-0.1-19.7-0.8-32-1.9c0,0-25.8-2.3-40.8-2.4c-15,0-40.8,2.4-40.8,2.4c-12.3,1.1-30.4,1.8-32,1.9
                        c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V300H300z"/>
                            </svg>
                        </div>
                    </div>
                    {this.props.level != 80 && <div className={"text"}>{this.props.level}%</div>}
                    {this.props.level == 80 && <div className={"text"}>---%</div>}
                </div>
            </div>
        );
    }
}