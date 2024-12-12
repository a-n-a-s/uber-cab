import React, { createContext , useState } from "react";

export const UserData = createContext();
const UserContext = ({ children }) => {

    const [user,setUser] = useState({
        email:'',
        fullName : {
            firstName: '',
            lastName: ''
        },
        password: '',
        
    })

  return (
    <div>
      <UserData.Provider  user={[user,setUser]} >{children}</UserData.Provider>
    </div>
  );
};

export default UserContext;
