const menuLoaded = (newMenu) => {
    return {
        type: "MENU_LOADED",
        payload: newMenu
    };
}

const menuRequested = () => {
    return {
        type: "MENU_REQUESTED"
    };
}

const menuError = () => {
    return {
        type: "MENU_ERROR"
    }
}

const itemAddToCart = (itemId) => {
    return {
        type: "ITEM_ADD_TO_CART",
        payload: itemId
    }
}

const itemRemoveFromCart = (itemId, action = "all") => {
    return {
        type: "ITEM_REMOVE_FROM_CART",
        payload: { itemId, action }
    }
}

const updateTotalCost = () => {
    return {
        type: "TOTAL_COST_UPDATE"
    }
}

const clearCart = () => {
    return {
        type: "CART_CLEAR"
    }
}

export {
    menuLoaded,
    menuRequested,
    menuError,
    itemRemoveFromCart,
    itemAddToCart,
    updateTotalCost,
    clearCart
};