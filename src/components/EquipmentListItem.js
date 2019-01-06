import React from 'react'
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import { Paper, TableBody, TableRow, TableCell } from '@material-ui/core';
import { removeEquipment } from '../actions/equipment';

export class EquipmentListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stockId: props.equipment.stockId,
            id: props.equipment.id,
            quantity: props.equipment.quantity,
            brand: props.stocklist[props.equipment.stockId].brand,
            category: props.stocklist[props.equipment.stockId].category,
            description: props.stocklist[props.equipment.stockId].description,
            publicName: props.stocklist[props.equipment.stockId].publicName,
            stockName: props.stocklist[props.equipment.stockId].stockName
        }
    }
    
    onRemove = () => {
        this.props.removeEquipment(this.state.id);
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
                <TableCell key = {`${this.state.id}-cell-1`}>
                    <input 
                        type="text"
                        name= "quantity"
                        placeholder="Quantity"
                        value={this.state.quantity}
                        onChange = {this.onQuantityChange}
                    />
                </TableCell>
                <TableCell key = {`${this.state.id}-cell-2`}>
                    {this.state.publicName}
                </TableCell>
                <TableCell key = {`${this.state.id}-cell-3`}>
                    {this.state.stockName}
                </TableCell>
                <TableCell key = {`${this.state.id}-cell-4`}>
                    <button onClick={this.onRemove}>Remove</button>
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

export default connect(mapStateToProps,mapDispatchToProps)(EquipmentListItem)

