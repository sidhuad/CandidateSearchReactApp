import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import UserCard from "../components/UserCard";
import { UserData } from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [userData,setUserData] = useState<UserData[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await searchGithub();
      const userLoginInfo = data.map(element => element.login);
      setUsers(userLoginInfo);
    };
    getData();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
    const UserInfo = async () => {
        const info = await Promise.all(users.map( async element => await searchGithubUser(element)));
        setUserData(info);
      }
      UserInfo();
    }; 
  },[users])

  useEffect(() => {
    console.log(users); // printing users to console
    console.log(userData);
    
  }, [users,userData]);

  return (
    <>
      <h1>CandidateSearch</h1>
      { userData.map(element => {
        return <UserCard avatar_url={element.avatar_url} login={element.login} location={element.location} email={element.email} company={element.company} bio={element.bio}  />
      })}
    </>
);
};

export default CandidateSearch;
