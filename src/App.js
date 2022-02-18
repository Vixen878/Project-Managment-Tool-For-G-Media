import './App.css';
import './styles/output.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/Error';
import Register from './pages/register';
import { UseAuthContext } from './hooks/useAuthContext'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import ResetPassword from './pages/resetPassword';
import NavBar from './components/NavBar';
import { useEffect } from 'react';
import Requests from './pages/Requests';
import Settings from './pages/Settings';
import Project from './pages/Project';

function App() {

  const { authIsReady, user } = UseAuthContext()

  return (
    <div className='flex'>
      {authIsReady && (
        <BrowserRouter>
          <div className='flex'>
            {user && <NavBar />}
          </div>
          <Switch>
            <Route exact path="/">
              {!user && <Redirect to="/login" />}
              {user && <Dashboard />}
            </Route>
            <Route path="/login" >
              {user && <Redirect to="/" />}
              {!user && <LoginPage />}
            </Route>
            <Route path="/register">
              {user && <Redirect to="/" />}
              {!user && <Register />}
            </Route>
            {/* <Route path="/projects/:id">
              {!user && <Redirect to="/login" />}
              <Projects />
            </Route> */}
            <Route path="/settings">
              {!user && <Redirect to="/login" />}
              {user && <Settings />}
            </Route>
            <Route path="/requests/:id">
              {!user && <Redirect to="/login" />}
              <Requests />
            </Route>
            <Route path="/project/:id">
              {user && <Project />}
              {!user && <LoginPage />}
            </Route>
            <Route path="/reset">
              <ResetPassword />
            </Route>
            <Route path="*">
              <ErrorPage />
            </Route>
          </Switch>
        </BrowserRouter>
      )}



      {/* {authIsReady && (
        <Router>
          <Routes>
            <Route path="/" element={
              !user && <Navigate to={"/login"} />,
              user && <Dashboard /> 
            } />
            <Route path="/login" element={
              user && <Navigate to={"/"} />,
              !user && <LoginPage />
            } />
            <Route path="/register" element={
              user && <Navigate to={"/"} />,
              !user && <Register />
            } />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      )} */}
    </div>
  );
}

export default App;
