import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from "styled-components";
import 'react-calendar/dist/Calendar.css';
import { GetHistoryHabits } from "../../requests";
import LoadingBlocks from "../../Components/LoadingBlocks";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { BsFillXSquareFill, BsCheckSquareFill} from "react-icons/bs";

export default function HistoryPage() {
    const { user, setUser } = useContext(UserContext);
    const [calendar, setCalendar] = useState(new Date());
    const [dateHabits, setDateHabits] = useState();
    const today = new Date();
    const [historyDays, setHistoryDays] = useState(null);
    const navigate = useNavigate();

    const dateOptions = {year: 'numeric', month: 'numeric', day: 'numeric',};

    useEffect(() => {
        if (localStorage.getItem('user-trackit')) {
            const lsUser = JSON.parse(localStorage.getItem('user-trackit'));
            setUser(lsUser);
            GetHistoryHabits({ headers: { Authorization: `Bearer ${lsUser.token}` } }, updateHistoryHabits);
            return;
        }

        GetHistoryHabits({ headers: { Authorization: `Bearer ${user.token}` } }, updateHistoryHabits);

    }, []);

    useEffect(() => {
        if(historyDays!=null)
        {
            setDateHabits(historyDays.find((habit) =>habit.day === calendar.toLocaleDateString('pt-br', dateOptions)));
        }
    }, [calendar]);

    function updateHistoryHabits(resp, hasError) {
        if (hasError) {
            navigate('/error', { state: `${resp.request.statusText},${resp.request.status}` });
            return;
        }

        setHistoryDays(resp);
    }

    function tileClassName({ date, view }) {
        if (view != 'month' || historyDays == null) {
            return 'react-calendar__tile';
        }

        let doneDays = [];

        historyDays.filter((day) => day.habits.every((habit) => habit.done)).map(fdate => doneDays.push(fdate.day));

        let notDoneDays = [];

        historyDays.filter((day) => !day.habits.every((habit) => habit.done)).map(fdate => notDoneDays.push(fdate.day));

        if (doneDays.includes(date.toLocaleDateString('pt-br', dateOptions))) {
            return 'react-calendar__tile--all-done';
        }
        else if (notDoneDays.includes(date.toLocaleDateString('pt-br', dateOptions))) {
            return 'react-calendar__tile--not-all-done';
        }
        else {
            return 'react-calendar__tile';
        }
    }

    return (
        <HistoryPageContainer>
            <div className="header">
                <h1>Histórico</h1>
                {historyDays && historyDays.length == 0 && <p className="no-historic">Nada para mostrar aqui</p>}
                {!historyDays && <p className="no-historic">Carregando...</p>}
            </div>

            {!historyDays && <LoadingBlocks />}

            {historyDays && historyDays.length > 0 &&

                <Calendar
                    className='react-calendar'
                    calendarType={'US'}
                    data-test="calendar"
                    maxDate={today}
                    onChange={setCalendar}
                    value={calendar}
                    tileClassName={tileClassName}
                    formatDay={(locale, date) => <p>{dayjs(date).format('DD')}</p>}
                />}

            <div className="date-habits">
                {dateHabits &&
                    <>
                        <h1 className="current-day-habits">{'Hábitos do dia ' + calendar.toLocaleDateString('pt-br',dateOptions)}</h1>
                        {dateHabits.habits.map((habit) => (
                            <HistoryHabitContainer className="date-habit" key={habit.id} >
                                <h1 className="name-habit">{habit.name}</h1>{habit.done ? (<BsCheckSquareFill className="check done"/>) : (<BsFillXSquareFill className="check not-done" /> )}
                            </HistoryHabitContainer>
                        ))}
                    </>}
                    {!dateHabits && <h1 className="current-day-habits">Não existem hábitos para o dia{' '}{calendar.toLocaleDateString('pt-br', dateOptions)}</h1>}
            </div>
        </HistoryPageContainer>
    );
}

const HistoryHabitContainer = styled.div`

    width: calc(100% - 36px);
    margin-left: 18px;
    margin-right: 18px;
    min-height: 94px;
    background-color:#ffffff;
    border-radius: 5px;
    position: relative;
    margin-bottom: 10px;
    align-items: center;
    display: flex;

    &:last-child {
        margin-bottom: 120px;
    }

    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        color: #666666;
        width: calc(100% - 105px);
        flex-wrap: wrap;
        margin-left: 20px;
    }

    .check {
        font-size: 69px;
        position: absolute;
        top: 0;
        right: 0;
        margin: 13px 13px 0 0;
    }

    .check.done{
        fill: #8FC549;
    }

    .check.not-done{
        fill: #ff0000;
    }
`;

const HistoryPageContainer = styled.div`
    background-color: #E5E5E5;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;


    .date-habits{
        width: 100%;
        background-color: #E5E5E5;
    }

    .current-day-habits{
        font-family: "Lexend Deca";
        font-size: 20px;
        line-height: 25px;
        color: rgb(102, 102, 102);
        margin-bottom: 7px;
        margin-top: 20px;
        margin-left: 20px;
    }


    .header {
        display: flex;
        justify-content: flex-start;
        position: absolute;
        flex-direction: column;
        gap: 10px;
        left: 20px;
        top: 95px;
        
        h1 {
            font-family: 'Lexend Deca';
            font-size: 25px;
            color: #126ba5;
            
        }
        
        .no-historic{
            font-family: 'Lexend Deca';
            font-size: 18px;
            font-weight: 400;
            color: rgb(186, 186, 186);
        }
    }

    .react-calendar {
        width: calc(100% - 36px);
        border: none;
        border-radius: 10px;
        margin-top: 138px;

        &__navigation button:last-child {
            border-top-right-radius: 10px;
        }

        &__tile {
            height: 54px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            transition: all 200ms;

            abbr{
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
            }
            

            &:last-child {
                border-bottom-right-radius: 10px;
            }
            &:nth-last-child(7) {
                border-bottom-left-radius: 10px;
            }

            &--all-done {
                abbr {
                    background: #8fc549;
                    color: #ffffff;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }
            }

            &--now {
                background: white;
                abbr{
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    background: #ffff76;
                }
            }

            &--not-all-done {
                abbr {
                    background: #eb3d3a;
                    color: #fff;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }
            }

            &:hover
            {
                background-color: white;
            }

            &:disabled{
                &:hover{
                    background-color: #f0f0f0;

                    abbr{
                        background-color: #f0f0f0;
                    }
                }
            }

            &--active {

                background: #fff;

                abbr {
                    background: #006edc;
                    color: white;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }

                &:enabled {
                    &:hover,
                    &:focus {
                        background: #fff;
                        abbr {
                            background: #1087ff;
                            border-radius: 50%;
                            width: 40px;
                            height: 40px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }

`;

