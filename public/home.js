function Home(){
    const ctx = React.useContext(UserContext);
    const CardTitle = () => (
        <>
          <div>Welcome to K1 Bank, {ctx.loggedinUser.name}!</div>
          {ctx.loggedinUser.balance != null && (
            <div>Total Balance: ${ctx.loggedinUser.balance}</div>
          )}
        </>
      );
    
    return(
          <Card
            header="Home Page"
            title={<CardTitle />}
            text="Give us all your money!"
            body={<img src='k1bank.png' className="img-fluid" alt="Responsive image"/>}
          />
          
    );
};


