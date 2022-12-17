import { createContext,useState } from "react";

const AppContext = createContext();

function AppProvider({children}) {
    const [uid,setUid] = useState('fyedqghskljdsa');
    const [email,setEmail] = useState('meetme@yahoo.com');
    const [userNames,setUserNames] = useState({fname:'Adewale',lname:'Ciroma'});

    return (
        <AppContext.Provider value={{uid,setUid,email,setEmail,userNames,setUserNames}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext,AppProvider}