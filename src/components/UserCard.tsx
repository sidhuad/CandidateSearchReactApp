import { UserData } from "../interfaces/Candidate.interface";


export default function UserCard(info:UserData){
    const {avatar_url,login,location,email,company,bio} = info;
    return (
        <article>
            <section><img src={avatar_url} alt="User Profile Picture" /></section>
            <section>
                <h1>{login}</h1>
                <p>{location}</p>
                <p>{email}</p>
                <p>{company}</p>
                <p>{bio}</p>
            </section>
        </article>
    );
}