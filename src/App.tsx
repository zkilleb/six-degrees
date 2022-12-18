import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Footer, Header } from './components';
import { Home, NotFound } from './routes';
import { getActorByName } from './api';
import React from 'react';
function App() {
  React.useEffect(() => {
    getActorByName('Brendan Gleeson').then(console.log);
  }, []);
  return (
    <div className={'App'}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
