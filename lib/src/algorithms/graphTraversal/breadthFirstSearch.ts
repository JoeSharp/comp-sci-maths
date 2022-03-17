import { queueReducer, getInitialQueueState } from "../../dataStructures/queue/queueReducer";
import graphTraversal from "./graphTraversal";

export default graphTraversal(getInitialQueueState, queueReducer);