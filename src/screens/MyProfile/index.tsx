import React, { useEffect, useState } from "react";
import { User } from "../../schemas/user";
import UserProfile from "../UserProfile/index";
import UserService from "../../services/UserService";


export default function MyProfile(){
    const [user, setUser] = useState<User>();

    async function getUser(){ 
        const user = await UserService.whoami()
        setUser(user)
        console.log(user)
    };

    useEffect(() => {
        getUser();
    }, []);
        
    return (
        <UserProfile {...user}/>
    );
}