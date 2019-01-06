import React from 'react';
import EquipmentListItem from './EquipmentListItem';
import EquipmentAddForm from './EquipmentAddForm';
import { connect } from 'react-redux'
import EquipmentKit from './EquipmentKit';
import { removeEquipment } from '../actions/equipment';
import Table from '@material-ui/core/Table';
import { Paper, TableBody, TableRow, TableCell, TableHead, TableFooter } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

export class EquipmentList extends React.Component {
    constructor(props) {
        super(props);
    }

    renderHeader = () => (
        <TableHead>
            <TableRow>
                <TableCell><Checkbox /></TableCell>
                <TableCell>Quantité</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Description</TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
    );
    
    renderKit = (kit) => (
        <EquipmentKit 
            key={kit.id}
            kit={kit}
        >
        { this.props.equipments.map((item) => {
            return (
            item.parentId === kit.id && (
                <EquipmentListItem 
                key={item.id}
                equipment={item}
                />
            )
        )})}
        </EquipmentKit>
    );
    

    renderItem = (item) => (
        <TableBody key = {`${item.id}-body`}>
            <EquipmentListItem 
                key={item.id}
                equipment = {item}
            /> 
        </TableBody>
    );


    render() {
      
        return (
            <Paper>
                <h3>EquipmentList</h3>
                <Table>
                    {this.renderHeader()}
                    
                    {this.props.equipments.map((equipment) => {
                    //render only the equipments without parent
                    if(!equipment.parentId)
                    {
                        return (equipment.category === 'kit') ? (
                            this.renderKit(equipment)
                        ):(
                            this.renderItem(equipment)
                        ); 
                    }
                    })}
                    
                    <EquipmentAddForm />
                        
                </Table>
            </Paper> 
        );
    }
}

const mapStateToProps = (state) => {
    return {
        equipments: state.equipments
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        removeEquipment: (id) => dispatch(removeEquipment(id)),
        editEquipment: () => dispatch(editEquipment()),
        addEquipment: () => dispatch(addEquipment())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(EquipmentList)