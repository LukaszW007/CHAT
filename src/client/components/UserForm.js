import React, {Component} from 'react';

import styles from './UserForm.css'

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.onUserSubmit(this.state.name);
    }
    handleChange(e){
        this.setState({name:e.target.value});
    }

    render() {
        return (
            <form className={styles.UserForm} onSubmit={event => this.handleSubmit(event)}>
                <input
                    type="text"
                    className={styles.UserInput}
                    placeholder={'Write your nickname and press enter'}
                    onChange={event => this.handleChange(event)}
                    value={this.state.name}
                />
            </form>
        )
    }
}

export default UserForm;