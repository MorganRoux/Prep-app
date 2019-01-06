import uuid from 'uuid'
import React from 'react';
import EquipmentListItem from './EquipmentListItem';
import { connect } from 'react-redux';
import { removeEquipment } from '../actions/equipment';

import {TableBody, TableRow, TableCell } from '@material-ui/core';
export class EquipmentKit extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            ...props.kit
        }
    }

    render() {
        return (
            <TableBody key = {`${this.state.id}-body`}>
                <TableRow key = {`${this.state.id}-row`}>
                    <TableCell key = {`${this.state.id}-cell-1`} colSpan="4">EquipmentKit</TableCell>
                </TableRow>
                { this.props.children }
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