import './App.css';
import Nav from './components/Nav';
import ForSale from './components/ForSale';
import Sell from './components/Sell';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/for-sale" element={<ForSale />} />
        <Route path="/selling" element={<Sell />} />
      </Routes>
    </div>
  );
}

export default App;
