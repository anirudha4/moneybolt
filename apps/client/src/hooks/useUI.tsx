import { useContext } from "react"
import { UIContext } from "@contexts";
import { UIContextType } from "@lib/types/contexts";

const useUI = () => useContext(UIContext) as UIContextType;
export default useUI;