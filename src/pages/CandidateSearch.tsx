import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import UserCard from "../components/UserCard";
import { UserData } from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [userData, setUserData] = useState<UserData>({} as UserData);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const data = await searchGithub();
      const userLoginInfo = data.map((element) => element.login);
      setUsers(userLoginInfo);
    };
    getData();
  }, []);


  // useEffect(() => {
  //   if (users.length > 0) {
  //     const UserInfo = async () => {
  //       const info = await Promise.all(
  //         users.map(async (element) => await searchGithubUser(element))
  //       );
  //       setUserData(info);
  //     };
  //     UserInfo();
  //   }
  // }, [users]);

  
  useEffect(() => {
    if (users.length > 0 && count < 30) {
      const UserInfo = async () => {
       const data = await searchGithubUser(users[count])
       if (!data.login) {
        console.log('skipping user',count);
        setCount(count + 1);
        return;
       }
       setUserData(data);
      };
      UserInfo();
    }
  }, [users,count]);


  
  useEffect(() => {
    console.log(users); // printing users to console
    console.log(userData); // pprinting a single user data
  }, [users, userData]);


  const nextCard = () => {
    if (count < users.length) {
      setCount(count + 1);
    }
  };
  
  const nextCardAndSave = () => {
    if (count < users.length) {
      const savedData = JSON.parse(localStorage.getItem("UserInfo") || "[]");
      const userObj = {
        avatar_url: userData.avatar_url,
        name:userData.name,
        id:userData.id,
        login: userData.login,
        location: userData.location,
        email: userData.email,
        company: userData.company,
        bio: userData.bio,
      };

      savedData.push(userObj);
      localStorage.setItem('UserInfo',JSON.stringify(savedData));
      setCount(count + 1);
    }
  };

  if (users.length === 0) return <div>Loading data ....</div>;
  if (count === users.length - 1) return <div>End Of List....</div>


  return (
    <>
      <h1>CandidateSearch</h1>
      <UserCard
        avatar_url={userData.avatar_url}
        login={userData.login}
        name={userData.name}
        id={userData.id}
        location={userData.location || 'No Data Available'}
        email={userData.email || 'No Data Available'}
        company={userData.company || 'No Data Available'}
        bio={userData.bio || 'No Data Available'}
      />
      <div className="d-flex flex-row justify-content-evenly buttons my-3">
        <button className="btn p-3 btn-danger btnReject" onClick={nextCard}>
          Reject
        </button>
        <button
          className="btn p-3 btn-warning btnAdd "
          onClick={nextCardAndSave}
          disabled={count === users.length - 1}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default CandidateSearch;
