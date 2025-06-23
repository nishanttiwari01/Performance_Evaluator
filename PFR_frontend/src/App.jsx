import Header from './Components/Header/Header'
import HomePage from './Components/HomePage/HomePage'
import HomeFooter from './Components/Footer/homeFooter'
import Form from './Components/form/form'
import etlQuestions from './Components/form/etlQuestion'
import biQuestions from './Components/form/biQuestion'
import ScorePage from './Components/scoringPage/scoringPage'
import PerfHome from './Components/perfHome/perfHome'
import PerfFooter from './Components/Footer/perfFooter'
import {Routes,Route,useLocation } from 'react-router-dom';

function App() {

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <div>
        
        <Header/>

        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/perf' element={<PerfHome/>}/>
          <Route path='/etlForm' element={<Form questions={etlQuestions} head='ETL'/>} />
          <Route path='/biForm' element={<Form questions={biQuestions} head='BI'/>} />
          <Route path='/score' element={<ScorePage/>}/>
        </Routes>

        {isHomePage ? <HomeFooter /> : <PerfFooter />}
      
      </div>
    </>
  )
}

export default App