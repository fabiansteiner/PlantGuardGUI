import * as React from "react";
import {Component} from "react";

interface IFlowerpot {
    level: number,
    unknownMoist: number,
}

/**
 * Displays a flowerpot with animated level
 * Like bucket
 */
export default class Flowerpot extends Component<IFlowerpot> {
    filling;
    animate = (prevlevel, levelhere) => {
        let ref = this;
        let pos = this.filling.current.clientHeight;
        let id = setInterval(frame, 10);

        function frame() {
            if (prevlevel < levelhere) {
                if (pos >= levelhere) {
                    clearInterval(id);
                } else {
                    pos++;
                    ref.setState({level: pos});
                }
            }
            else if (prevlevel > levelhere) {
                if (pos <= levelhere) {
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
        unknownMoist: 0
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
                        <div ref={this.filling} className={"fill"} style={{height: this.state.level*2+ "%"}}>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 xmlnsXlink="http://www.w3.org/1999/xlink"
                                 x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100"
                                 enableBackground="new 0 0 100 100" xmlSpace="preserve">
                                <rect x="0px" height="100px" y="0px" width="100px" style={{stroke: "black", fill: "#04ACFF"}}/>
                            </svg>
                        </div>
                    </div>
                    {this.props.unknownMoist != 80 && <div className={"text"}>{this.props.level}%</div>}
                    {this.props.unknownMoist == 80 && <div className={"text"}>---%</div>}
                </div>
            </div>
        );
    }
}