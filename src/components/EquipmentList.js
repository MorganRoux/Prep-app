import React from 'react';
import EquipmentListItem from './EquipmentListItem';
import EquipmentKit from './EquipmentKit';

const EquipmentList = () => {
    return (
        <div>
            <h3>EquipmentList</h3>

            <EquipmentListItem />
            <EquipmentListItem />
            <EquipmentListItem />

            <EquipmentKit />
        </div>
    );
}

export default EquipmentList