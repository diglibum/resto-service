const initialState = {
    menu: [],
    itemsInCart: [],
    totalCost: 0,
    loading: true,
    error: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "MENU_LOADED":
            return {
                ...state,
                menu: action.payload,
                loading: false
            };
        case "MENU_REQUESTED":
            return {
                ...state,
                loading: true
            };
        case "MENU_ERROR":
            return {
                ...state,
                loading: false,
                error: true
            };

        case "ITEM_REMOVE_FROM_CART":

            const itemAmount = state.itemsInCart.find((item) => item.id === action.payload.itemId).amount;

            if (action.payload.action === "all" || itemAmount === 1) {
                return {
                    ...state,
                    itemsInCart: state.itemsInCart.filter((item) => item.id !== action.payload.itemId)
                }
            }
            else if (action.payload.action === "minus") {

                const newItems = state.itemsInCart.map((item) => {
                    if (item.id === action.payload.itemId) {
                        item.amount = item.amount - 1;
                    }
                    return item;
                });

                return {
                    ...state,
                    itemsInCart: newItems
                }
            }
            return {
                ...state
            };


        case "ITEM_ADD_TO_CART":

            //find item in cart
            const itemInCart = state.itemsInCart.find((it) => it.id === action.payload);

            // find item in menu
            const item = state.menu.find((item) => item.id === action.payload);

            let newItemsInCart = [];

            if (itemInCart) {
                const newItem = {
                    id: item.id,
                    title: item.title,
                    url: item.url,
                    price: item.price,
                    amount: itemInCart.amount + 1
                };


                // replace element
                newItemsInCart = state.itemsInCart.map((i) => (i.id === action.payload) ? newItem : i);

            } else {
                const newItem = {
                    id: item.id,
                    title: item.title,
                    url: item.url,
                    price: item.price,
                    amount: 1
                }
                newItemsInCart = [
                    ...state.itemsInCart,
                    newItem
                ]
            }

            return {
                ...state,
                itemsInCart: newItemsInCart
            };

        case "TOTAL_COST_UPDATE":
            const newCost = state.itemsInCart.reduce((sum, item) => {
                return sum + (item.price * item.amount);
            }, 0);

            return {
                ...state,
                totalCost: newCost
            }

        case "CART_CLEAR":
            return {
                ...state,
                itemsInCart: []
            }

        default:
            return state;
    }
}

export default reducer;