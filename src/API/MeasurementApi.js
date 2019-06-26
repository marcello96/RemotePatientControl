import axios from 'axios';

const url = 'http://localhost:8080/patient';
export function getMeasurements(patientNumber){
    axios.get(url+'/'+patientNumber+'/measurements').then(function(response){
        console.log('lalalal'+response.data);
        cb(response.data)
    })
        .catch(function (error) {
                console.log(error);
        })

}

