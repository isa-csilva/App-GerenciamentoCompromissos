import './App.css';
import Login from './pages/Login'
import Home from './pages/Home';
import Rotas from './routes';

function App() {
  return (
    <div className="App">
        <Rotas>
          <Login />
          <Home />
        </Rotas>
    </div>
  
  );
}

export default App;
