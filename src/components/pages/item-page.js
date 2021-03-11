import React, { Component } from 'react';
import { connect } from 'react-redux';
import WithRestoService from '../hoc/with-resto-service';
import Error from '../error';
import Spinner from '../spinner';
import { menuLoaded, menuRequested, menuError } from '../../actions';

import './item-page.scss';

class ItemPage extends Component {

    componentDidMount() {
        this.props.menuRequested();

        const { RestoService } = this.props;

        RestoService.getMenuItems()
            .then(res => this.props.menuLoaded(res))
            .catch(() => this.props.menuError())

    }

    render() {

        const { menuItems, loading, error } = this.props;
        const menuItem = menuItems.find((item) => +item.id === +this.props.match.params.id);
        let view = null;

        if (error) {
            view = <Error />
        }

        else if (loading) {
            view = <Spinner />
        }
        else {
            view = <ItemView menuItem={menuItem} />
        }

        return (
            <div class="item__page">
                {view}
            </div>

        )
    }

}

const ItemView = ({ menuItem }) => {
    const { title, url, category, price } = menuItem;

    return (
        <div className="menu__item">
            <div className="menu__title">{title}</div>
            <img className="menu__img" src={url} alt="Cesar salad"></img>
            <div className="menu__category">Category:
             <span>{category}</span>
                <span className={`menu__category_img ${category}`}></span>
            </div>
            <div className="menu__price">Price: <span>{price}$</span></div>
            <button className="menu__btn">Add to cart</button>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    menuError
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(ItemPage));