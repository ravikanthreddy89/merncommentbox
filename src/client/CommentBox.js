import React, {Component} from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import style from './style';

import axios from 'axios';

class CommentBox extends  Component {

    constructor(props){
        super(props);
        this.state = {data : []};
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    handleCommentSubmit(comment) {
        // make a post call to backend
        axios.post(this.props.url, comment).then(res => {
           this.loadCommentsFromServer();
        });
    }

    loadCommentsFromServer(){
        axios.get(this.props.url).then( res => {
            console.log('Mutton biryani : '+JSON.stringify(res.data));

            this.setState({ data : Array.from(res.data) });
        }).catch(err => {
            console.log('Mutton Kurma '+JSON.stringify(err));
        });
    }

    componentDidMount(){
       this.loadCommentsFromServer();
       setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }

    render(){
        return (
            <div style={ style.commentBox }>
                <h2>Comments:</h2>
                <CommentList data={this.state.data} />
                <CommentForm  onCommentSubmit = {this.handleCommentSubmit}/>
            </div>
        )
    }
}

export default CommentBox;