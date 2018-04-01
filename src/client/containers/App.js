import React from 'react';
import {hot} from 'react-hot-loader';
import io from 'socket.io-client';
import styles from 'App.css';

import MessageForm from '../components/MessageForm';
import MessageList from '../components/MessageList';
import UsersList from '../components/UsersList';
import UserForm from '../components/UserForm';

const socket = io('/');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            messages: [],
            text: '',
            name: ''
        }
    }
    componentDidMount(){
        socket.on('message',message=>this.messageReceive(message));
        socket.on('update',({users})=>this.chatUpdate(users));
    }
    messageReceive(message){
        const messages = [message,...this.state.messages];
        this.setState({messages}); //equal to  this.setState({messages:messages});
    }
    chatUpdate(users){
        this.setState({users});
    }
    handleMessageSubmit(message){
        const messages=[message,...this.state.messages];
        this.setState({messages});
        socket.emit('message',message);
    }
    handleUserSubmit(name){

    }
    renderUserForm(){
        return(<UserForm onUserSumbit={name=>this.handleUserSubmit(name)}/>)
    }
    renderLayout(){
        return(
            <div className={styles.App}>
                <div className={styles.AppHeader}>
                    <div className={styles.AppTitle}>ChatApp</div>
                    <div className={styles.AppRoom}>App room</div>
                </div>
                <div className={styles.AppBody}>
                    <UsersList users={this.state.users}/>
                    <div className={styles.MessageWrapper}>
                        <MessageList messages={this.state.messages}/>
                        <MessageForm onMessageSubmit={message=>this.handleMessageSubmit(message)} name={this.state.name}/>
                    </div>
                </div>
            </div>
        )
    }
    render(){
        return this.state.name !==''?this.renderLayout():this.renderUserForm();
    }
}

export default hot(module)(App);