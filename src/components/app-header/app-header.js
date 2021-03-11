import React from 'react';
import { Link } from 'react-router-dom';
import cartIcon from './shopping-cart-solid.svg';
import { connect } from 'react-redux';
import { updateTotalCost } from '../../actions';
import './app-header.scss';

const AppHeader = ({ totalCost, updateTotal }) => {

    updateTotal();

    return (
        <header className="header">
            <Link className="header__link" to='/'>
                Menu
            </Link>
            <Link className="header__link" to='/cart'>
                <img className="header__cart" src={cartIcon} alt="cart"></img>
                Total: {totalCost} $
            </Link>
        </header>
    )
};
const mapStateToProps = (state) => {
    return {
        totalCost: state.totalCost
    }
}
const mapDispatchToProps = {
    updateTotal: updateTotalCost
}
export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);