import React from 'react'
import { Paper, TableBody, TableRow, TableCell, TableFooter } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import { addEquipment } from '../actions/equipment'
import { connect } from 'react-redux'
import { withSnackbar } from 'notistack'

export class EquipmentAddForm extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            quantity: '',
            publicName: ''
        }
    }

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ snackBarOpen: false });
      };

    onQuantityChange = (e) => {
        const quantity = e.target.value;
        if(quantity.match(/^\d*$/)) {
            this.setState( () => ({quantity}));
        }
    }

    onPublicNameChange = (e) => {
        const publicName = e.target.value;
        this.setState( () => ({publicName}));
    }

    onAdd = () => {

        // test the inputs
        if(!this.state.publicName || !this.state.quantity) {
            this.props.enqueueSnackbar('Informations erronnées', {variant:'error'});
            return;
        }

        // search the item in the stocklist
        const itemToAdd = this.props.stocklist.find( (item) => {
            return (item.publicName === this.state.publicName)
        });
        if (!itemToAdd) { 
            this.props.enqueueSnackbar('Élement introuvable', {variant:'error'});
            return;
        }

        // add item
        this.props.addEquipment({
            ...itemToAdd,
            quantity: this.state.quantity
        });
        const s = this.state.quantity === '1' ? '':'s'
        this.props.enqueueSnackbar(
            `${this.state.quantity}x ${this.state.publicName} ajouté${s}`, {variant:'success'});

        this.setState( () => ({
            quantity: '',
            publicName:''
        }));
    }

    render () {
        return (
            <TableFooter>
                <TableRow className = "addForm-row">
                    <TableCell></TableCell>
                    <TableCell className= "addForm-cell-1">
                        <input 
                        type="text"
                        name= "quantity"
                        autoFocus
                        placeholder=""
                        value={this.state.quantity}
                        onChange = {this.onQuantityChange}
                        />
                    </TableCell>
                    <TableCell className= "addForm-cell-2">
                        <input 
                        type="text"
                        name= "publicName"
                        placeholder=""
                        value={this.state.publicName}
                        onChange = {this.onPublicNameChange}
                        />
                    </TableCell>
                    <TableCell className= "addForm-cell-3"></TableCell>
                    <TableCell className= "addForm-cell-4">
                        <IconButton className="add-button" aria-label="Add" onClick = {this.onAdd}>
                            <Icon color="primary">
                            add_circle
                            </Icon>
                        </IconButton>
                    </TableCell>
                </TableRow>
                </TableFooter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        equipements: state.equipements,
        stocklist: state.stocklist,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addEquipment: (item) => dispatch(addEquipment(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(EquipmentAddForm))