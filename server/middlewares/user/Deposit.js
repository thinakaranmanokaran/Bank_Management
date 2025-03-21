exports.DepositRequest = ( req, res, next ) => {
    const { accountno, balance } = req.body

    if( !accountno || !balance ) {
        return res.status(400).json({ message: "All Fielsds are Required !"});
    }
    
    next();
}