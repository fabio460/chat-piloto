
import './App.css';
import Home from './Componentes/Home/Home';
import Login from './Componentes/Login/Login';
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth';

function App() {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  
  return (
    <div className="App">
       {user
         ?
          <Home/>
         :
          <Login /> 
       }
    </div>
  );
}

export default App;
