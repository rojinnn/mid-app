import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import BasicList from "./BasicList";
import BillingList from "./BillingList";
import NotFound from "./NotFound";
import { Provider as AuthProvider, useAuth } from "./context/UserContext";
import { useParams } from "react-router-dom";
import SettingsPage from './containers/Settings';

const routeOptions = [
{
  path: '/basic',
  title: 'Basic List'
},
{
  path: '/billing',
  title: 'Billing List'
},
{
  path: '/settings',
  title: 'Settings'
},
] ;
function App(props) {

const params = useParams();
// const {*} = params;
const currentPath = '/'+params['*'];
const { data: { role }} = useAuth()

console.log(params,params['*'], role, props,'check params');
  return (
    <div className="App">
      <header className="App-header">Routing / Context/Reducer / Redux</header>
      <div className="main-container">
      <div className="options-container">
        <Link to="/home">
          <span>Home</span>
          </Link>
          {routeOptions.map(opt => role !== 'admin' && ['/settings', '/billing'].includes(opt.path) ? null :
            (<div key={opt.path} className={`option ${currentPath===opt.path ? 'current': ''}`}>
            <Link
              // onClick={(e) => setSelectedList("Basic")}
              // className={selectedList === "Basic" ? "selected" : ""}
              to={opt.path}
            >
              <span>{opt.title}</span>
            </Link>
          </div>
          ))}
      </div>
      <div className="pages-container">
        {/* <AuthProvider> */}
        <Routes>
          <Route exact path="/home/billing" element={<BillingList />} />
          <Route exact path="/billing" element={<BillingList />} />
          <Route exact path="/basic" element={<BasicList />} />
          <Route exact path="/settings" element={<SettingsPage />} />
          <Route exact path="/home/basic" element={<BasicList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* </AuthProvider> */}
      </div>
    </div>
    </div>
  );
}

export default App;
