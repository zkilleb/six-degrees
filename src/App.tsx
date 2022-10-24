import { Routes, Route } from 'react-router-dom';

import './App.css';
import { Home, NotFound } from './routes';

function App() {
  return (
    <div className={'App'}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
