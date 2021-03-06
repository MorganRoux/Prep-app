import React from 'react';
import { TableSortable } from './EquipmentList';
import Paper from '@material-ui/core/Paper';
import EquipmentHeader from './EquipmentHeader';

const DashboardPage = () => {
    return (
        <div>
        <div style = {{height: '100px'}}>
            </div>
        <div style = {{display: 'flex', justifyContent: 'center'}}>
            
            <Paper>
                <EquipmentHeader />
                <TableSortable/>
            </Paper>
            
        </div>
        </div>
    );
};

export default DashboardPage;