import { useContext, useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import AuthenticationContext from "./AuthentictionContext";

export default function Authorized(props: authorizedProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { claims } = useContext(AuthenticationContext);

  useEffect(() => {
    if (props.role) {
      const index = claims.findIndex(
        (claim) => claim.name === "role" && claim.value === props.role
      );
      //if index is -1 means the user doesnt have this role
      //so it is not authorised
      setIsAuthorized(index > -1);
    } else {
      //if there is no role defined, it is enaught for the user 
      //to be authenticated in oredr to be authorized
      setIsAuthorized(claims.length > 0);
    }
  }, [claims, props.role]);

  return <>{isAuthorized ? props.authorized : props.notAuthorized}</>;
}

interface authorizedProps {
  //what the user see if he is authorised
  authorized: ReactElement;
  notAuthorized?: ReactElement;
  role?: string;
}
