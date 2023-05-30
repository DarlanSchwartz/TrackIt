import axios from "axios";

const URL_LOGIN = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login';

/*

{
	email: "...",
	password: "..."
}

*/

const URL_SINGUP = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up';

/*

{
	email: "...",
	name: "...",
	image: "...",
	password: "..."
}

*/

// RESPOSTA 

/*  

{
    "id": 3,
    "name": "Joe",
    "image": "https://http.cat/411.jpg",
    "email": "joe@respondeai.com.br",
    "password": "123456",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjIxMjg0NzExfQ.b8e3bYm7TnU5p6pfrCPPbzboax6gvh_gGNFR4T51FxY"
}


*/

const URL_GETHABITS = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';

const URL_DELETEHABIT = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/';



export function Login(loginObj,callback)
{
    axios.post(URL_LOGIN,loginObj)
    .then( (resp) => callback(resp,false))
    .catch((error) => callback(error,true));
}

export function Singup(singupObj,callback)
{
    axios.post(URL_SINGUP,singupObj)
    .then( (resp) => callback(resp,false))
    .catch((error) => callback(error,true));
}

export function GetAllHabits(habitsObjs,callback)
{
    axios.get(URL_GETHABITS,habitsObjs)
    .then( (resp) => callback(resp.data,false))
    .catch((error) => callback(error,true));
}

export function SaveHabit(habitObj,header,callback)
{
    axios.post(URL_GETHABITS,habitObj,header)
    .then( (resp) => callback(resp.data,false))
    .catch((error) => callback(error,true));
}

/*

axios.delete(URL, {
        headers: {
          Authorization: authorizationToken
        },
        data: {
          source: source
        }
      });

*/

export function DeleteHabit(habitID,header,callback)
{
    axios.delete(URL_DELETEHABIT + habitID,header)
    .then( (resp) => callback(resp,false))
    .catch((error) => callback(error,true));
}


