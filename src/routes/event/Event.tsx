import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEvent } from "../../contexts/EventContext";
import EventGroupDetail from "./EventGroupDetail";
import EventDetail from "./EventDetail";
import EventConnectionsContainer from "./EventConnectionsContainer";
import EventMapContainer from "../../components/EventMapContainer";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";
import EventWrapper from "./EventWrapper";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import { useUser } from "../../contexts/UserContext";
import { useEventModal } from "../../contexts/EventModelContext";

const Event = () => {
  const { id } = useParams();
  const { isMobile } = useScreenWidth();
  const { isUserAttendingEvent } = useUser();
  const navigate = useNavigate();
  const {
    event,
    eventGroup,
    eventConnections,
    getEventById,
    getGroupById,
    getEventConnections,
    updateEvent,
    removeEvent,
  } = useEvent();
  const { description, free, priceBands, location, approved } = event || {};

  const { lat, lng, placename } = location || {};

  const { openEventModal, isVisible } = useEventModal();

  const handleJoinEvent = () => openEventModal(event, "join");
  const handleGetTickets = () => openEventModal(event, "tickets");
  const handleCancelAttendance = () => openEventModal(event, "cancel");

  const handleGroupClick = useHandleGroupClick();

  // @ts-ignore
  function getPriceRange(priceArr: PriceBand[]): string {
    if (free) return "Free";
    if (!priceArr || priceArr.length === 0) return "No price available";

    const sortedPrice = priceArr.sort((a, b) => a.price - b.price);
    if (priceArr.length === 1) return `${sortedPrice[0].price}`;

    return `${sortedPrice[0].price} - ${
      sortedPrice[sortedPrice.length - 1].price
    }`;
  }
  // @ts-ignore
  const eventPrices = getPriceRange(priceBands);
  // @ts-ignore
  const isAttending = isUserAttendingEvent(event?.id) || false;

  function handleApproveEvent() {
    updateEvent("approved", true);
    navigate("/user/admin/events");
  }

  function handleRemoveEvent(id: string) {
    removeEvent(id);
    navigate("/user/admin/events");
  }

  useEffect(() => {
    if (id) {
      getEventById(id);
      getGroupById(id);
      // @ts-ignore
      getEventConnections(id);
    }
  }, [id]);

  return (
    <div className="w-full h-screen tablet:h-auto flex flex-col items-center justify-start bg-bgSecondary">
      {event && (
        <>
          <EventWrapper
            event={event}
            handleApproveEvent={handleApproveEvent}
            // @ts-ignore
            handleRemoveEvent={handleRemoveEvent}
          />
          {isMobile && !approved && (
            <div className="fixed flex flex-row items-center justify-around bottom-0 left-0 w-screen h-[4.4rem] bg-bgSecondary px-6 z-50 border-t-[1px] border-t-gray-100">
              <button
                onClick={handleApproveEvent}
                className="w-[120px] h-[40px]  text-[11px] flex items-center justify-center font-semibold rounded-lg  text-white bg-primary "
              >
                Approve Event
              </button>
              <button
                // @ts-ignore
                onClick={() => handleRemoveEvent(id)}
                className="w-[120px] h-[40px] text-[11px] flex items-center justify-center font-semibold rounded-lg  text-white bg-secondary "
              >
                Reject Event
              </button>
            </div>
          )}
          {isMobile && approved && !isVisible && (
            <div className="fixed flex flex-row items-center justify-between bottom-0 left-0 w-screen h-[4.4rem] bg-bgSecondary px-6 z-50 border-t-[1px] border-t-gray-100">
              <p className="text-[14px] font-semibold">
                {free ? "Free" : eventPrices}
              </p>
              <button
                onClick={
                  isAttending
                    ? () => handleCancelAttendance()
                    : free
                    ? () => handleJoinEvent()
                    : () => handleGetTickets()
                }
                className={`w-[100px] h-[34px] ml-auto flex items-center justify-center text-[11px] font-semibold rounded-lg ${
                  isAttending
                    ? "bg-bgPrimary border-2 border-primary text-primary"
                    : "bg-secondary text-white"
                }`}
              >
                {isAttending ? "Going" : free ? "Join Event" : "Get Tickets"}
              </button>
            </div>
          )}
          <main className="w-full m-h-screen tablet:w-[94%] desktop:w-[66%] desktop:h-auto flex flex-col tablet:flex-row items-start justify-center bg-bgPrimary tablet:bg-bgSecondary px-6 mt-0 tablet:mt-0 tablet:px-0 tablet:p-4 pb-[5rem]">
            <section className="flex flex-col justify-start items-start w-full tablet:w-[62%] h-auto p-0 tablet:p-4">
              {!isMobile && (
                <EventGroupDetail
                  // @ts-ignore
                  eventGroup={eventGroup}
                  handleClick={handleGroupClick}
                />
              )}

              <EventDetail description={description ?? []} />
            </section>
            <section className="w-full tablet:w-[38%] h-auto flex flex-col items-center justify-start p-0 pl-0 desktop:p-0 tablet:pl-4 desktop:pl-8 gap-y-4 overflow-x-scroll">
              {/* {!isMobile && <EventOptionsContainer />} */}
              {isMobile && (
                <h1 className="text-[14px] desktop:text-[1rem] font-bold text-textPrimary mb-1 mr-auto desktop:mr-0 mt-6 desktop:-mt-0.5">
                  Location
                </h1>
              )}

              <EventMapContainer lat={lat} lng={lng} placename={placename} />
              <EventConnectionsContainer eventConnections={eventConnections} />
            </section>
          </main>
        </>
      )}
    </div>
  );
};

export default Event;
