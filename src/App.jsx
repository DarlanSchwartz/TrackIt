import { useState } from 'react';
import { Routes,Route, useLocation } from 'react-router-dom';
import UserContext from './contexts/UserContext';
import Header from './Components/Header';
import LoginPage from './Pages/LoginPage/LoginPage';
import SingupPage from './Pages/LoginPage/SingupPage.jsx';
import TodayPage from './Pages/TodayPage/TodayPage';
import Footer from './Components/Footer.jsx';
import HabitsPage from './Pages/HabitsPage/HabitsPage.jsx';
import HistoryPage from './Pages/HistoryPage.jsx/HistoryPage.jsx';
import ErrorPage from './Pages/ErrorPage/ErrorPage.jsx';
import CookieConsent from 'react-cookie-consent';


export default function App() {

  let currentLocation = useLocation();

  const [user, setUser] = useState('');
  const [completedHabits, setCompletedHabits] = useState(0);

  return (
    <UserContext.Provider value={{user, setUser, completedHabits, setCompletedHabits}}>
        {currentLocation.pathname != "/" && currentLocation.pathname != "/cadastro" && <> <Header/> <Footer/> </>}
        <Routes>
            <Route path='/' element = {<LoginPage/>}/>
            <Route path='/cadastro' element={<SingupPage/>}/>
            <Route path="/hoje" element={<TodayPage />}/>
            <Route path="/habitos" element={<HabitsPage />}/>
            <Route path="/historico" element={<HistoryPage />}/>
            <Route path="*" element={<ErrorPage generic ='true'/>}/>
            <Route path="/error" element={<ErrorPage generic ='false'/>}/>
        </Routes>
        <CookieConsent 
          buttonStyle={{textAlign:'center',backgroundColor:'#52B6FF',borderRadius:5,color:'white',width:'50px',position:'fixed',right:'20px',bottom:'-2px'}} 
          style={{textAlign:'center',backgroundColor:'#126BA5',flexWrap:'nowrap',alignItems:'center',maxWidth:'100%',height:50}} 
          buttonId='sadkasdkjh12123jkhdsakj'
          buttonText = "Ok"
        >
          <span style={{fontFamily: 'Lexend Deca', fontSize: 15,width:'auto',maxWidth:'200px',position:'fixed',left:'50%',bottom:'18px',transform:'translateX(-55%)'}}>Esse site usa cookies!</span>
        </CookieConsent>
    </UserContext.Provider>
  )
}
