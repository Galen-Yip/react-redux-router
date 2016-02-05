import React from 'react';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import _ from 'lodash';
import classNames from 'classnames';

@immutableRenderDecorator

class Content extends React.Component {
    render() {
        const items = this.props.items ? this.props.items.toArray() : [];
        return(
            <ul>
                {items.map(v => <ListItem 
                        key={v} 
                        item={v}
                        filter={this.props.filter} 
                        deleteItem={this.props.deleteItem} />
                )}
            </ul>
        )
    }
}

class ListItem extends React.Component {
    render() {
        const liClass = classNames({ hidden: !_.isEmpty(this.props.filter) && this.props.filter != this.props.item})

        return(
            <li className={liClass}>
                <span style={{marginRight: '4px'}}>{this.props.item}</span>
                <button onClick={this.props.deleteItem.bind(this, this.props.item)}>delete</button>
            </li>
        )
    }
}

export default Content