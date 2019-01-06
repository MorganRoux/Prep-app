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

    renderKit = (kit) => {
        return (
            <EquipmentKit 
                key={kit.id}
                kit={kit}
            >
            { this.props.equipments.map((item) => {
                return (
                item.parentId === kit.id && (
                    <EquipmentListItem 
                    key={item.id}
                    equipment={item}
                    />
                )
            )})}
            </EquipmentKit>
        );
    }

    renderItem = (item) => {
        return (
            <TableBody key = {`${item.id}-body`}>
                <EquipmentListItem 
                    key={item.id}
                    equipment = {item}
                /> 
            </TableBody>
        );
    }

    render() {
        return (
            <Paper>
                <h3>EquipmentList</h3>
                <Table>
                { this.props.equipments.map((equipment) => {
                    //render only the equipments without parent
                    if(isNull(equipment.parentId))
                    {
                        return (equipment.category === 'kit') ? (
                            this.renderKit(equipment)
                        ):(
                            this.renderItem(equipment)
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
        removeEquipment: (id) => dispatch(removeEquipment(id)),
        editEquipment: () => dispatch(editEquipment()),
        addEquipment: () => dispatch(addEquipment())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(EquipmentList)