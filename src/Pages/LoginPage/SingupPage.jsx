import styled from "styled-components";
import logo from '../../assets/track-it-logo.svg'
import { Link, useNavigate } from "react-router-dom";
import { Singup } from '../../requests.js';
import { useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

export default function SingupPage() {

    const navigate = useNavigate();

    const [loginIn, setLoginIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');

    function SingupSucess(response, error) {
        setLoginIn(false);

        if (error == true) {
            if (response.response.status == 422) {
                alert('Informações de login incorretas');
            }

            return;
        }

        navigate('/');
    }


    return (
        <PageContainer>
            <img src={logo} />

            <SingupForm onSubmit={
                (e) => {
                    e.preventDefault();
                    setLoginIn(true);
                    Singup(
                        {
                            email: userEmail,
                            name: userName,
                            image: userImage,
                            password: userPassword
                        }
                        , SingupSucess)
                }}>

                <input data-test="email-input" disabled={loginIn} required type="email" placeholder="email" name="email" id="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                <input data-test="password-input" disabled={loginIn} required pattern="^(?!\s*$).+" type="password" placeholder="senha" name="senha" id="senha" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                <input data-test="user-name-input" disabled={loginIn} required pattern="^(?!\s*$).+" type="text" placeholder="nome" name="nome" id="nome" value={userName} onChange={(e) => setUserName(e.target.value)} />
                <input data-test="user-image-input" disabled={loginIn} required pattern="^(https?:\/\/)?(www\.)?([^/\n]+\/)*[^/\n]+\.(jpg|jpeg|png|gif|bmp|webp)$" type="url" placeholder="foto" name="foto" id="foto" value={userImage} onChange={(e) => setUserImage(e.target.value)} />
                <button data-test="signup-btn" disabled={loginIn}>{loginIn ? '...' : 'Cadastrar'}</button>

            </SingupForm>

            <Link data-test="login-link" to='/' >Já tem uma conta? Faça login!</Link>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    const googleObj = jwt_decode(credentialResponse.credential);
                    setLoginIn(true);
                    setUserEmail(googleObj.email);
                    setUserPassword(googleObj.sub);
                    setUserName(googleObj.name);
                    setUserImage(googleObj.picture);
                    console.log(googleObj);
                    Singup(
                        {
                            email: googleObj.email,
                            name: googleObj.name,
                            image: googleObj.picture,
                            password: googleObj.sub
                        }
                        , SingupSucess)
                }}
                onError={() => {
                    alert('Falha ao logar com google');
                }}
                useOneTap
                auto_select
                context="signup"
                text="Cadastre-se com sua conta Google"
/>

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
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
    }
`;

const SingupForm = styled.form`

    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 35px;

    button
    {
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

        display: flex;
        align-items: center;
        justify-content: center;

        color: #FFFFFF;
        border: none;
        cursor: pointer;
        transition: all 200ms;

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

        &::placeholder{
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 25px;
        
            color: #DBDBDB;
        }

        &:focus {
            outline: none;
        }

    }

`;