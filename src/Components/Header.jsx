import UserContext from "../contexts/UserContext";
import {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Header()
{
    const {user} = useContext(UserContext);
    const [showDropdown,setShowDropdown] = useState(false);
    const navigate = useNavigate();

    return (
       <HeaderSC data-test="header" >
        <HeaderApp>
                <span onClick={() => navigate('/hoje')}>TrackIt</span>
                <img onClick={()=> setShowDropdown(!showDropdown)} src={user.image} alt="profile" data-test="avatar" />
        </HeaderApp>

        {showDropdown && <button onClick={()=> { localStorage.removeItem('user-trackit'); navigate('/');}} className="logout-btn">Sair</button>}
       </HeaderSC>
    );
}

const HeaderSC = styled.div`

button{
    position: fixed;
    right: 84px;
    top: 25px;
    z-index: 4;
    background-color: #126BA5;
    border: 1px solid white;
    border-radius: 5px;
    color: white;
    width: 60px;
    height: 25px;
    cursor: pointer;
    transition: all 200ms;
    &:hover{
        color: #126BA5;
        border: 1px solid #126BA5;
        background-color: white;
    }
}

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
`