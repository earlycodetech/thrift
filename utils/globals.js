import { createContext,useState } from "react";

const AppContext = createContext();

function AppProvider({children}) {
    const [uid,setUid] = useState('');
    const [email,setEmail] = useState('');
    const [userNames,setUserNames] = useState({fname:'',lname:''});

    return (
        <AppContext.Provider value={{uid,setUid,email,setEmail,userNames,setUserNames}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext,AppProvider}