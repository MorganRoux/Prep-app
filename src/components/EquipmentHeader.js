import React from 'react'
import { connect } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { setTextFilter } from '../actions/filters';
import { startLogout } from '../actions/user';

export class EquipmentHeader extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            searchText : ''
        }
    }

    onSearchChange = (e) => {

        const searchText = e.target.value;
        this.setState(() => ({searchText}));
        this.props.setTextFilter(searchText);
    }
    
    render () {
        return (
            <div style = {{display: 'flex', justifyContent: 'space-between'}}>
                <div style = {{display: 'flex', justifyContent: 'flex-start'}}>
                    <IconButton>
                        <MenuIcon />
                    </IconButton>
                    <h1>Equipment List</h1>
                </div>
                <div style = {{display: 'flex', justifyContent: 'flex-end'}}>
                    <InputBase 
                        className="search-field"
                        placeholder="Rechercher" 
                        value={this.state.searchText}
                        onChange={this.onSearchChange}
                    />
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <button className = "logout-button" onClick={this.props.startLogout}>Logout</button>
                </div>
            </div>
    )};

}

const mapDispatchToProps = (dispatch) => ({
    setTextFilter : (text) =>  dispatch(setTextFilter(text)),
    startLogout : () => dispatch(startLogout())
});

export default connect(null, mapDispatchToProps)(EquipmentHeader)