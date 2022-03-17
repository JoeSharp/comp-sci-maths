import { stackReducer, getInitialStackState } from "../../dataStructures/stack/stackReducer";
import graphTraversal from "./graphTraversal";

export default graphTraversal(getInitialStackState, stackReducer);
