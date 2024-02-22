
function AllData() {
    const ctx = React.useContext(UserContext);
    const [allUsers, setAllUsers] = React.useState([]);

    const AllUsersUrl = '/account/all'

    React.useEffect(() => {
        (async () => {
            try {
                const response = await fetch(AllUsersUrl);
                const data = await response.json();
                setAllUsers(data);
            } catch (error) {
                console.error('Failed to fetch:', error);
            }
        })();
    }, []); // The empty dependency array ensures this effect runs only once after the initial render
    

    console.log(allUsers);

    return (
        <div className="cards-container">
            
            {ctx.loggedinUser && ctx.loggedinUser.name && (
                <Card
                    bgcolor="primary"
                    key="loggedinUser" 
                    header={`Logged-in User: ${ctx.loggedinUser.name}`}
                    text={
                        <>
                            email: {ctx.loggedinUser.email}<br />
                            password: {ctx.loggedinUser.password}<br />
                            balance: ${ctx.loggedinUser.balance}
                        </>
                    }
                />
            )}
            
            {allUsers.map((u, index) => (
                <Card
                    key={index}
                    header={u.name}
                    text={
                        <>
                            email: {u.email}<br />
                            password: {u.password}<br />
                            balance: ${u.balance}
                        </>
                    }
                />
            ))}
        </div>
    );
}


