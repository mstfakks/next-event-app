import { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/EventSummary";
import EventLogistics from "../../components/event-detail/EventLogistic";
import EventContent from "../../components/event-detail/EventContent";
import Head from "next/head";
import Comments from "../../components/input/Comments";

export default function EventDetailPage({ selectedEvent }) {
  const specificEvent = selectedEvent;

  if (!specificEvent) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <Fragment>
      <Head>
        <title>{selectedEvent.title}</title>
        <meta name="description" content={selectedEvent.description} />
      </Head>
      <EventSummary title={specificEvent.title} />
      <EventLogistics
        address={specificEvent.location}
        date={specificEvent.date}
        image={specificEvent.image}
        imageAlt={specificEvent.title}
      />
      <EventContent>
        <p>{specificEvent.description}</p>
      </EventContent>
      <Comments eventId={specificEvent.id} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const { eventId } = params;
  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const pathWithParams = events.map((event) => ({
    params: { eventId: event.id },
  }));
  return {
    paths: pathWithParams,
    fallback: true,
  };
}
