

export const getVisibleEquipments = (equipments, filters) => {
    //kits are always visible

    return equipments.filter((equipment) => {

            const kitMatch = (equipment.category === 'kit');
            const categoryMatch = equipment.category.toLowerCase().includes(filters.text.toLowerCase());
            const stockNameMatch = equipment.stockName.toLowerCase().includes(filters.text.toLowerCase());
            const parentNameMatch = equipment.ParentName ? (
                equipment.parentName.toLowerCase().includes(filters.text.toLowerCase())
                ) : (false);

            return (kitMatch || categoryMatch || stockNameMatch || parentNameMatch)
        });
} 


export const validateItem = ({category, stockName, quantity, list}) => {

    const validItem = [];
    //item is not a kit
    if(category !== 'kit')
    {
        validItem.push({
                category,
                quantity,
                stockName,             // stockName of the corresponding element in stocklist
                parentId: null,        // key in the database of the parent
                parentName: null
            }
        );
        
    }

    //item is a kit
    else if (category === 'kit') {
        validItem.push({
            category,
            quantity,
            stockName,
            parentId: null,
            parentName: null
        });
        
        list.forEach((item) => newState.push({
                category: item.category,
                quantity: item.quantity,
                stockName: item. stockName,
                parentId: id,
                parentName: stockName
            })
        );
    }

}