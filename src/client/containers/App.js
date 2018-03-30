import React from 'react';
import {hot} from 'react-hot-loader';
import io from 'socket.io-client';

const socket = io('/');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            message: [],
            text: '',
            name: ''
        }
    }
}

export default hot(module)(App);