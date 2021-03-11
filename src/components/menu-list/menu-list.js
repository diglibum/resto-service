import React, { Component } from 'react';
import MenuListItem from '../menu-list-item';
import { connect } from 'react-redux';
import WithRestoService from '../hoc';
import { menuLoaded, menuRequested, menuError, itemAddToCart, updateTotalCost } from '../../actions';
import Spinner from '../spinner';
import Error from '../error';

import './menu-list.scss';

class MenuList extends Component {
    componentDidMount() {
        this.props.menuRequested();
        const { RestoService } = this.props;

        RestoService.getMenuItems()
            .then(res => this.props.menuLoaded(res))
            .catch(() => this.props.menuError());
    }

    render() {
        const { menuItems, loading, error, addToCart, updateTotal } = this.props;

        if (error) {
            return <Error />
        }

        if (loading) {
            return <Spinner />
        }

        const items = menuItems.map((menuItem) => {
            return <MenuListItem
                key={menuItem.id}
                menuItem={menuItem}
                addToCart={addToCart}
                updateTotal={updateTotal} />
        });


        return (
            <View items={items} />
        )
    }
};
const View = ({ items }) => {
    return (
        <ul className="menu__list">
            {items}
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error,
        itemsInCart: state.itemsInCart
    }
}

const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    menuError,
    addToCart: itemAddToCart,
    updateTotal: updateTotalCost
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));