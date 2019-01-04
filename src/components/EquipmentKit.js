import uuid from 'uuid'
import React from 'react';
import EquipmentListItem from './EquipmentListItem';
import { connect } from 'react-redux';
import { removeEquipment } from '../actions/equipment';

export class EquipmentKit extends React.Component{
    constructor(props) {
        super(props);
    }

    onRemove = (key) => {
        this.props.removeEquipment(key);
    }

    render() {
        return (
            <div>
                <h4>EquipmentKit</h4>
                {   this.props.equipments.map((equipment) => {
                    return (
                    equipment.parentKey === this.props.kit.key && (
                        <EquipmentListItem 
                        key={uuid()}
                        equipment={equipment}
                        onRemove={this.onRemove}
                        />
                    )
                )})}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
         kits: state.kits,
         equipments: state.equipments
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeEquipment: (key) => dispatch(removeEquipment(key))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentKit)