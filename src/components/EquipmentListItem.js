import React from 'react'
import { connect } from 'react-redux';

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
        filters: state.filters,
        stocklist : state.stocklist
    };
} 

export default connect(mapStateToProps)(EquipmentListItem)

