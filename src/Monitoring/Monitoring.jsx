import React, { PureComponent } from 'react';
//import { AppRegistry, Text, StyleSheet } from 'react-native';
import './Monitoring.scss';

//import { LineChart, Line } from 'recharts';
//import { PureComponent } from 'react';
import {userService} from "../_services/userService";

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


class Monitoring extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            measurementsList: "",
        };
    }

    componentWillMount(){
        this.reloadPage();
    }

    reloadPage = () => {
        let patientID = 1;
        userService.getMeasurements(patientID)
            .then(data => {
                this.setState({measurementsList: data.measurements})
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
                    {renderLineChart}
                </div>
            )
        }


}

export default Monitoring;