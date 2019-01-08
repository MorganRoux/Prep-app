

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