import { useEffect, useState } from "react";
import { UserData } from "../interfaces/Candidate.interface";
import emptybook from "../assets/giphy.gif";

const SavedCandidates = () => {

  const [usersData, setUsersData] = useState<UserData[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem('UserInfo');
    if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUsersData(parsedData);
    }else{
      setUsersData([]);
    }
  },[]);

  const removeCand = (id:number) => {
    //filtering all elements which does not match the id and updating usersData while re rendering the component simultaneously
    const newArray = usersData.filter(element => element.id != id);
    // updating local storage to reflect the changes
    localStorage.setItem('UserInfo',JSON.stringify(newArray));
    setUsersData(newArray);
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      {
        usersData.length !== 0?(
      <table className="table table-hover ">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>E-mail</th>
            <th>Company</th>
            <th>Bio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>    
          {usersData.map((element) => (
            <tr key={element.id}>
              <td>{element.login}</td>
              <td>{element.location}</td>
              <td>{element.email}</td>
              <td>{element.company}</td>
              <td>{element.bio}</td>
              <td className="custBtn" onClick={()=>removeCand(element.id)}>Remove</td>
            </tr>
          ))}
        </tbody>
      </table>
        ):<div className="nodata"><img src={emptybook} alt="Emptybook"/><br></br>No Data Available <span className="dot1">.</span><span className="dot2">.</span><span className="dot3">.</span><span className="dot4">.</span></div>
      }
    </>
  );
};

export default SavedCandidates;
