import React, { PureComponent } from 'react';
import './Monitoring.scss';
import "react-awesome-button/dist/styles.css"
import {userService} from "../_services/userService";

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {AwesomeButton} from "react-awesome-button";



class Monitoring extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            measurementsList: "",
            patients: [],
            selectedPatientID: 1,
            selectedPatientUsername: "",
        };
    }

    componentWillMount(){
        this.reloadPage();
    }

    reloadPage = () => {
        let patientID = 1;

        userService.getMeasurements(patientID)
            .then(data => {
                console.log(data)
                this.setState({
                    measurementsList: data.measurements
                })
            });

        userService.getPatients()
            .then(data => {
                console.log(data)
                this.setState({
                    patients: data.patients
                })
            });
    };

    render() {

            const renderLineChart = (
                <LineChart
                    width={1200}
                    height={400}
                    data={this.state.measurementsList}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="timestamp" stroke="white"/>
                    <YAxis stroke={"white"}/>
                    <Tooltip/>
                    <Legend stroke={"white"}/>
                    <Line type="monotone" dataKey="heartRate" stroke="#82ca9d"/>
                </LineChart>
            );


            return (

                <div className="char">
                    <div id="header">Heart Rate Monitoring</div>
                    <br/><br/>
                    <AwesomeButton type="primary">LIVE</AwesomeButton>
                    <br/><br/>
                    <span id={"SelectPatientLabel"}>Select Patient</span>
                    <br/>
                    <select id="PatientDropdown" value={this.state.selectedPatientID}
                            onChange={(e) => this.setState({selectedPatientID: e.id, selectedPatientUsername: e.username})}>
                        {this.state.patients.map((patient) => <option key={patient.id} value={patient.id}>{patient.username}</option>)}
                    </select>

                    <div>

                    </div>
                    <br/><br/>
                    {renderLineChart}
                </div>
            )
        }
}

export default Monitoring;