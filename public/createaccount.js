function CreateAccount(){
    const ctx = React.useContext(UserContext);

    const [show, setShow] = React.useState(true);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const history = ReactRouterDOM.useHistory();


    function handleCreate(e){
        e.preventDefault();
        
    

    const CreateAccountUrl = '/account/create';
    const newUser = {name, email, password, balance:0};

    (async () => {
        try {
            const response = await fetch(CreateAccountUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Indicate that the request body format is JSON
                },
                body: JSON.stringify(newUser), // Convert the JavaScript object to a JSON string
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {ctx.loggedinUser = newUser}

            setShow(false);
            setTimeout(() => {history.push('/home/')}, 2000);

            
        } catch (error) {
            console.error('Failed to create account:', error);
            // Handle errors, such as by showing an error message to the user
        }
    })();
    };

    return(
        <Card
        header="Create Account"
        title="Create an account with us!"    
        body={show ? (<>
        <form onSubmit={handleCreate}>
            Name<br/>
            <input type="text" className="form-control" id="name" placeholder="Enter your name!" value={name} onChange={e => setName(e.currentTarget.value)} required></input><br/>
            Email<br/>
            <input type="email" className="form-control" id="email" placeholder="Enter your email!" value={email} onChange={e => setEmail(e.currentTarget.value)} required></input><br/>
            Password<br/>
            <input type="password" className="form-control" id="password" placeholder="Enter your password!" value={password} onChange={e => setPassword(e.currentTarget.value)} required minLength="8"></input><br/>
            <button type="submit" className="btn btn-light" disabled={name === '' || email === '' || password === ''}>Create Account</button><br/>
            <div className="mt-3">
                Already have an account? <Link to="/#/">Login</Link>
            </div>

        </form>
            
            </>):(<>
                <h5>"You've Successfully Created an Account with K1 Bank!"</h5>
            
            </>)}
            />
        
    )
};