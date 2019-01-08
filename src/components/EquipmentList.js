import React from 'react';
import { EquipmentKitItem, EquipmentListItemSortable } from './EquipmentItem';
import  EquipmentKitSortable from './EquipmentKit';
import EquipmentAddForm from './EquipmentAddForm';
import { moveEquipment } from '../actions/equipment'
import { getVisibleEquipments } from '../selectors/equipment';
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table';
import { Paper, TableRow, TableCell, TableHead, TableSortLabel } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import { SortableContainer } from 'react-sortable-hoc';




export class EquipmentList extends React.Component {
    constructor(props) {
        super(props);
    }

    rows = [
        {id: 'quantity', label: 'Quantité'},
        {id: 'name', label: 'Nom'},
        {id: 'description', label: 'Description'}
    ]

    onSortHandler = () => {

    }

    renderHeader = () => (
        <TableHead>
            <TableRow>
                <TableCell><Checkbox /></TableCell>
                {this.rows.map( (row) => (
                    <TableCell key = {row.id}>
                    <Tooltip
                    title="Trier"
                    placement={'bottom-end'}
                    enterDelay={300}
                    >
                    <TableSortLabel
                        active={false}
                        direction={'asc'}
                        onClick={this.onSortHandler}
                    >
                        {row.label}
                    </TableSortLabel>
                    </Tooltip>
                    </TableCell>
                ))}
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
    );
    
    renderKit = (kit, index) => (
        <EquipmentKitSortable
            key={kit.id}
            kit={kit}
            index={index}
        >
        { this.props.equipments.map((item) => {
            return (
            item.parentId === kit.id && (
                <EquipmentKitItem 
                key={item.id}
                equipment={item}
                />
            )
        )})}
        </EquipmentKitSortable>
    );
    

    renderItem = (item, index) => (
            <EquipmentListItemSortable 
                key={item.id}
                equipment = {item}
                index={index}
            /> 
    );

    render() {
        return (
                <Table style ={{width: 1200}}>
                    {this.renderHeader()}
                    
                    {this.props.equipments.map((equipment, index) => {
                    //render only the equipments without parent
                    if(!equipment.parentId)
                    {
                        return (equipment.category === 'kit') ? (
                            this.renderKit(equipment, index)
                        ):(
                            this.renderItem(equipment, index)
                        ); 
                    }
                    })} 
                    <EquipmentAddForm /> 
                </Table>
        );
    }
}


export class SortableComponent extends React.Component {
  
    onSortEnd = ({oldIndex, newIndex}) => {
      this.props.moveEquipment(oldIndex, newIndex);
    };

    cancelSorting = () => (!!this.props.filters.text)
    
    render() {
        return (
        <div>
            <EquipmentListSortable 
                onSortEnd={this.onSortEnd} 
                distance = {10}
                shouldCancelStart = {this.cancelSorting}/>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        equipments: getVisibleEquipments(state.equipments, state.filters),
        filters: state.filters
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        moveEquipment: (oldIndex, newIndex) => dispatch(moveEquipment(oldIndex, newIndex))
    };
}


  
export default connect(mapStateToProps, mapDispatchToProps)(EquipmentList);
export const EquipmentListSortable = connect(mapStateToProps, mapDispatchToProps)(SortableContainer(EquipmentList));
export const TableSortable = connect(mapStateToProps, mapDispatchToProps)(SortableComponent);