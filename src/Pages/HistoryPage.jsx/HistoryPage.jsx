import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";

export default function HistoryPage()
{
    const { user ,setUser } = useContext(UserContext);

    useEffect(()=>
    {
        if(localStorage.getItem('user-trackit'))
        {
            const lsUser = JSON.parse(localStorage.getItem('user-trackit'));
            setUser(lsUser);
           // GetAllHabits({headers: {Authorization: `Bearer ${lsUser.token}` }},updateHabits);
            return;
        }

         // GetAllHabits({headers: {Authorization: `Bearer ${user.token}` }},updateHabits);
       
    },[]);
    
    return (
        <>

        </>
    );
}