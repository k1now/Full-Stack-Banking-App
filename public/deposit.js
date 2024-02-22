function Deposit(){
    const ctx                               = React.useContext(UserContext);
    const [depositAmount, setDepositAmount] = React.useState('');


     function handleDeposit(e) {
        e.preventDefault();
    
        // Prepare the data to be sent in the POST request
        const requestData = {
            email: ctx.loggedinUser.email,
            amount: Number(ctx.loggedinUser.balance) + Number(depositAmount), // Ensure this matches the key expected by your server
        };
    
        // Updated URL to match the server-side POST route
        const DepositUrl = `/account/updatebalance`;
    
        (async () => {
            try {
                const response = await fetch(DepositUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Indicate that the request body format is JSON
                    },
                    body: JSON.stringify(requestData), // Convert the JavaScript object to a JSON string
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {ctx.loggedinUser.balance = requestData.amount;}

                setDepositAmount(''); // Reset the deposit amount input after successful deposit
            } catch (error) {
                console.error('Failed to deposit:', error);
                // Handle errors, such as by showing an error message to the user
            }
        })();
    }
    

    return(
        
        <Card
        header="Deposit" 
        title={ctx.loggedinUser.balance != null ? (<>{`Total Balance: $${ctx.loggedinUser.balance}`}</>):(<></>)} 
        body={
        <form onSubmit={handleDeposit}>
            <input type="number" className="form-control" id="deposit" placeholder="Enter deposit amount" value={depositAmount} onChange={e => setDepositAmount(e.currentTarget.value)} required></input><br/>
            <button type="submit" className="btn btn-light" disabled={!depositAmount || Number(depositAmount) <= 0}>Deposit</button>
        </form>}
            />
    );
};


