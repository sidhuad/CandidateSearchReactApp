import { UserData } from "../interfaces/Candidate.interface";

export default function UserCard(info:UserData){
    const {avatar_url,login,name,location,email,company,bio} = info;
    return (
        <article className="card p-0 bg-dark" style={{width:"24rem"}}>
            <img className="card-img-top p-2" src={avatar_url} alt="User Profile Picture" />
            <section className="card-body bg-dark">
                <h1 className="card-title text-white text-decoration-underline">{login}({name})</h1>
                <p className="card-text text-white">Location: {location}</p>
                <p className="card-text text-white">Email: {email}</p>
                <p className="card-text text-white">Company: {company}</p>
                <p className="card-text text-white">Bio: {bio}</p>
            </section>
        </article>
    );
}