
function Spa(){

    //Making the NavBar conditional so that it doesn't show up for login, create account and logout pages
    function ConditionalNavBar() {
        let location = ReactRouterDOM.useLocation();
        if (location.pathname === '/' || location.pathname === '/CreateAccount/' || location.pathname === '/logout/') {
          return null; 
        }
        return <NavBar />; 
      }

    return(<>
        <HashRouter>
            
        <ConditionalNavBar />
            <UserContext.Provider value = {{loggedinUser: {}}}>
    
                <Route path="/" exact component={Login}/>
                <Route path="/home/" exact component={Home}/>
                <Route path="/CreateAccount/" exact component={CreateAccount}/>
                <Route path="/deposit/" exact component={Deposit}/>
                <Route path="/withdraw/" exact component={Withdraw}/>
                <Route path="/alldata/" exact component={AllData}/>
                <Route path="/logout/" exact component={Logout}/>
            
            </UserContext.Provider>
        
        </HashRouter>
        
    </>)
};

ReactDOM.render(<Spa/>, document.getElementById('root'));


