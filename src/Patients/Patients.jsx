import React, { PureComponent } from 'react';
import './Patients.scss';
import "react-awesome-button/dist/styles.css"
import {userService} from "../_services/userService";
import MaterialTable from 'material-table';


class PatientsList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            patients: [{id: 1, username: 'MehmBaran', firstname: 'Mehmet', lastname: 'Baran', age: 59}],
            data: ''
        };
    }

    componentWillMount(){
        this.reloadPage();
    }

    reloadPage = () => {

        userService.getPatients()
            .then(data => {
                this.setState({
                    patients: data.patients
                });
            });
    };

    render() {
            const columns = [
                {title: 'ID', field: 'id'},
                {title: 'User Name', field: 'username'},
                {title: 'First Name', field: 'firstname'},
                {title: 'Last Name', field: 'lastname'},
                {title: 'Age', field: 'age'},
            ];

        return (
            <MaterialTable
                title="Patients List"
                columns={columns}
                data={this.state.patients}
                options={{
                    headerStyle: {
                        backgroundColor: 'grey',
                        color: '#FFF',
                        fontSize: '20px',
                    },
                    rowStyle: {
                        backgroundColor: '#EEE',
                        fontSize: '20px',
                        size: 'medium'

                    },
                    cellStyle: {
                        fontSize: '20px',
                    }
                }}
            />
        );
    }
}

export default PatientsList;