import { useEffect, useState } from "react";
import { BsDashSquareFill, BsPlusSquareFill } from "react-icons/bs";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import { GetAllHabits ,DeleteHabit } from "../../requests";
import {ThreeDots } from "react-loader-spinner";
import { SaveHabit } from "../../requests";
import { BsTrash } from "react-icons/bs";
import LoadingBlocks from "../../Components/LoadingBlocks";

export default function HabitsPage()
{
    const [isCreating,setisCreating] = useState(false);
    const [sendingHabit, setSendingHabit] = useState(false);
    const [habits, setHabits] = useState();
    const { user ,setUser } = useContext(UserContext);
    const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const [habit, setHabit] = useState({name:"", days:[]});

    useEffect(()=>
    {
        if(localStorage.getItem('user-trackit'))
        {
            const lsUser = JSON.parse(localStorage.getItem('user-trackit'));
            setUser(lsUser);
            GetAllHabits({headers: {Authorization: `Bearer ${lsUser.token}` }},updateHabits);
            return;
        }
       
        GetAllHabits({headers: {Authorization: `Bearer ${user.token}` }},updateHabits);
    },[]);

    function selectionDays(day) {
        if (habit.days.includes(day)) {
            setHabit({ ...habit, days: habit.days.filter((d) => d !== day) });
        } else {
            setHabit({ ...habit, days: [...habit.days, day] });
        }
    };

    function endCreation(response,error,update)
    {
        setisCreating(false);
        setSendingHabit(false);
        setHabit({name:"", days:[]});

        if(update === true)
        {
            GetAllHabits({headers: {Authorization: `Bearer ${user.token}` }},updateHabits);
        }
    }


    function saveHabit(event)
    {
        setSendingHabit(true);
        event.preventDefault();
        SaveHabit(habit,{headers: {Authorization: `Bearer ${user.token}` }},(resp,isError)=> endCreation(resp,isError,true));
    }

    function updateHabits(responseHabits,error)
    {
        if(error)
        {
            alert(error.message);
            return;
        }

        setHabits(responseHabits);
    }

    function deleteHabit(id)
    {
        if (window.confirm('Deseja realmente excluir esse hábito?')) {
            DeleteHabit(id,{headers: {Authorization: `Bearer ${user.token}` }},deleteSuceeced);
        }

    }

    function deleteSuceeced(resp,error)
    {
        if(error)
        {
            alert(error);
            return;
        }

        GetAllHabits({headers: {Authorization: `Bearer ${user.token}` }},updateHabits);
    }
    
    
    return (
       <HabitsContainer>
            <Header creating = {isCreating.toString()}>
                <h1>Meus Hábitos</h1>
                {!isCreating && <BsPlusSquareFill className="add-habit-btn" onClick={()=>setisCreating(true)}/>}
                {isCreating && <BsDashSquareFill className="add-habit-btn" onClick={()=>setisCreating(false)}/>}
            </Header>

            {isCreating && 
                <HabitForm onSubmit={(e) => saveHabit(e)}>
                    <input disabled = {sendingHabit} pattern="^(?!\s*$).+" required type="text" placeholder="nome do hábito" name="habit" id="habit" value={habit.name} onChange={(e)=> setHabit({...habit, name: e.target.value})}/>
                    <DaysContainer>
                    {daysOfWeek.map((day,index) => {
                        return (
                        <DayContainer key={index} id={index} days={habit.days} onClick={()=>selectionDays(index)}>
                            <p>{day}</p>
                        </DayContainer>
                    );
                    })}
                    </DaysContainer>
                    <div className="action-btns">
                        <p onClick={()=> endCreation()}>Cancelar</p>
                        <button disabled={sendingHabit} type="submit">{sendingHabit ? (<ThreeDots color="#fff" height={11} />) : ("Salvar") }</button>
                    </div>
                </HabitForm>
            }

            {(habits && habits.length == 0 && sendingHabit == false) && <p className="no-habits-message"> Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>}

            {!habits && <LoadingBlocks/>}


            <MyHabits creating = {isCreating.toString()}>
            {habits &&  habits.length > 0 && habits.map((hbt)=>{

                        return(
                            <HabitContainer className="habit" key={hbt.id}>
                                <p className="habit-name">{hbt.name}</p>
                                <DaysContainerHabit >
                                    {daysOfWeek.map((day, index) => { return (
                                        <DayContainerHabit className="day-container" key={index} id={index} days={hbt.days}>
                                            <p className="day-name">{day}</p>
                                        </DayContainerHabit>)
                                    })}
                                </DaysContainerHabit>
                                <BsTrash className="trash-icon" onClick={() => deleteHabit(hbt.id)}/>
                            </HabitContainer>
                        );
                        })}
            </MyHabits>

       </HabitsContainer>
    );
}


const HabitForm = styled.form`

    width: calc(100% - 36px);
    height: 180px;
    background: white;
    border-radius: 5px;
    text-align: center;
    opacity: 1;
    margin-bottom: 20px;
    margin-top: 40px;
    

        input {
            width: calc(100% - 36px);
            height: 45px;
            border: solid 1px rgba(212, 212, 212, 1);
            padding-left: 11px;
            margin-top: 18px;
            border-radius: 5px;
            font-size: 20px;
            
            &:focus 
            {
                outline: none;

                &::placeholder {
                    color: transparent;
                }
            }

            &::placeholder 
            {
                font-family: 'Lexend Deca';
                font-style: normal;
                font-weight: 400;
                font-size: 19.976px;
                color: #DBDBDB;
            }
        }

    .action-btns {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 16px;
        
        p {
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 15.976px;
            color: #52B6FF;
            margin-right: 23px;
            cursor: pointer;
            transition: all 200ms;
            &:hover{
                color: #d81d1d;
            }
        }

        button {
            width: 84px;
            height: 35px;
            background-color: #52B6FF;
            border: none;
            border-radius: 5px;
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 15.976px;
            color: #FFFFFF;
            cursor: pointer;
            transition: all 200ms;
            &:hover{
                border: 1px solid #52B6FF;
                color: #52B6FF;
                background-color: white;
            }
            &:disabled{
                background-color: #52B6FF;
                opacity: 0.7;
            }
        }
    }


`;

const DaysContainer= styled.div`
    display: flex;
    margin: 8px 0 29px 19px;
   
`;


const DaysContainerHabit = styled.div`
    display: flex;
    margin: 8px 0 0 14px;
`;

const DayContainerHabit = styled.div`

    &:nth-child(-n+6) {
        margin-right: 4px;
    }
    
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background: ${({id, days }) => days.includes(id) ? "rgba(207, 207, 207, 1)" : "rgba(255, 255, 255, 1)"};
    border: 1px solid #D5D5D5;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    .day-name{
        color: ${({id, days }) => days.includes(id) ? "#ffffff" : "#DBDBDB" };
    }
    
    margin-bottom: 10px;
    cursor: context-menu;
    
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 375px;
    padding: 92px 18px 20px 18px;


    h1 {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        color:  rgba(18, 107, 165, 1);
        position: fixed;
        left: 20px;
        top: 100px;
    }

    .add-habit-btn {
        width: 40px;
        height: 35px;
        position: fixed;
        right: 20px;
        top: 94px;
        color: ${(props) => props.creating  == 'true' ? 'red' :'#52B6FF'}; 
        cursor: pointer;
        transition: all 200ms;
        &:hover{
            color:${(props) => props.creating == 'true' ? '#8d2a2f' : '#2a648d'};
        }
    }
`;

const MyHabits = styled.div`

    margin-top: ${(props) => props.creating == 'true' ? 0 : '30px'};
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
`;

const HabitsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #E5E5E5;
        
    min-height: 100vh;
    padding-bottom: 100px;

    
    p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        color: #666666;
        padding: 0 10px;
    }

    .no-habits-message
    {
        width : calc(100% - 16px);
        margin-top: 30px;

    }
`;

const DayContainer = styled.div`

    &:nth-child(-n+6) {
        margin-right: 4px;
    }

    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background: ${({id, days }) => days.includes(id) ? "rgba(207, 207, 207, 1)" : "rgba(255, 255, 255, 1)"};
    border: 1px solid #D5D5D5;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    transition: all 200ms;
    color: ${({id, days }) => days.includes(id) ? "#FFFFFF" : "#DBDBDB" };
    cursor: pointer;

    &:hover
    {
        border: 1px solid #52B6FF;
    }

    p:hover{
        color: #52B6FF;
        
    }

`;


const HabitContainer = styled.div`
    width: calc(100% - 36px);
    height: auto;
    min-height: 91px;
    background-color: #FFFFFF;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position: relative;
    margin-bottom: 10px;

   
    

    .trash-icon {
        position: absolute;
        top: 0;
        right: 0;
        margin: 11px 10px 0 0;
        color: rgba(102, 102, 102, 1);
        font-size:15px;
        cursor: pointer;
        transition: all 200ms;
        &:hover{
            color: red;
        }
    }

    .habit-name {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        color: #666666;
        padding-top: 13px;
        padding-left: 15px;
        overflow: hidden;
        margin-right: 30px;
        padding-bottom: 5px;
    }
`;






