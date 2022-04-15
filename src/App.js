import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import ForSale from './components/ForSale';
import Sell from './components/Sell';
import Basket from './components/Basket';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  // const [allUsers, setAllUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(null);

  return (
    <div className="App">
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<Home loggedIn={loggedIn} />} />
        <Route path="/for-sale" element={<ForSale loggedIn={loggedIn} />} />
        <Route path="/selling" element={<Sell loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path="/basket" element={<Basket loggedIn={loggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
