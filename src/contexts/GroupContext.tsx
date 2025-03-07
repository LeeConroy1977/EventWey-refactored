import { createContext, useContext, useState, ReactNode, FC } from "react";
import { fetchAllUsers } from "../../utils/api/user-api";
import {
  fetchGroupById,
  fetchGroupMembers,
  fetchGroupEventsById,
  patchGroup,
  deleteGroup,
} from "../../utils/api/groups-api";

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
  free: boolean;
  category: string;
  tags: string[];
  description: string[];
  attendeesId: string[];
  location: Location;
  approved: boolean;
}

interface Group {
  id: string;
  name: string;
  image: string;
  groupAdmin: string[];
  description: string[];
  openAccess: boolean;
  location: Location;
  creationDate: number;
  eventsCount: number;
  members: string[];
  events: string[];
  messages: string[];
  category: string;
  approved: boolean;
}

interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  googleId: string;
  authMethod: string;
  profileBackgroundImage: string;
  profileImage: string;
  aboutMe: string;
  tags: string[];
  connections: string[];
  bio: string;
  groups: string[];
  userEvents: string[];
  messages: string[];
  groupAdmin: string[];
  notifications: string[];
  viewEventsStatus: string;
  viewConnectionsStatus: string;
  viewGroupsStatus: string;
  viewTagsStatus: string;
  viewProfileImage: string;
  viewBioStatus: string;
  aboutMeStatus: string;
  role: string;
}

interface GroupContextType {
  group: Group | null;
  setGroup: (group: Group) => void;
  groupEvents: Event[];
  setGroupEvents: (events: Event[]) => void;
  groupMembers: User[];
  setGroupMembers: (users: User[]) => void;
  groupOrganiser: User | null;
  setGroupOrganiser: (user: User) => void;
  getGroupById: (id: string) => Promise<void>;
  getEventsById: (id: string) => Promise<void>;
  updateGroup: (field: keyof Group, value: any) => Promise<void>;
  removeGroup: (id: string) => Promise<void>;
  getGroupMembers: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

interface GroupProviderProps {
  children: ReactNode;
}

const GroupContext = createContext<GroupContextType | null>(null);

export const GroupProvider: FC<GroupProviderProps> = ({ children }) => {
  const [group, setGroup] = useState<Group | null>(null);
  const [groupEvents, setGroupEvents] = useState<Event[]>([]);
  const [groupMembers, setGroupMembers] = useState<User[]>([]);
  const [groupOrganiser, setGroupOrganiser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getGroupById = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchGroupById(id);
      const users = await fetchAllUsers();

      const organisers = users.filter((user) =>
        data.groupAdmin.includes(user.id)
      );
      const organiser = organisers[0] || null;

      setGroup(data);
      setGroupOrganiser(organiser);
    } catch (err: any) {
      setError(err.message || "Failed to fetch group");
    } finally {
      setLoading(false);
    }
  };

  const getEventsById = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const eventsData = await fetchGroupEventsById(id);
      setGroupEvents(eventsData);
    } catch (err: any) {
      setError(err.message || "Failed to fetch group events");
    } finally {
      setLoading(false);
    }
  };

  const getGroupMembers = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const membersData = await fetchGroupMembers(id);
      setGroupMembers(membersData);
    } catch (err: any) {
      setError(err.message || "Failed to fetch group members");
    } finally {
      setLoading(false);
    }
  };

  const updateGroup = async (field: keyof Group, value: any) => {
    try {
      setLoading(true);
      setError(null);
      const updatedGroup = await patchGroup(group?.id!, { [field]: value });
      setGroup(updatedGroup);
    } catch (err) {
      console.error(`Error updating group field ${field}:`, err);
      setError(`Failed to update ${field}.`);
    } finally {
      setLoading(false);
    }
  };

  const removeGroup = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await deleteGroup(id);
    } catch (err) {
      console.error("Error deleting group", err);
      setError("Failed to delete.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GroupContext.Provider
      value={{
        group,
        setGroup,
        groupEvents,
        setGroupEvents,
        groupMembers,
        setGroupMembers,
        groupOrganiser,
        setGroupOrganiser,
        getGroupById,
        getEventsById,
        getGroupMembers,
        error,
        loading,
        updateGroup,
        removeGroup,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = (): GroupContextType => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error("useGroup must be used within a GroupProvider");
  }
  return context;
};
