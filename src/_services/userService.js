import axios from "axios/index";

export const userService = {
    login,
    logout,
    register,
    getMeasurements,
    getPatients,
};

function login(username, password) {
    // const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    //     targetUrl = 'https://geoxplore-api.herokuapp.com/login';
    // const reqOpts = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json', },
    //     body: JSON.stringify({ username, password })
    // };
    //
    // return fetch(proxyUrl + targetUrl, reqOpts)
    //     .then(response => {
    //         if (!response.ok) {
    //             return Promise.reject(response.statusText);
    //         }
    //
    //         return response.json();
    //     })
    //     .then(data => {
    //         if (data && data.token) {
    //             localStorage.setItem('username', username);
    //             localStorage.setItem('user', data.token);
    //         }
    //
    //         return username;
    //     });
    localStorage.setItem('username', username);
    localStorage.setItem('user', 'todo-token');
    return username;
}

function logout() {
    localStorage.removeItem('username');
}

function register(username, email, password) {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = 'https://geoxplore-api.herokuapp.com/user-management/user/create';
    const reqOpts = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    };

    return fetch(proxyUrl + targetUrl, reqOpts)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
    });
}

//TODO move it from here!
const url = 'http://localhost:8080';


async function getMeasurements(patientID){
    const response = await axios.get(url+'/patient/'+patientID+'/measurements');
    return response.data;
}

async function getPatients(){
    const response = await axios.get(url+'/patients');
    return response.data;
}
