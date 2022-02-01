import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import BasicList from "./BasicList";
import BillingList from "./BillingList";
import NotFound from "./NotFound";

function App() {
  return (
    <div className="App">
      <header className="App-header">Routing / Context/Reducer / Redux</header>
      <div className="main-container">
      <div className="options-container">
        <Link to="/home">
          <span>Home</span>
          </Link>
        <div className="option">
          <Link
            // onClick={(e) => setSelectedList("Basic")}
            // className={selectedList === "Basic" ? "selected" : ""}
            to="/basic"
          >
            <span>Basic Product List</span>
          </Link>
        </div>
        <div className="option">
          <Link
            // onClick={(e) => setSelectedList("Billing")}
            // className={selectedList === "Billing" ? "selected" : ""}
            to="/billing"
          >
            <span>Billing Product List</span>
          </Link>
          
        </div>
        <div className="option">
        <Link to="/nowhere">
            <span>Go Somewhere else</span>
          </Link>
        </div>
      </div>
      <div className="pages-container">
        <Routes>
          <Route exact path="/home/billing" element={<BillingList />} />
          <Route exact path="/billing" element={<BillingList />} />
          <Route exact path="/basic" element={<BasicList />} />
          <Route exact path="/home/basic" element={<BasicList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
    </div>
  );
}

export default App;
