import './App.css';
import Nav from './components/Nav';
import ForSale from './components/ForSale';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/for-sale" element={<ForSale />} />
      </Routes>
    </div>
  );
}

export default App;
