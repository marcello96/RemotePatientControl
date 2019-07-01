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
            measurementSubscribe: false,
            eventSource: null,
            modeButtonColor: '#401D5D',
        };
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

    reloadMeasurements = (patientID) => {

        this.setState({selectedPatientID: patientID});
        userService.getMeasurements(patientID)
            .then(data => {
                console.log(data.measurements)
                this.setState({
                    measurementsList: data.measurements
                })
            });
    };

    measurementsSubscribe = () => {
        console.log('measurementSubscribe')
        this.setState(prevState => ({
            measurementSubscribe: !prevState.measurementSubscribe
        }));

        // connect to the real time database stream
        if(this.state.measurementSubscribe){
            this.state.eventSource.close();
            this.setState({
                eventSource: null,
                modeButtonColor: '#401D5D',
            });
            console.log('close subscribe');
            return
        }

        console.log('open subscribe');
        let eventSourceInitDict = {headers: {'Authorization': localStorage.getItem('user')}};
        let eventSource = new EventSource('http://'+userService.url+'/patient/'+this.state.selectedPatientID+'/measurements/subscribe', eventSourceInitDict);

        eventSource.addEventListener('INIT', function(e) {
            console.log('init'+e);
            this.setState(() => {
                return {
                    ping: new Date(e.data)
                };
            });
        }.bind(this), false);

        eventSource.addEventListener('MEASUREMENT', function(e) {
            const list = this.state.measurementsList.concat(e.data);
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
                                if(this.state.measurementsSubscribe){
                                    console.log('was measurementSubscribe');
                                   this.measurementsSubscribe();
                                }

                                this.reloadMeasurements(e.target.value);
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