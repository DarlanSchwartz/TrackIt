import dayjs from "dayjs";
import 'dayjs/locale/pt-br'; 

import { useContext, useEffect, useState } from "react";

import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import { GetTodayHabits,SetHabitChecked } from "../../requests";
import Habit from "./Habit";
import LoadingBlocks from "../../Components/LoadingBlocks";



export default function TodayPage()
{
    const {user,setUser, completedHabits, setCompletedHabits} = useContext(UserContext);
    const [todayHabits, setTodayHabits] = useState([]);
    

    function UpdateHabits(habistArr,error)
    {
        if(error === true)
        {
            alert(habistArr);
            return;
        }

        setTodayHabits(habistArr);
        setCompletedHabits((habistArr.filter((habit) => habit.done).length / habistArr.length) * 100);
    }

    function toggle(id)
    {
        todayHabits.find((habit) => habit.id === id).done ? uncheckHabit(id): checkHabit(id);
    }

    useEffect(()=>
    {
        if(localStorage.getItem('user-trackit'))
        {
            const lsUser = JSON.parse(localStorage.getItem('user-trackit'));
            setUser(lsUser);
            GetTodayHabits({headers: {Authorization: `Bearer ${lsUser.token}`}},UpdateHabits);
            return;
        }

        GetTodayHabits({headers: {Authorization: `Bearer ${user.token}` }},UpdateHabits);
        
    },[]);

    function checkHabit(id) 
    {
        SetHabitChecked(id,true,{headers: {Authorization: `Bearer ${user.token}`}},checkEnded);
    }

    function uncheckHabit(id)
    {
        SetHabitChecked(id,false,{headers: {Authorization: `Bearer ${user.token}`}},checkEnded );
    }

    function checkEnded(resp)
    {
        GetTodayHabits({headers: {Authorization: `Bearer ${user.token}` }},UpdateHabits)
    }

    

    return(
        <TodayContainer>
        <div className="header">
            <h1>{dayjs().locale('pt-br').format('dddd, DD/MM')}</h1>
            {todayHabits.length > 0 && completedHabits > 0 && <p className="habits-done">{completedHabits.toFixed()}% dos hábitos concluídos</p>}
            {todayHabits.length > 0 && completedHabits === 0 && <p className="habits-done"> Nenhum hábito concluído ainda</p>}
        </div>
        <div className="today-habits">
            { todayHabits.length > 0 && todayHabits.map((habit) => <Habit key={habit.id} habit={habit} handleClick={() => toggle(habit.id)} />)}
            { todayHabits.length == 0 && <div className="text-no-habits"><p>Você não tem habitos para hoje</p></div>}
            { todayHabits.length == 0 && <LoadingBlocks/>}
        </div>    
    </TodayContainer>
    );
}


const TodayContainer = styled.div`
    
    min-height: 100svh;
    background-color: #E5E5E5;
    .header {
        padding-top: 98px;
        h1 {
            
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 22.976px;
            color: #126BA5;
            text-transform: capitalize;
            margin: 0 0 5px 17px;
        }
    
        p {
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 17.976px;
            color: #BABABA;
            margin: 0 0 28px 17px;
        }
    }

    .today-habits {
        display: flex;
        flex-direction: column;
        align-items: center;
    
    .text-no-habits {
        position: absolute;
        left: 0;
        margin-left: 17px;
    }

        p {
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 17.976px;
            color: #BABABA;
        }
    }

    .habits-done {
        color: #8FC549;
        padding-top: 10px;
    }
`;