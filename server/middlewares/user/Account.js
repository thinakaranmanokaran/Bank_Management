exports.AccountRequest = ( req, res, next ) => {
    const { email, accountno, balance } = req.body

    if( !email || !accountno || !balance ) {
        return res.status(400).json({ message: "All Fielsds are Required !"});
    }
    
    next();
}