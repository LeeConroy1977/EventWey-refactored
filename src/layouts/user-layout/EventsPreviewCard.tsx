import { format } from "date-fns";

interface PriceBand {
  type: "Early bird" | "Standard" | "VIP";
  price: string;
  ticketCount: number;
}

interface Location {
  placename: string;
  lng: number;
  lat: number;
}

interface Event {
  id: string;
  image: string;
  title: string;
  date: string;
  groupName: string;
  groupId: number;
  duration: string;
  priceBands: PriceBand[];
  going: number;
  capacity: number;
  availability: number;
  startTime: string;
  free: boolean;
  category: string;
  tags: string[];
  description: string[];
  attendees: string[];
  location: Location;
  approved: boolean;
}

interface EventsPreviewCardProps {
  event: Event;
  handleClick: (is: string) => void;
}

const EventsPreviewCard: React.FC<EventsPreviewCardProps> = ({
  event,
  handleClick,
}) => {
  const { id, date, title, groupName } = event;

  const formattedDate = format(new Date(date), "EEE, MMM d, yyyy");
  return (
    <div onClick={() => handleClick(id)}>
      <p className="text-[12px] xl-screen:text-[13px] text-textPrimary font-semibold ml-3 mb-1 xl-screen:mt-4">
        {formattedDate}
      </p>
      <div className=" h-[4.2rem] xl-screen:h-[5rem] xl-screen:mt-1 p-3  bg-bgSecondary border rounded-md text-textPrimary mb-4 cursor-pointer">
        <h4 className="text-[13px] xl-screen:text-[15px] font-bold text-textPrimary mb-2 ">
          {title}
        </h4>
        <p className="text-[11px] xl-screen:text-[13px] font-medium text-textPrimary">
          Hosted by:{" "}
          <span className="text-primary font-semibold cursor-pointer">
            {groupName}
          </span>
        </p>
      </div>
    </div>
  );
};

export default EventsPreviewCard;
