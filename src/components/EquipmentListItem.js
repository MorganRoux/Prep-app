import React from 'react'
import { connect } from 'react-redux';
import { removeEquipment } from '../actions/equipments';

export class EquipmentListItem extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: props.equipment.id,
            brand: props.equipment.brand,
            category: props.equipment.category,
            description: props.equipment.description,
            quantity: props.equipment.quantity,
            publicName: props.equipment.publicName,
            stockName: props.equipment.stockName
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
            <div>
                <form>
                    <input 
                        type="text"
                        name= "quantity"
                        placeholder="Quantity"
                        value={this.state.quantity}
                        onChange = {this.onQuantityChange}
                    />
                    <input 
                        type="text"
                        name= "public_name"
                        placeholder="Public Name"
                        value={this.state.publicName}
                        onChange = {this.onPublicNameChange}
                    />
                    <input 
                        type="text"
                        name= "stock_name"
                        placeholder="Stock Name"
                        value={this.state.stockName}
                        onChange = {this.onStockNameChange}
                    />
                </form>
                <button onClick={this.onRemove}>Remove</button>
            </div>
        );
    };
}

const mapStateToProps = (state, props) => {
    return {
        equipments: state.equipments,
        filters: state.filters
    };
} 

const mapDispatchToProps = (dispatch, props) => {
    return {
        removeEquipment: (id) => dispatch(removeEquipment(id)),
        editEquipment: () => dispatch(editEquipment()),
        addEquipment: () => dispatch(addEquipment())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentListItem)

