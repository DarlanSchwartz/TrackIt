import axios from "axios";

const URL_LOGIN = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login';

const URL_SINGUP = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up';

const URL_GETHABITS = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';

const URL_GETTODAYHABITS = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today';

const URL_DELETEHABIT = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/';



export function Login(loginObj, callback) {
    axios.post(URL_LOGIN, loginObj)
        .then((resp) => callback(resp, false))
        .catch((error) => callback(error, true));
}

export function LoginWithGoogle(loginObj, callback) {
    axios.post(URL_LOGIN, { email: loginObj.email, password: loginObj.password })
        .then((resp) => callback(resp, false))
        .catch((error) => {
            if (error.response.status == 401) {
                SingupAfterFailedGoogleLogin({
                    email: loginObj.email,
                    name: loginObj.name,
                    image: loginObj.image,
                    password: loginObj.password
                }, () => Login({ email: loginObj.email, password: loginObj.password }, callback));
            }
            else if (response.response.status == 422) {
                alert('Informações de login incorretas');
            }
        });
}

export function SingupAfterFailedGoogleLogin(singupObj, callback) {
    axios.post(URL_SINGUP, singupObj)
        .then((resp) => callback(resp, false))
        .catch((error) => alert('Aconteceu um erro!'));
}

export function Singup(singupObj, callback) {
    axios.post(URL_SINGUP, singupObj)
        .then((resp) => callback(resp, false))
        .catch((error) => callback(error, true));
}

export function GetAllHabits(habitsObjs, callback) {
    axios.get(URL_GETHABITS, habitsObjs)
        .then((resp) => callback(resp.data, false))
        .catch((error) => callback(error, true));
}

export function GetTodayHabits(habitsObjs, callback) {
    axios.get(URL_GETTODAYHABITS, habitsObjs)
        .then((resp) => callback(resp.data, false))
        .catch((error) => callback(error, true));
}

export function SaveHabit(habitObj, header, callback) {
    axios.post(URL_GETHABITS, habitObj, header)
        .then((resp) => callback(resp.data, false))
        .catch((error) => callback(error, true));
}

export function DeleteHabit(habitID, header, callback) {
    axios.delete(URL_DELETEHABIT + habitID, header)
        .then((resp) => callback(resp, false))
        .catch((error) => callback(error, true));
}

export function SetHabitChecked(id, value, header, callback) {
    const URL = value === true ? `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check` : `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;

    axios.post(URL, null, header)
        .then((resp) => callback(resp))
        .catch((error) => callback(error));
}

const URL_HISTORY_HABITS = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily';

export function GetHistoryHabits(header, callback) {
    axios.get(URL_HISTORY_HABITS, header)
        .then((resp) => callback(resp.data, false))
        .catch((error) => callback(error, true));
}


