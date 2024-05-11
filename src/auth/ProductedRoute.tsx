import { FC, ReactNode } from "react"
import { Navigate } from "react-router-dom";

interface IProps {
isAllowed:boolean;
redicrectPath:string;
children:ReactNode;
data?:unknown;
}
const ProductedRoute:FC<IProps> = ({isAllowed,children,redicrectPath,data}) => {
 if (!isAllowed) return <Navigate to={redicrectPath} replace state={data}/>;
 return children;
}

export default ProductedRoute;