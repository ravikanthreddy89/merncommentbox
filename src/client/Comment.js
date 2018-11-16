import React, {Component} from 'react';
import style from './style';
import marked from 'marked';

class Comment extends Component {
    rawMarkUp(){
        let rawMarkUp = marked(this.props.children.toString());
        return { __html : rawMarkUp};
    }

    render(){
        return (
            <div style={style.comment}>
                <h3>{this.props.author}</h3>
                <span dangerouslySetInnerHTML={this.rawMarkUp()} />
            </div>
        )
    }
}
export default Comment;