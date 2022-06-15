import './App.css';
import { Routes, Route } from 'react-router-dom';
// import { Typography, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Container, Grid, Toolbar } from '@mui/material'

// Components
import Nav from './components/Nav';
import Home from './components/Home';
import ForSale from './components/ForSale';
import Sell from './components/Sell';
import Basket from './components/Basket';
import MyAccount from './components/MyAccount';
import OrderHistory from './components/OrderHistory';

function App() {
  // // const [allUsers, setAllUsers] = useState([]);
  // const [loggedIn, setLoggedIn] = useState(null);

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/for-sale" element={<ForSale />} />
        <Route path="/selling" element={<Sell />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
      </Routes>
    </div>
  );
}

export default App;
