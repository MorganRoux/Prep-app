import React from 'react';
import EquipmentListItem from './EquipmentListItem';

const EquipmentKit = () => {
    return (
        <div>
            <h4>EquipmentKit</h4>

            <EquipmentListItem />
            <EquipmentListItem />
            <EquipmentListItem />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        // kits: state.kits
    };
}
export default EquipmentKit