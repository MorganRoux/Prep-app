import uuid from 'uuid'
import React from 'react';
import EquipmentListItem from './EquipmentListItem';
import { connect } from 'react-redux';
import { removeEquipment } from '../actions/equipment';

import {TableBody, TableRow, TableCell } from '@material-ui/core';
export class EquipmentKit extends React.Component{
    constructor(props) {
        super(props);
    }

    onRemove = (key) => {
        this.props.removeEquipment(key);
    }

    render() {
        return (
            <TableBody>
                <TableRow><TableCell colSpan="4">EquipmentKit</TableCell></TableRow>
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
            </TableBody>
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