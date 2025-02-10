import { HashRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/index.jsx';

function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
