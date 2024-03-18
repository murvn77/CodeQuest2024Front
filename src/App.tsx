import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './layout/layout';
import Principal from './pages/principal/principal';
import GlobalContext from './store/Context';
import { useState } from 'react';

const App = () => {
  const [globalState, setGlobalState] = useState({
    isLoggedIn: false,
    userData: {}
  });
  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" Component={Principal} />
            <Route path="/principal" Component={Principal} />
          </Routes>
        </Layout>
      </Router>
    </GlobalContext.Provider>
  );
}
export default App;