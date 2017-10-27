import React from 'react';
//import { render } from 'react-snapshot';
import ReactDOM from 'react-dom'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
