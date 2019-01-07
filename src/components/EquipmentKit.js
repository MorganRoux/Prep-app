import React from 'react';
import { connect } from 'react-redux';
import { removeEquipment } from '../actions/equipment';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import {TableBody, TableRow, TableCell } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { withSnackbar } from 'notistack';

export class EquipmentKit extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            ...props.kit,
            expand: true
        }
    }
    onRemove = () => {
        this.props.removeEquipment(this.state.id);
        this.props.enqueueSnackbar('Kit supprimé', {variant:'success'});
    }

    onExpand = () => {
        this.setState( (prevState) => ({
            expand: !prevState.expand
        }));
    }

    render() {
        return (
            <TableBody key = {`${this.state.id}-body`}>
                <TableRow key = {`${this.state.id}-row`}>
                    <TableCell key = {`${this.state.id}-cell-1`}>
                        <Checkbox />
                        <IconButton className="expand-button" aria-label="Expand" onClick = {this.onExpand}>
                            <Icon color="primary">
                            {this.state.expand ? 'arrow_drop_down' : 'arrow_right'}
                            </Icon>
                        </IconButton>
                    </TableCell>
                    <TableCell key = {`${this.state.id}-cell-2`}>{this.state.quantity}</TableCell>
                    <TableCell key = {`${this.state.id}-cell-3`} colSpan="2">EquipmentKit</TableCell>
                    <TableCell key = {`${this.state.id}-cell-4`}>
                        <IconButton className="delbutton" aria-label="Delete" onClick = {this.onRemove}>
                        <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
                { this.state.expand && this.props.children }
            </TableBody>
        );
    }
}

const mapStateToProps = (state) => {
    return {
         equipments: state.equipments
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeEquipment: (key) => dispatch(removeEquipment(key))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(EquipmentKit))