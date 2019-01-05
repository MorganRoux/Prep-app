import React from 'react'
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import { Paper, TableBody, TableRow, TableCell } from '@material-ui/core';

export class EquipmentListItem extends React.Component {
    constructor(props) {
        super(props);

        this.equipment = {
            id: props.equipment.id,
            key: props.equipment.key,
            quantity: props.equipment.quantity,
            brand: props.stocklist[props.equipment.id].brand,
            category: props.stocklist[props.equipment.id].category,
            description: props.stocklist[props.equipment.id].description,
            publicName: props.stocklist[props.equipment.id].publicName,
            stockName: props.stocklist[props.equipment.id].stockName
        }
        this.state = this.equipment;
    }
    
    onRemove = () => {
        this.props.onRemove(this.state.key);
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
            <TableRow>
                <TableCell>
                    <input 
                        type="text"
                        name= "quantity"
                        placeholder="Quantity"
                        value={this.state.quantity}
                        onChange = {this.onQuantityChange}
                    />
                </TableCell>
                <TableCell>
                    {this.state.publicName}
                </TableCell>
                <TableCell>
                    {this.state.stockName}
                </TableCell>
                    
                <TableCell>
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

export default connect(mapStateToProps)(EquipmentListItem)

