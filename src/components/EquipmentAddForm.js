import React from 'react'
import { Paper, TableBody, TableRow, TableCell, TableFooter } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import { addEquipment } from '../actions/equipment'
import { connect } from 'react-redux'

export class EquipmentAddForm extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            quantity: '',
            publicName: '',
            message: undefined,
            snackBarOpen: false
            
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
        this.setState( () => ({quantity, message: undefined}));
    }

    onPublicNameChange = (e) => {
        const publicName = e.target.value;
        this.setState( () => ({publicName, message: undefined}));
    }

    onAdd = () => {
        if(!this.state.publicName || !this.state.quantity) {
            this.setState(() => ({
                message: 'Erreur : valeurs invalides',
                snackBarOpen: true
            }))
            return;
        }

        //searching the item in the stocklist
        const itemToAdd = this.props.stocklist.find( (item) => {
            return (item.publicName === this.state.publicName)
        });
        if (!itemToAdd) { 
            this.setState(() => ({
                message: 'Erreur : item non trouvé',
                snackBarOpen: true
            }))
            return;
        }
        this.props.addEquipment({
            ...itemToAdd,
            quantity: this.state.quantity
        });

        this.setState( () => ({
            quantity: '',
            publicName:'', 
            message: undefined}));
        this.setState(() => ({
                message: 'Élement ajouté !',
                snackBarOpen: true
            }))
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
                        <IconButton aria-label="Add" onClick = {this.onAdd}>
                            <Icon color="primary">
                            add_circle
                            </Icon>
                        </IconButton>
                    </TableCell>
                </TableRow>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.snackBarOpen}
                    autoHideDuration={2000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.message}</span>}
                    action={[
                        // <Button key="undo" color="secondary" size="small" onClick={this.handleCloseSnackBar}>
                        // UNDO
                        // </Button>,
                        <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.handleCloseSnackBar}
                        >
                        <CloseIcon />
                        </IconButton>,
                    ]}
                />
                </TableFooter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        equipements: state.equipements,
        stocklist: state.stocklist,
        kit: state.kits
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addEquipment: (item) => dispatch(addEquipment(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentAddForm)