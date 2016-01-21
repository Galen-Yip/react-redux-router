import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import SearchBar from '../components/SearchBar';
import Content from '../components/Content';
import Footer from '../components/Footer';
import * as ItemActions from '../actions/itemActions';

@immutableRenderDecorator

class Home extends React.Component {
        
    static propTypes = {
        items: React.PropTypes.object,
        filter: React.PropTypes.string
    };

    render() {
        const styles = {
            width: '300px',
            margin: '30px auto 0'
        }
        const actions = this.props.actions;
        return (
            <div style={styles}>
                <h1>Home Page</h1>
                <SearchBar filterItem={actions.filterItem}/>
                <Content items={this.props.items} filter={this.props.filter} deleteItem={actions.deleteItem} />
                <Footer addItem={actions.addItem} deleteAll={actions.deleteAll} />
            </div>
        )
    }
}

export default connect(
    state => ({
        items: state.items,
        filter: state.filter
    }),
    dispatch => ({
        actions: bindActionCreators(ItemActions, dispatch)
    })
)(Home)