const ItemsReducer = (items = [{id: 1, name: '', type: null}], action) => {
    switch (action.type){
        case 'ADD_FIELD':
            return [
                ...items,
                {
                    id: items.length + 1,
                    name: '',
                    type: null
                }
            ];
            break;
        case 'REMOVE_FIELD':
            let newItems = [...items];

            if(items.length > 1) {
                newItems.splice(
                    newItems.findIndex((item) => {
                        return item.id == action.id;
                    }), 1
                );

                return newItems;
            }

            return newItems;
            break;
        default:
            return items;
            break;
    }
};

export default ItemsReducer;
