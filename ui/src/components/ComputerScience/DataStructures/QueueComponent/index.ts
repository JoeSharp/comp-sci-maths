import QueueComponent from "./QueueComponent";
import PriorityQueueComponent from "./PriorityQueueComponent";
import { Page } from "../../../../types";

export const queuePage: Page = {
  href: "/computerScience/dataStructures/queue",
  title: "Queue",
  description: `Build a Queue and learn how items are added and removed.
  Items are enqueued and dequeued, the ordering follows First In First Out`,
  component: QueueComponent,
};

export const priorityQueuePage: Page = {
  href: "/computerScience/dataStructures/priorityQueue",
  title: "Priority Queue",
  description: `Build a Priority Queue and learn how items are added and removed with respect to priority.
  Items are enqueued and dequeued, the ordering follows First In First Out, but higher priority items will jump the queue`,
  component: PriorityQueueComponent,
};

export default QueueComponent;
