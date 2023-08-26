import { AuthContext } from "@contexts";
import { ContextType } from "@lib/types/contexts";
import { useContext } from "react"

const useAuth = () => useContext(AuthContext) as ContextType;
export default useAuth;