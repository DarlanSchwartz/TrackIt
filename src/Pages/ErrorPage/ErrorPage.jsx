import { useContext, useEffect } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function ErrorPage(error) {
    const { setUser } = useContext(UserContext);
    const state = useLocation().state;
    useEffect(() => {
        if (localStorage.getItem('user-trackit')) {
            const lsUser = JSON.parse(localStorage.getItem('user-trackit'));
            setUser(lsUser);
        }
    }, [state]);


    return (
        <PageContainer>
            {error.generic == 'true' && <div className="error-container"> <p className="error-name">Erro 404</p><p className="error-description">Página não encontrada</p></div>}
            {error.generic == 'false' && <div className="error-container"> <p className="error-name">Erro {state.split(',')[1]}</p><p className="error-description">{state.split(',')[0]}</p></div>}
        </PageContainer>
    );
}


const PageContainer = styled.div`

width: 100%;

    .error-container{
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        justify-content: center;
        width: 100%;
    }

    .error-name{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 30px;
    }

    .error-description{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-break: loose;
        color: #949494;
        text-align: center;
    }
`;