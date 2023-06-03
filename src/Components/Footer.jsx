import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useContext, useEffect } from 'react';
import { GetTodayHabits } from '../requests';

import UserContext from '../contexts/UserContext';

export default function Footer() {
    
    const navigate = useNavigate();

    // ISSO É FIRULA 
    const {setUser, completedHabits ,setCompletedHabits } = useContext(UserContext);
    useEffect( ()=>{
        updateProgressbar();
    },[]);

    function updateProgressbar()
    {
        if (localStorage.getItem('user-trackit')) {
            const lsUser = JSON.parse(localStorage.getItem('user-trackit'));
            setUser(lsUser);
            GetTodayHabits({ headers: { Authorization: `Bearer ${lsUser.token}` } }, updateHabits);
        }
    }

    function updateHabits(habistArr, error) {
        setCompletedHabits((habistArr.filter((habit) => habit.done).length / habistArr.length) * 100);
    }
    // FIM DA FIRULA

    return (
        <MenuContainer data-test="menu">
            <p data-test="habit-link" onClick={() => navigate('/habitos')}>Hábitos</p>
            <Link data-test="today-link" to="/hoje">
                <CircularProgressbar
                    className="progressbar"
                    value={completedHabits}
                    text={'Hoje'}
                    background={true}
                    backgroundPadding={6}
                    styles={{
                        path: {
                            stroke: `#fff`,
                            strokeLinecap: 'round',
                        },
                        trail: {
                            stroke: '#52b6ff',
                            strokeLinecap: 'round',
                        },
                        text: {
                            fill: '#fff',
                            fontSize: '18px',
                            fontFamily: 'Lexend Deca',
                        },
                        background: {
                            fill: '#52b6ff',
                        },
                    }}
                />
            </Link>
            <p data-test="history-link" onClick={() => navigate('/historico')}>Histórico</p>
        </MenuContainer>
    );
};

const MenuContainer = styled.div`
    z-index: 1;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    background-color: #fff;

    p {
        font-family: 'Lexend Deca';
        font-size: 18px;
        color: #52b6ff;
        cursor: pointer;
    }

    .progressbar {
        position: absolute;
        bottom: 10px;
        right: 0;
        left: 0;
        margin: auto;
        width: 90px;
    }
`;