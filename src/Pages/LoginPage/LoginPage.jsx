import styled from "styled-components";
import logo from '../../assets/track-it-logo.svg';
import { ThreeDots } from 'react-loader-spinner';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Login } from '../../requests.js';
import UserContext from "../../contexts/UserContext";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

export default function LoginPage() {
    const navigate = useNavigate();

    const [loginIn, setLoginIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (localStorage.getItem('user-trackit')) {
            setUser(JSON.parse(localStorage.getItem('user-trackit')));
            navigate('/hoje');
        }
    }, []);

    function LoginSucess(response, error) {
        setLoginIn(false);

        if (error == true) {
            if (response.response.status == 401) {
                alert('Usuário não existe!');
            }
            else if (response.response.status == 422) {
                alert('Informações de login incorretas');
            }

            return;
        }

        const userObj = { ...user, name: response.data.name, image: response.data.image, email: response.data.email, token: response.data.token };

        if (localStorage.getItem('user-trackit') !== undefined) {
            localStorage.setItem('user-trackit', JSON.stringify(userObj));
            setUser(userObj);
        }
        else {
            setUser(JSON.parse(localStorage.getItem('user-trackit')));
        }

        navigate('/hoje');
    }

    return (
        <PageContainer>
            <img src={logo} />
            <LoginForm onSubmit={(e) => { e.preventDefault(); setLoginIn(true); Login({ email: userEmail, password: userPassword }, LoginSucess) }}>
                <input data-test="email-input" disabled={loginIn} required type="email" placeholder="email" name="email" id="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                <input data-test="password-input" disabled={loginIn} pattern="^(?!\s*$).+" required type="password" placeholder="senha" name="senha" id="senha" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                {loginIn ? <button data-test="login-btn" disabled><ThreeDots color="rgba(255, 255, 255, 1)" height={13} width={51} /></button> : <button data-test="login-btn">Entrar</button>}
            </LoginForm>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    const googleObj = jwt_decode(credentialResponse.credential);
                    setLoginIn(true);
                    console.log(googleObj);
                    //Login({ email: googleObj.email, password: googleObj.sub }, LoginSucess) 
                }}
                onError={() => {
                    alert('Falha ao logar com google');
                }}
                useOneTap = {true}
/>
            <Link data-test="signup-link" to={'/cadastro'}>Não tem uma conta? Cadastre-se!</Link>
        </PageContainer>
    );
}




const PageContainer = styled.div`

    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;


    a{
        margin-top: 25px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
    }
`;

const LoginForm = styled.form`

    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 35px;

    button{
        width: 303px;
        height: 45px;
        background: #52B6FF;
        border-radius:5px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 21px;
        line-height: 26px;
        text-align: center;
        color: #FFFFFF;
        border: none;
        cursor: pointer;
        transition: all 200ms;
        display: flex;
        align-items: center;
        justify-content: center;

        &:disabled{
            opacity: 0.7;
        }

        &:hover{
            color: #52B6FF;
            background-color: white;
            border: 1px solid #52B6FF;
        }
    }


    input{
        width: 303px;
        height: 45px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 20px;
        padding-left: 10px;

        &:focus {
                outline: none;
        }
        &::placeholder{
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 25px;
            color: #DBDBDB;
        }

        &:disabled{
            opacity: 0.7;
        }

    }

`;