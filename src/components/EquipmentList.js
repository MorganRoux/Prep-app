import React from 'react';
import uuid from 'uuid';
import EquipmentListItem from './EquipmentListItem';
import { connect } from 'react-redux'
import EquipmentKit from './EquipmentKit';
import { removeEquipment } from '../actions/equipment';

export class EquipmentList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    onRemoveItem = (key) => {
        this.props.removeEquipment(key);
    }

    onRemoveKit = () => {

    }
    
    render() {
        return (
            <div>
                <h3>EquipmentList</h3>
                
                { this.props.equipments.map((equipment) => {
                    
                    return (equipment.category === 'kit') ? (
                        <EquipmentKit 
                            key={equipment.key}
                            kit={equipment}
                            onRemove = {this.onRemoveKit}
                        />
                    ):(
                        <EquipmentListItem 
                            key={equipment.key}
                            equipment = {equipment}
                            onRemove = {this.onRemoveItem}
                        /> 
                    ); 
                })}
            </div> 
        );
    }
}

const mapStateToProps = (state) => {
    return {
        equipments: state.equipments
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        removeEquipment: (key) => dispatch(removeEquipment(key)),
        editEquipment: () => dispatch(editEquipment()),
        addEquipment: () => dispatch(addEquipment())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(EquipmentList)