import React from 'react'
import { connect } from 'react-redux';
import {TableRow, TableCell } from '@material-ui/core';
import { removeEquipment } from '../actions/equipment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import { withSnackbar } from 'notistack';

export class EquipmentListItem extends React.Component {
    constructor(props) {
        super(props);
        const stockItem = props.stocklist.find((item) => {
            return ( item.stockName === props.equipment.stockName )
        });
        this.state = {
            stockName: props.equipment.stockName,
            id: props.equipment.id,
            quantity: props.equipment.quantity,
            stockItem: stockItem
        }
        
    }
    
    onRemove = () => {
        this.props.removeEquipment(this.state.id);
        this.props.enqueueSnackbar('Item supprimé', {variant:'success'});
    }
    onQuantityChange = () => {

    }

    onPublicNameChange = () => {
        console.log('change !');
    }

    onStockNameChange = () => {

    }
    
    render() {
        return (
            <TableRow key={`${this.state.id}-row`}>
                <TableCell><Checkbox /></TableCell>
                <TableCell key = {`${this.state.id}-cell-1`}>{this.state.quantity}</TableCell>
                <TableCell key = {`${this.state.id}-cell-2`}>{this.state.stockItem.publicName}</TableCell>
                <TableCell key = {`${this.state.id}-cell-3`}>{this.state.stockItem.stockName}</TableCell>
                <TableCell key = {`${this.state.id}-cell-4`}>
                    <IconButton 
                        className = {'delbutton'} 
                        aria-label="Delete" 
                        onClick = {this.onRemove}>
                    <DeleteIcon />
                    </IconButton>
                </TableCell>   
            </TableRow>
        );
    };
}

const mapStateToProps = (state, props) => {
    return {
        equipments: state.equipments,
        filters: state.filters,
        stocklist : state.stocklist
    };
} 

const mapDispatchToProps = (dispatch, props) => {
    return {
        removeEquipment: (id) => dispatch(removeEquipment(id)),
        editEquipment: () => dispatch(editEquipment()),
        addEquipment: () => dispatch(addEquipment())
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withSnackbar(EquipmentListItem))

