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
