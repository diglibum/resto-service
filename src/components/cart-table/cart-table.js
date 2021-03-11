import React from 'react';
import './cart-table.scss';
import { connect } from 'react-redux';
import { itemRemoveFromCart, itemAddToCart, updateTotalCost, clearCart } from '../../actions';
import WithRestoService from '../hoc';

const CartTable = ({ itemsInCart, deleteItem, addItem, updateTotal, clearCart, RestoService }) => {

    let items;

    if (itemsInCart.length > 0) {
        items = itemsInCart.map(({ title, price, url, id, amount }) => {

            return (
                <div key={id} className="cart__item">
                    <img src={url} className="cart__item-img" alt={title}></img>
                    <div className="cart__item-title">{title}</div>


                    <div className="btn cart__item-minus"
                        onClick={() => {
                            deleteItem(id, "minus");
                            updateTotal();
                        }}
                    >-</div>
                    <div className="cart__item-amount">{amount}</div>
                    <div className="cart__item-plus"
                        onClick={() => {
                            addItem(id);
                            updateTotal();
                        }}
                    >+</div>


                    <div className="cart__item-price">price: {price}, total: {price * amount}$</div>
                    <div className="cart__close"
                        onClick={() => {
                            deleteItem(id);
                            updateTotal();
                        }
                        }>&times;</div>
                </div>
            )
        });
    } else {
        items = (
            <div className="cart__empty">Корзина пуста</div>
        );
    }

    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {items}
            </div>
            <div className="cart__btn">
                <button disabled={itemsInCart.length === 0} onClick={() => {
                    RestoService.setOrder(generateOrder(itemsInCart))
                        .then(clearCart())
                }}>Отправить заказ</button>
            </div>
        </>
    );
};
const generateOrder = (items) => {
    const newOrder = items.map((item) => {
        return {
            id: item.id,
            amount: item.amount
        }
    })
    return newOrder;
}
const mapStateToProps = ({ itemsInCart }) => {
    return {
        itemsInCart
    }
};

const mapDispatchToProps = {
    deleteItem: itemRemoveFromCart,
    addItem: itemAddToCart,
    updateTotal: updateTotalCost,
    clearCart: clearCart
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));