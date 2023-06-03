import { useEffect, useState } from "react";
import { BsCheckSquareFill } from "react-icons/bs";
import styled from "styled-components";
import loadingGif from '../../assets/loading.gif';

export default function Habit({ habit, handleClick,loading }) {
    const { name, currentSequence, highestSequence, done } = habit;
    const [changing,setChanging] = useState(false);


    function click()
    {
        if(changing || loading == 'true')
        {
            return;
        }
        
        handleClick();
        setChanging(true);
    }

    useEffect( ()=>{
        
        if(changing && loading == 'false')
        {
            setChanging(false);
        }

    },[loading])



    return (
        <TodayHabitContainer data-test="today-habit-container" done={done} currentSequence={currentSequence} highestSequence={highestSequence} >
            <h1 data-test="today-habit-name" >{name}</h1>
            <p data-test="today-habit-sequence" >Sequência atual: <span className="current-sequence">{currentSequence} dias</span></p>
            <p data-test="today-habit-record" >Seu recorde: <span className="highest-sequence">{highestSequence} dias</span></p>
            <BsCheckSquareFill data-test="today-habit-check-btn" className="check" onClick={click} />
            {changing && loading == 'true' && <img className="loading-gif" src={loadingGif}/>}
        </TodayHabitContainer>
    )
}

const TodayHabitContainer = styled.div`
    width: calc(100% - 36px);
    margin-left: 18px;
    margin-right: 18px;
    min-height: 94px;
    background-color:#ffffff;
    border-radius: 5px;
    position: relative;
    margin-bottom: 10px;

    .loading-gif{
        position: absolute;
        top: 0;
        right: 0;
        margin: 13px 0 0 0;
        width: 100px;
    }

    &:last-child {
        margin-bottom: 120px;
    }

    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        color: #666666;
        margin: 13px 0 7px 15px;
        width: calc(100% - 105px);
        flex-wrap: wrap;
    }

    p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        color: #666666;
        margin: 0 0 5px 15px;

        .current-sequence {
            color: ${(props) => (props.done ? '#8FC549' : '#666666')};
        }

        .highest-sequence {
            color: ${(props) => props.highestSequence !== 0 && props.currentSequence >= props.highestSequence ? '#8FC549' : '#666666'};
        }
    }

    .check {
        font-size: 69px;
        position: absolute;
        top: 0;
        right: 0;
        margin: 13px 13px 0 0;
        cursor: pointer;
        transition: all 200ms;
        fill: ${(props) => props.done ? "#8FC549" : '#E7E7E7'};

        &:hover{
            fill: ${(props) => props.done ? "#6b9633" : '#9ba88bf4'}
        }
    }
`;