// import logo from './logo.svg';
// import './App.css';
import { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  console.log(authService.currentUser);
  return <>
  <AppRouter isLoggedIn={isLoggedIn} />
  <footer> &copy; {new Date().getFullYear()} React Twitter </footer>
  </>
}

export default App;
