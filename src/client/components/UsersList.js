import React,{Component} from 'react';


class UsersList extends Component{
    constructor(props){
        super(props);

    }
    render(){
        // const
        return(
            <div className={usersList}>
                <ul className={listOfUsers}></ul>
            </div>
        )
    }
}

export default UsersList;