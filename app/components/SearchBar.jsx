import React from 'react';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

@immutableRenderDecorator

class SearchBar extends React.Component {
    render() {
        return(
            <div className="pure-form">
                <input onKeyUp={this.props.filterItem} placeholder="please input the Item you want" />
            </div>
        )
    }
}

export default SearchBar