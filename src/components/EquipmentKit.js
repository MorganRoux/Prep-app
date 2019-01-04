import uuid from 'uuid'
import React from 'react';
import EquipmentListItem from './EquipmentListItem';
import { connect } from 'react-redux';

export class EquipmentKit extends React.Component{
    constructor(props) {
        super(props);
        const equipments = props.kits[props.kit.id].list.map(
            (equipment) => ({ key: uuid(), ...equipment})
        );
        this.state = {equipments};
    }

    onRemove = () => {

    }
    render() {
        return (
            <div>
                <h4>EquipmentKit</h4>
                {this.state.equipments.map((equipment) => (
                    <EquipmentListItem 
                        key={uuid()}
                        equipment={equipment}
                        onRemove={this.onRemove}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
         kits: state.kits,
    };
}

export default connect(mapStateToProps)(EquipmentKit)