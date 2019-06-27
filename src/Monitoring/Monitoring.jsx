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
            ping: new Date(),
            eventSource: null,
        };

        // check if the realtime connection is dead, reload client if dead
        setInterval(() => {
            let now = new Date().getTime();
            let diff = (now - this.state.ping.getTime()) /1000;

            if(diff > 20){
                window.location.reload();
            }
        }, 10000);

    }

    componentWillMount(){
        this.reloadPage();
    }

    reloadPage = () => {

        userService.getMeasurements(this.state.selectedPatientID)
            .then(data => {
                this.setState({
                    measurementsList: data.measurements
                })
            });

        userService.getPatients()
            .then(data => {
                this.setState({
                    patients: data.patients
                })
            });

    };

    measurementsSubscribe = () => {
        // connect to the realtime database stream
        console.log('measurementSubscribe')

        let  eventSource = new EventSource('http://localhost:8080/patient/1/measurements/subscribe');

        eventSource.addEventListener('INIT', function(e) {
            console.log('init'+e)
            this.setState(previousState => {
                return {
                    ping: new Date(e.data)
                };
            });
        }.bind(this), false);

        eventSource.addEventListener('MEASUREMENT', function(e) {
            console.log('measurement');
            console.log(e.data);
            console.log('old state')
            console.log(this.state.measurementsList)
            const list = this.state.measurementsList.concat(e.data);
            console.log('list');
            console.log(list);
            this.setState(previousState => {
                return {
                    ping: new Date(e.data),
                    measurementsList: list
                };
            });

        }.bind(this), false);

        this.setState({eventSource: eventSource});

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
                    <AwesomeButton type="primary" onPress="measurementsSubscribe">LIVE</AwesomeButton>
                    <button onClick={this.measurementsSubscribe}>LIVE</button>
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