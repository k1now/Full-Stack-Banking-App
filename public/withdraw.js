function Withdraw(){
    const ctx                                 = React.useContext(UserContext);
    const [withdrawAmount, setWithdrawAmount] = React.useState('');
    
   

    /*function handleWithdraw(e){
        e.preventDefault();
        
        const newBalance = Number(ctx.loggedinUser.balance) - Number(withdrawAmount);
        ctx.loggedinUser.balance = newBalance;

        const WithdrawUrl = `/account/balance/${ctx.loggedinUser.email}/${ctx.loggedinUser.balance}`;

        (async () => {
            var res = await fetch(WithdrawUrl);
        })();
        
        setWithdrawAmount('');
    }*/


    function handleWithdraw(e) {
        e.preventDefault();
    
        // Prepare the data to be sent in the POST request
        const requestData = {
            email: ctx.loggedinUser.email,
            amount: Number(ctx.loggedinUser.balance) - Number(withdrawAmount), // Ensure this matches the key expected by your server
        };
    
        // Updated URL to match the server-side POST route
        const WithdrawUrl = `/account/updatebalance`;
    
        (async () => {
            try {
                const response = await fetch(WithdrawUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Indicate that the request body format is JSON
                    },
                    body: JSON.stringify(requestData), // Convert the JavaScript object to a JSON string
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {ctx.loggedinUser.balance = requestData.amount;}

                setWithdrawAmount(''); // Reset the withdraw amount input after successful deposit
            } catch (error) {
                console.error('Failed to deposit:', error);
                // Handle errors, such as by showing an error message to the user
            }
        })();
    }


    return(
        
        <Card
        header="Withdraw"    
        title={ctx.loggedinUser.balance != null ? (<>{`Total Balance: $${ctx.loggedinUser.balance}`}</>):(<></>)} 
        body={
        <form onSubmit={handleWithdraw}>
            <input type="number" className="form-control" id="withdraw" placeholder="Enter withdraw amount" value={withdrawAmount} onChange={e=> setWithdrawAmount(e.currentTarget.value)} required min={0}></input><br/>
            <button type="submit" className="btn btn-light" disabled={!withdrawAmount || Number(withdrawAmount) <= 0 || withdrawAmount > ctx.loggedinUser.balance}>Withdraw</button>
        </form>}
            />
    );
};