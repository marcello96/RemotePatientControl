import axios from 'axios';

const url = 'http://localhost:8080/patient';
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('user')
    }
};
export function getMeasurements(patientNumber){
    axios.get(url+'/'+patientNumber+'/measurements', config).then(function(response){
        console.log('lalalal'+response.data);
        cb(response.data)
    })
        .catch(function (error) {
                console.log(error);
        })

}

