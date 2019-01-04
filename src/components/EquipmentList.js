import React from 'react';
import EquipmentListItem from './EquipmentListItem';
import { connect } from 'react-redux'
import EquipmentKit from './EquipmentKit';

export const EquipmentList = (props) => (
    <div>
        <h3>EquipmentList</h3>
        
        { props.equipments.map((equipment) => {
            
            return (equipment.category === 'kit') ? (
                <EquipmentKit />
            ):(
                <EquipmentListItem 
                key={equipment.id}
                equipment = {equipment}
                /> 
            ); 
        })}
    </div>
);

const mapStateToProps = (state) => {
    return {
        equipments: state.equipments
    }
};

export default connect(mapStateToProps)(EquipmentList)