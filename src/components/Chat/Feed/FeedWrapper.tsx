import { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface FeedWrapperProps {
    session : Session
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({session}) => {
  return <div>
     <button className="bg-green-400" onClick={()=>signOut()}>
   Sign Out</button>
  </div> ;
};

export default FeedWrapper;
