import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { addDays, differenceInCalendarDays } from 'date-fns';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from "styled-components";
import 'react-calendar/dist/Calendar.css';
import { GetHistoryHabits } from "../../requests";

export default function HistoryPage()
{
    const { user ,setUser } = useContext(UserContext);
    const [calendar, setCalendar] = useState(new Date());
    const today = new Date();
    const [historyDays , setHistoryDays] = useState([]);
    const dateOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    };
/* [
    {
        "day": "20/05/2021",
        "habits": [
            {
                "id": 3,
                "name": "Acordar",
                "date": "2021-05-20T12:00:00.000Z",
                "weekDay": 4,
                "historyId": null,
                "done": false
            }
        ]
    },
]*/


    useEffect(()=>
    {
        if(localStorage.getItem('user-trackit'))
        {
            const lsUser = JSON.parse(localStorage.getItem('user-trackit'));
            setUser(lsUser);
            GetHistoryHabits({headers: {Authorization: `Bearer ${lsUser.token}`}},updateHistoryHabits);
            return;
        }

        GetHistoryHabits({headers: {Authorization: `Bearer ${user.token}`}},updateHistoryHabits);
       
    },[]);

    function updateHistoryHabits(resp)
    {
        setHistoryDays(resp);
    }

    function tileClassName({ date, view }) 
    {
        let doneDays = [];
        
        historyDays.filter((day) =>  day.habits.every((habit) => habit.done)).map(fdate => doneDays.push(fdate.day));
        
        let notDoneDays = [];

        historyDays.filter((day) =>  !day.habits.every((habit) => habit.done)).map(fdate => notDoneDays.push(fdate.day));

        if(doneDays.includes(date.toLocaleDateString('pt-br', dateOptions)))
        {
            return 'react-calendar__tile--all-done';
        }
        else if(notDoneDays.includes(date.toLocaleDateString('pt-br', dateOptions)))
        {
            return 'react-calendar__tile--not-all-done';
        }
        else
        {
            return 'react-calendar__tile';
        }
    }
    
    return (
        <HistoryPageContainer>
             <div className="header">
                <h1>Historico</h1>
            </div>
        
            <Calendar className='react-calendar'
                calendarType={'US'}
                maxDate={today}
                onChange={setCalendar} 
                value={calendar} 
                tileClassName={tileClassName}    
            />
        </HistoryPageContainer>
    );
}

const HistoryPageContainer = styled.div`
    background-color: #E5E5E5;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 28px;
        h1 {
            font-family: 'Lexend Deca';
            font-size: 25px;
            color: #126ba5;
        }
    }

    .react-calendar {
        width: 100%;
        border: none;
        border-radius: 10px;

        &__navigation button:last-child {
            border-top-right-radius: 10px;
        }

        &__tile {
            height: 54px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;

            &:last-child {
                border-bottom-right-radius: 10px;
            }
            &:nth-last-child(7) {
                border-bottom-left-radius: 10px;
            }

            &--all-done {
                abbr {
                    background: #8fc549;
                    color: #000;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
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
                        p {
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

