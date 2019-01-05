import React from 'react';
import uuid from 'uuid';
import EquipmentListItem from './EquipmentListItem';
import { connect } from 'react-redux'
import EquipmentKit from './EquipmentKit';
import { removeEquipment } from '../actions/equipment';
import { isNull } from 'util';
import Table from '@material-ui/core/Table';
import { Paper, TableBody, TableRow, TableCell } from '@material-ui/core';


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
            <Paper>
                <h3>EquipmentList</h3>
                <Table>
                { this.props.equipments.map((equipment) => {
                    if(isNull(equipment.parentKey))
                    {
                        return (equipment.category === 'kit') ? (
                            <EquipmentKit 
                                key={equipment.key}
                                kit={equipment}
                                onRemove = {this.onRemoveKit}
                            />
                        ):(
                            <TableBody>
                            <EquipmentListItem 
                                key={equipment.key}
                                equipment = {equipment}
                                onRemove = {this.onRemoveItem}
                            /> 
                            </TableBody>
                        ); 
                    }
                })}
                </Table>
            </Paper> 
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