import { Routes, Route, Link} from 'react-router-dom';
import ListUser from './Components/ListUsers';


function App() {

return(
  <>
  <Routes>
    <Route index element = {<ListUser />} ></Route>
   
  </Routes>
  </>

)
}

export default App;