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
                key={kit.key}
                kit={kit}
            >
            { this.props.equipments.map((item) => {
                return (
                item.parentKey === kit.key && (
                    <EquipmentListItem 
                    key={uuid()}
                    equipment={item}
                    />
                )
            )})}
            </EquipmentKit>
        );
    }

    renderItem = (item) => {
        return (
            <TableBody>
                <EquipmentListItem 
                    key={item.key}
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
                    if(isNull(equipment.parentKey))
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
        removeEquipment: (key) => dispatch(removeEquipment(key)),
        editEquipment: () => dispatch(editEquipment()),
        addEquipment: () => dispatch(addEquipment())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(EquipmentList)