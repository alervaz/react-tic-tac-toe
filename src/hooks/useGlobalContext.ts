import { useContext } from "react"
import { GlobalContext } from "../App"

const useGlobalContext = () => {
    return useContext(GlobalContext);
}


export default useGlobalContext;