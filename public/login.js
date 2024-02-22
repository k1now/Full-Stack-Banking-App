function Login(){
    const ctx = React.useContext(UserContext);
    const [show, setShow] = React.useState(true);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loginError, setLoginError] = React.useState(false);

    const history = ReactRouterDOM.useHistory();

    function handleLogin(e) {
        e.preventDefault();

    const LoginUrl = '/account/login';

    (async () => {
        try {
            const response = await fetch(LoginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Indicate that the request body format is JSON
                },
                body: JSON.stringify({email, password}), // Convert the JavaScript object to a JSON string
            });
            const user = await response.json();

            if (user) {
                console.log(user);
                ctx.loggedinUser = user;
                setShow(false);
                setLoginError(false);
                setTimeout(() => { history.push('/home/'); }, 2000);
            } else {
                setLoginError(true);
            }
        } catch (error) {
            console.error("Login failed:", error);
            setLoginError(true);
        }
    })();


    }

    return(
        <Card
        header="Log in to your account!"
        title={show ? "Wecome to K1 Bank!" : ''}
        text={loginError ? ('User not found!'):('')}    
        body={show ? (<>
        
        <form onSubmit={handleLogin}>
            Username<br/>
            <input type="email" className="form-control" id="userName" placeholder="Enter your email" value={email} onChange={e => setEmail(e.currentTarget.value)} required></input><br/>
            Password<br/>
            <input type="password" className="form-control" id="loginPassword" placeholder="Enter your password" value={password} onChange={e => setPassword(e.currentTarget.value)} required></input><br/>
            <button type="submit" className="btn btn-light" disabled={email === '' || password === ''}>Login</button><br/>
            <div className="mt-3">
                Not an existing user? <Link to="/CreateAccount/">Create a K1 Bank Account</Link>
            </div>

        </form>

            
            </>):(<>
                <h5>Successfully Logged In!</h5>
            </>)}
            />
    )
}