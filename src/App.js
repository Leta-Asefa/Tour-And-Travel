import './output.css'
import './input.css'
import Signup from './Components/Signup';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/NavigationBar';
import Footer from './Components/Footer';
import Dashboard from './Components/Dashboard';
import SiteIntro from './Components/DisplaySites';
import Login from './Components/Login';
import AddSite from './Components/AddSites';
import SiteDetails from './Components/DisplaySiteDetail';
import AddGuide from './Components/AddGuide';
import GuideIntro from './Components/DisplayGuides';
import GuideDetails from './Components/DisplayGuideDetails';
import Logout from './Components/LogOut';
import WaitingList from './Components/WaitingListDetails';
import WaitingListIntro from './Components/DisplayWaitingList';
function App() {
  return (
    <Router>
      <div className='bg-slate-300 block'>
        <Navbar/>
        <div>
          <Switch>
          <Route exact path='/'>
                <Dashboard/>
            </Route>
            <Route exact path='/signup'>
                <Signup/>
            </Route>
            <Route exact path='/login'>
                <Login/>
            </Route>
            <Route exact path='/logout'>
                <Logout/>
            </Route>
            <Route exact path='/sitelist'>
                <SiteIntro/>
            </Route>
            <Route exact path='/addsite'>
                <AddSite/>
            </Route>
            <Route exact path='/sitedetails/:siteName'>
                <SiteDetails />
            </Route>
            <Route exact path='/addguide'>
                <AddGuide />
            </Route>
            <Route exact path='/guidelist'>
                <GuideIntro />
            <Route exact path='/guidedetails/:phoneNumber'>
                <GuideDetails />
            </Route>
            </Route>
            <Route exact path='/waitingguideslist'>
                <WaitingListIntro />
            </Route>
            <Route exact path='/waitingguide/:phoneNumber'>
                <WaitingList />
            </Route>
            


          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
   
  );


}

export default App;













