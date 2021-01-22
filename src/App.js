
import './App.css';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Category from './components/Catagory';

function App() {
  return (
    <div className="App">
        <div style={{flex:1}}>
          <Topbar/>
          <Category/>
        </div>
        <div>
          <Navbar/>
        </div>
    </div>
  );
}

export default App;
