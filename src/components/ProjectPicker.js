import React from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import { startRemoveProject, startCreateProject, setCurrentProject, noCurrentProject, updateProjectName } from '../actions/projects';
import database from '../firebase/firebase';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import InputBase from '@material-ui/core/InputBase';

export class ProjectPicker extends React.Component { 
    constructor(props) {
        super(props);

        this.state = {
            projectName: ''
        }

    }

    setCurrentProject = (id) => {
            return database.ref(`/projects/${id}`).once('value')
            .then( (snapshot)=> {
                const projectToSet = snapshot.val();
                this.props.setCurrentProject({...projectToSet, id});
            });
    }

    onChange = (e) => {
        switch(e.target.value) {
        case 'select' : 
            return;
        case 'noproject' : 
            return;

        default:
            this.setCurrentProject(e.target.value)
            return;
        }
    }

    onAdd = () => {
        this.props.startCreateProject();
        return;
    }

    onRemove = () => {
        this.props.startRemoveProject(this.props.user.currentProject);
        this.props.noCurrentProject();
        return;
    }

    onEditName = (e) => {

        e.preventDefault();
        this.props.updateProjectName({...this.props.project, name: this.state.projectName})
        this.setState (
            () => ({projectName : ''})
        );
    }

    onChangeEditName = (e) => {
        const projectName = e.target.value;
        this.setState( () => ({projectName}));

    }
    
    onEditClose = (e) => {
        e.preventDefault();

        this.setState (
            () => ({projectName : ''})
        );
    }

    onEditOpen = () => {
        this.setState (
            () => ({projectName : this.props.project.name})
        );
    }

    render() {    
        return (
            <div>

            { !!(this.state.projectName) ? (
                <form onSubmit={this.onEditName} onReset={this.onEditClose}>
                <InputBase 
                        className="projectname"
                        placeholder={this.state.projectName}
                        value={this.state.projectName}
                        onChange={this.onChangeEditName}
                    />
                    <IconButton className="editdone" aria-label="Done" type="submit">
                        <Icon color="primary">
                        done
                        </Icon>
                    </IconButton>
                    <IconButton className="editcancel" aria-label="Cancel" type="reset">
                        <Icon color="primary">
                        clear
                        </Icon>
                    </IconButton>
                </form>
            ):(
                <div>
                    <Select
                        native
                        onChange={this.onChange}
                        value={this.props.user.currentProject}
                    >
                    {this.props.user.projects.length > 0 ? (
                        <option key="option-title-select" value="select">Sélectionner</option>
                            
                    ) : (
                        <option key="option-title-noproject" value="noproject">Aucun Projet</option>
                    )}
                    
                    { this.props.user.projects.map( (project) => (
                        <option 
                            key = {project.id} 
                            value={project.id}
                        >
                        {project.name}
                        </option>
                    ))}
                    </Select>

                    {this.props.user.projects.length > 0 && (
                        <IconButton 
                            className = {'removeproject'} 
                            aria-label="Delete" 
                            onClick = {this.onRemove}>
                            <Icon color="primary">
                            remove_circle
                            </Icon>
                        </IconButton>
                    )}
                    
                    <IconButton className="addproject" aria-label="Add" onClick={this.onAdd}>
                        <Icon color="primary">
                        add_circle
                        </Icon>
                    </IconButton>

                    <IconButton className="editproject" aria-label="Edit" 
                        onClick = {this.onEditOpen}>
                        <Icon color="primary">
                        create
                        </Icon>
                    </IconButton>
                </div>
            )}
                


                
                
            </div>
        );
    }
    
};

const mapStateToProps = (state) => ({
    user: state.user,
    project: state.project
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentProject: (id) => dispatch(setCurrentProject(id)),
    startRemoveProject: (id) => dispatch(startRemoveProject(id)),
    startCreateProject: (id) => dispatch(startCreateProject()),
    noCurrentProject: () => dispatch(noCurrentProject()),
    updateProjectName: (project) => dispatch(updateProjectName(project))
})
export default connect(mapStateToProps,mapDispatchToProps)(ProjectPicker);