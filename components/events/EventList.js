import EventItem from "./EventItem";
import classes from "./EventList.module.css";
export default function EventList({ items }) {
  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <EventItem key={item.id} {...item} />
      ))}
    </ul>
  );
}
