import classes from "./EventContent.module.css";

export default function EventContent({ children }) {
  return <section className={classes.content}>{children}</section>;
}
