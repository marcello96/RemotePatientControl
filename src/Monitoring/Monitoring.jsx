import React, { PureComponent } from 'react';
import './Monitoring.scss';
import "react-awesome-button/dist/styles.css"
import {userService} from "../_services/userService";
import EventSource from 'eventsource'

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';



class Monitoring extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            measurementsList: "",
            patients: [],
            selectedPatientID: 2,
            ping: new Date(),
            eventSource: null,
            modeButtonColor: '#401D5D',
        };

        // check if the realtime connection is dead, reload client if dead

        setInterval(() => {
            let now = new Date().getTime();
            let diff = (now - this.state.ping.getTime()) /1000;

            if(diff > 20){
                window.location.reload();
            }
        }, 10000);

        //this.measurementsSubscribe = this.measurementsSubscribe.bind(this);

    }

    componentWillMount(){
        this.reloadPage();
    }

    reloadPage = () => {

        userService.getMeasurements(this.state.selectedPatientID)
            .then(data => {
                console.log(data.measurements)
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
        console.log('measurementSubscribe')
        // connect to the real time database stream
        if(this.state.eventSource != null){
            this.state.eventSource.close();
            this.setState({
                eventSource: null,
                modeButtonColor: '#401D5D',
            })

            console.log('close subscribe');
            return
        }

        console.log('open subscribe');
        console.log('this.state.selectedPatientID')
        console.log(this.state.selectedPatientID);
        let eventSourceInitDict = {headers: {'Authorization': localStorage.getItem('user')}};
        let eventSource = new EventSource('http://localhost:8080/patient/'+this.state.selectedPatientID+'/measurements/subscribe', eventSourceInitDict);

        eventSource.addEventListener('INIT', function(e) {
            console.log('init'+e)
            this.setState(() => {
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
            this.setState(() => {
                return {
                    ping: new Date(e.data),
                    measurementsList: list,
                };
            });

        }.bind(this), false);

        this.setState({
            eventSource: eventSource,
            modeButtonColor: 'red',});

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
                    <button id="modeButton" onClick={this.measurementsSubscribe} style={{backgroundColor:this.state.modeButtonColor}}>{this.state.eventSource == null? 'LIVE OFF' : 'LIVE ON'}</button>
                    <br/><br/>
                    <span id={"SelectPatientLabel"}>Select Patient</span>
                    <br/>
                    <select id="PatientDropdown" value={this.state.selectedPatientID}
                            defaultValue={{ label: "Ricky Balboa" , value: 1, key: 1}}
                            onChange={(e) => {
                                console.log('e');
                                console.log(e.target.value);
                                this.setState({
                                        selectedPatientID: e.target.value
                                    }
                                );
                                this.measurementsSubscribe();
                                this.reloadPage();
                                }
                            }>
                        {this.state.patients.map((patient) => <option key={patient.id} value={patient.id}>{patient.firstname + ' ' + patient.lastname}</option>)}
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