export default password => {
    if(false === /[A-Z]/.test(password))
        return false;
    if(false === /\d/.test(password))
        return false;
    return true;
};