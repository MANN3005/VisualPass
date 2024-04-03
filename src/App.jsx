import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx'; 
import TopLeagues from './pages/TopLeagues.jsx'; 
import PassingSimulator from './pages/PassingSimulator.jsx'; 
import NetworkGraph from './pages/NetworkGraph.jsx';
import PassingHeatmap from './pages/PassingHeatMap.jsx';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top-leagues" element={<TopLeagues />} />
          <Route path="/passing-simulator" element={<PassingSimulator />} />
          <Route path="/network-graph" element={<NetworkGraph />} />
          <Route path="/heatmap" element={<PassingHeatmap />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
