import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

declare var require;
const DevTools = require('mobx-react-devtools').default; // Use import see #6, add typings

class AppState {
    @observable timer = 0;
    
    constructor() {
        setInterval(() => {
            appState.timer += 1;
        }, 1000);
    }
    
    resetTimer() {
        this.timer = 0;
    }
}

@observer
class TimerView extends React.Component<{appState: AppState}, {}> {
     render() {
        return (
            <div>
                <button onClick={this.onReset}>
                    Seconds passed: {this.props.appState.timer}
                </button>
                <DevTools />
            </div>
        );
     }

     onReset = () => {
     	this.props.appState.resetTimer();
     }
};

const appState =  new AppState();
ReactDOM.render(<TimerView appState={appState} />, document.getElementById('root'));