import React, { PureComponent } from 'react';
//import { AppRegistry, Text, StyleSheet } from 'react-native';
import './Monitoring.scss';
//import { LineChart, Line } from 'recharts';
//import { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
    {name: '1.00', heartRate: 3490, pv: 4300, amt: 2100,},
    {name: '2.00', heartRate: 3490, pv: 4300, amt: 2450,},
    {name: '3.00', heartRate: 3490, pv: 4300, amt: 2320,},
    {name: '4.00', heartRate: 3490, pv: 4300, amt: 2200,},
    {name: '5.00', heartRate: 3490, pv: 4300, amt: 2230,},
    {name: '6.00', heartRate: 3490, pv: 4300, amt: 2300,},
    {name: '7.00', heartRate: 3490, pv: 4300, amt: 2100,},
    {name: '8.00', heartRate: 4000, pv: 2400, amt: 2200,},
    {name: '9.00', heartRate: 3000, pv: 1398, amt: 2210,},
    {name: '10.00', heartRate: 2000, pv: 9800, amt: 2290,},
    {name: '11.00', heartRate: 2780, pv: 3908, amt: 2000,},
    {name: '12.00', heartRate: 1890, pv: 4800, amt: 2181,},
    {name: '13.00', heartRate: 2390, pv: 3800, amt: 2500,},
    {name: '14.00', heartRate: 3490, pv: 4300, amt: 2100,},
    {name: '15.00', heartRate: 3490, pv: 4300, amt: 2200,},
    {name: '16.00', heartRate: 3490, pv: 4300, amt: 2300,},
    {name: '17.00', heartRate: 3490, pv: 4300, amt: 2500,},
    {name: '18.00', heartRate: 3490, pv: 4300, amt: 2200,},
    {name: '19.00', heartRate: 3490, pv: 4200, amt: 2300,},
    {name: '20.00', heartRate: 3490, pv: 4100, amt: 2100,},
    {name: '21.00', heartRate: 3490, pv: 4200, amt: 2000,},
    {name: '22.00', heartRate: 3490, pv: 4320, amt: 2200,},
    {name: '23.00', heartRate: 3490, pv: 4350, amt: 2000,},
    {name: '24.00', heartRate: 3490, pv: 4310, amt: 2150,},
];

class Monitoring extends PureComponent {
    render() {
        const patientID = 1

        const renderLineChart = (
            <LineChart
                width={1200}
                height={400}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="white"/>
                <YAxis stroke={"white"}/>
                <Tooltip />
                <Legend stroke={"white"}/>
                <Line type="monotone" dataKey="pv" stroke="red" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="heartRate" stroke="#82ca9d" />
            </LineChart>
        );

        return (

            <div className="char">
                <div id="header">Heart Rate Monitoring</div>
                <br/><br/>
            {renderLineChart}
            </div>
        );
    }
}

export default Monitoring;