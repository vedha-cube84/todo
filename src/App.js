import React from 'react';
import { BrowserRouter, Route ,Switch } from "react-router-dom"
// import Login from './pages/Login';
// import Register from './pages/Register';
// import TodoList from './pages/TodoList';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './routes/Home';
// import { AuthProvider } from './authContext';
// import ProtectedRoute from './ProtectedRoute';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import header from "./layouts/header";
// import footer from "./layouts/footer";
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route exact path="/" element={<Dashboard/>} />
//           <Route path="/dashboard" component={Dashboard} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }
const App = () => {
  // const [token, setToken] = useState(localStorage.getItem('token'));
  return (
    // <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
    // </AuthProvider>
  );
};

export default App;
