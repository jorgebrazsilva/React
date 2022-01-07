import { Component } from 'react/cjs/react.production.min';
import './styles.css'

export class Button extends Component {
    render() {
        const { text, loadMorePosts, disabled } = this.props
        return (
            <button disabled={disabled} className='button' onClick={loadMorePosts}>{text}</button>
        );
    }
}