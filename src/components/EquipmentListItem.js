import React from 'react'

export default class EquipmentListItem extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            quantity: '',
            name: '',
            stockName: ''
        }
    }
    
    onRemove = () => {

    }
    onQuantityChange = () => {

    }

    onNameChange = () => {

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
                        autoFocus
                        value={this.state.quantity}
                        onChange = {this.onQuantityChange}
                    />
                    <input 
                        type="text"
                        name= "name"
                        placeholder="Name"
                        value={this.state.name}
                        onChange = {this.onNameChange}
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

