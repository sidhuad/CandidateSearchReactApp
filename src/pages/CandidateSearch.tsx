import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import UserCard from "../components/UserCard";
import { UserData } from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const data = await searchGithub();
      const userLoginInfo = data.map((element) => element.login);
      setUsers(userLoginInfo);
    };
    getData();
  }, []);


  useEffect(() => {
    if (users.length > 0) {
      const UserInfo = async () => {
        const info = await Promise.all(
          users.map(async (element) => await searchGithubUser(element))
        );
        setUserData(info);
      };
      UserInfo();
    }
  }, [users]);

  
  useEffect(() => {
    console.log(users); // printing users to console
    console.log(userData); // pprinting a single user data
  }, [users, userData]);


  const nextCard = () => {
    if (count < userData.length) {
      setCount(count + 1);
    }
  };
  
  const nextCardAndSave = () => {
    if (count < userData.length) {
      const savedData = JSON.parse(localStorage.getItem("UserInfo") || "[]");
      const userObj = {
        avatar_url: userData[count].avatar_url,
        name:userData[count].name,
        id:userData[count].id,
        login: userData[count].login,
        location: userData[count].location,
        email: userData[count].email,
        company: userData[count].company,
        bio: userData[count].bio,
      };

      savedData.push(userObj);
      localStorage.setItem('UserInfo',JSON.stringify(savedData));
      setCount(count + 1);
    }
  };

  if (userData.length === 0) return <div>Loading data ....</div>;
  if (count === userData.length) return <div>End Of List....</div>


  return (
    <>
      <h1>CandidateSearch</h1>
      <UserCard
        avatar_url={userData[count].avatar_url}
        login={userData[count].login}
        name={userData[count].name}
        id={userData[count].id}
        location={userData[count].location}
        email={userData[count].email}
        company={userData[count].company}
        bio={userData[count].bio}
      />
      <div className="d-flex flex-row justify-content-evenly buttons my-3">
        <button className="btn p-3 btn-danger btnReject" onClick={nextCard}>
          Reject
        </button>
        <button
          className="btn p-3 btn-warning btnAdd "
          onClick={nextCardAndSave}
          disabled={count === userData.length - 1}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default CandidateSearch;
