import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './CommentBox';


ReactDOM.render(
    <CommentBox
        // url='http://10.225.84.228:3001/api/comments'
        url='http://localhost:3001/api/comments'
        pollInterval={5000}
    />,
    document.getElementById('root')
);