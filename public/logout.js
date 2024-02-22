function Logout(){
    const ctx = React.useContext(UserContext);
    ctx.loggedinUser = ""; 
 
  
    return(
        <Card
        header="Logout"
        title="Logout successful!"
        text='Please come back and give us more of your money!'
        body = {<div className="mt-3">
                <Link to="/#/">Log back in!</Link>
                </div>} 
      />

    )
};