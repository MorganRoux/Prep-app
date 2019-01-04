import React from 'react';
import EquipmentListItem from './EquipmentListItem';
import { connect } from 'react-redux'
import EquipmentKit from './EquipmentKit';

export class EquipmentList extends React.Component {
    constructor(props) {
        super(props);
    }

    onRemove = (id) => {
        this.props.removeEquipment(id);
    }

    onEdit = () => {

    }

    onAdd = () => {

    }

    render() {
        return (
            <div>
                <h3>EquipmentList</h3>
                
                { this.props.equipments.map((equipment) => {
                    
                    return (
                        <EquipmentListItem 
                            key={equipment.id}
                            equipment = {equipment}
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

export default connect(mapStateToProps)(EquipmentList)