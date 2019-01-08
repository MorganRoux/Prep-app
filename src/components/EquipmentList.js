import React from 'react';
import { EquipmentKitItem, EquipmentListItemSortable } from './EquipmentItem';
import  EquipmentKitSortable from './EquipmentKit';
import EquipmentAddForm from './EquipmentAddForm';
import { moveEquipment } from '../actions/equipment'
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table';
import { Paper, TableRow, TableCell, TableHead, TableSortLabel } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
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
            <div style = {{display: 'flex', justifyContent: 'center'}}>
            <Paper>
                <div style = {{display: 'flex', justifyContent: 'space-between'}}>
                <div style = {{display: 'flex', justifyContent: 'flex-start'}}>
                    <IconButton>
                        <MenuIcon />
                    </IconButton>
                    <h1>Equipment List</h1>
                </div>
                <div style = {{display: 'flex', justifyContent: 'flex-end'}}>
                    <InputBase placeholder="Rechercher" />
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </div>
                </div>
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
            </Paper> 
            </div>
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
        moveEquipment: (oldIndex, newIndex) => dispatch(moveEquipment(oldIndex, newIndex))
    };
}


export class SortableComponent extends React.Component {
  
    onSortEnd = ({oldIndex, newIndex}) => {
      this.props.moveEquipment(oldIndex, newIndex);
    };
    render() {
      return (
          <div>
          <EquipmentListSortable onSortEnd={this.onSortEnd} distance = {10}/>
          </div>
      );
     }
  }


  
export default connect(mapStateToProps, mapDispatchToProps)(EquipmentList);
export const EquipmentListSortable = connect(mapStateToProps, mapDispatchToProps)(SortableContainer(EquipmentList));
export const TableSortable = connect(mapStateToProps, mapDispatchToProps)(SortableComponent);