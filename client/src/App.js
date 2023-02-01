import Navbar from "./components/navbar/";
import {Outlet} from "react-router-dom";
import './App.css';
import './reset.css';
import { AuthProvider } from "./context/";
import { CardProvider } from "./context/cardContext";

function App() {
  return (
    <AuthProvider>
      <CardProvider>
        <div className="App">
          <Navbar />
          <div id="detail">
            <Outlet />
          </div>
        </div>
      </CardProvider>
    </AuthProvider>
  );
}

export default App;
