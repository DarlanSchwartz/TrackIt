import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoExitOutline } from "react-icons/io5";



export default function Header() {
    const { user } = useContext(UserContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    function logout(event)
    {
        if(showDropdown === false)
        {
            return;
        }
        
        event.stopPropagation();
        localStorage.removeItem('user-trackit'); 
        navigate('/'); 
    }

    return (
        <HeaderSC data-test="header" >
            <HeaderApp>
                <span onClick={() => navigate('/hoje')}>TrackIt</span>
                <img onClick={() => setShowDropdown(!showDropdown)} src={user.image} alt="profile" data-test="avatar" />
            </HeaderApp>
            <Dropdown className={showDropdown ? 'open' : ''}>
                <p className="dp-user-name" >{user.name}</p>
                <button onClick={(e) => logout(e)} className="logout-btn">
                    <IoExitOutline className="logout-icon" />
                    Sair
                </button>
            </Dropdown>
        </HeaderSC>
    );
}

const Dropdown = styled.div`
    width: 130px;
    box-sizing: border-box;
    border-radius: 5px;
    position: fixed;
    right:10px;
    top: -100px ;
    z-index: 5;
    background-color: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 200ms;
    font-family: 'Lexend Deca';

    .dp-user-name
    {
        width: 60px;
        height: 25px;
        color: #126BA5;
        text-align: center;
        font-size: 20px;
        width: 100%;
        margin-top: 5px;
    }

    &.open{
        top: 65px;
    }

    button
    {
        display: flex;
        align-items: center;
        gap: 15px;
        background-color: white;
        border: 0;
        color: #126BA5;
        width: 60px;
        height: 25px;
        cursor: pointer;
        transition: all 200ms;
        width: 100%;
        font-size: 20px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;

        .logout-icon{
            transform: scale(-100%);
        }

        &:hover{
            background-color: #dadada;
        }
    }
`;

const HeaderSC = styled.div`


`;

const HeaderApp = styled.div`
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    width: 100%;
    height: 70px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 18px;
    
    img {
        width: 51px;
        height: 51px;
        background-position: 50% 50%;
        background-size: cover;
        border-radius: 50%;
        cursor: pointer;
    }

    span {
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 38.982px;
        color: #FFFFFF;
        cursor: pointer;
    }
`;