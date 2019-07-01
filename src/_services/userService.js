import axios from "axios/index";

let url = "localhost:8080";//"192.168.43.134:8080";

export const userService = {
    login,
    logout,
    register,
    getMeasurements,
    getPatients,
    url
};

function login(username, password) {
    const targetUrl = 'http://localhost:8080/login';
    const reqOpts = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(targetUrl, reqOpts)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(data => {
            if (data && data.token) {
                localStorage.setItem('username', username);
                localStorage.setItem('user', data.token);
            }

            return username;
        });
}

function logout() {
    localStorage.removeItem('username');
}

function register(username, password, firstname, lastname) {
    const targetUrl = 'http://192.168.43.134:8080/user-management/doctor';
    const reqOpts = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, firstname, lastname })
    };

    return fetch(targetUrl, reqOpts)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
        });
}


axios.defaults.headers.common['Authorization'] = localStorage.getItem('user');
axios.defaults.headers.common['Content-Type'] = 'application/json';

async function getMeasurements(patientID) {
    const response = await axios.get('http://'+url+'/patient/'+patientID+'/measurements');
    return response.data;
}

async function getPatients(){
    const response = await axios.get('http://'+url+'/patients');
    return response.data;
}