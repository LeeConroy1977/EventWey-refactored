import axios from "axios";
import { sortByPopularity, sortByDate } from "../fakeEventSorting";
const API = "https://eventwey.glitch.me";
export const fetchAllGroups = async (params) => {
    try {
        const groupsResponse = await axios.get(`${API}/groups`);
        let filteredData = groupsResponse.data;
        if (params.category) {
            filteredData = filteredData.filter((group) => group.category === params.category);
        }
        if (params.sortBy === "popular") {
            filteredData = sortByPopularity(filteredData);
        }
        else if (params.sortBy === "date") {
            filteredData = sortByDate(filteredData);
        }
        return filteredData;
    }
    catch (error) {
        console.error("Error fetching groups:", error);
        throw error;
    }
};
export const fetchGroupById = async (id) => {
    try {
        const response = await axios.get(`${API}/groups/${id}`);
        const group = response.data;
        console.log("Group Data:", group);
        if (!group) {
            throw new Error(`Group not found for ID: ${id}`);
        }
        return group;
    }
    catch (error) {
        console.error("Error fetching group by ID:", error);
        throw error;
    }
};
export const postGroup = async (groupData) => {
    try {
        const response = await axios.post(`${API}/groups`, groupData);
        return response.data;
    }
    catch (error) {
        console.error("Error creating group:", error);
        throw error;
    }
};
export const patchGroup = async (id, patchObj) => {
    try {
        const { data: updatedGroup } = await axios.patch(`${API}/groups/${id}`, patchObj);
        return updatedGroup;
    }
    catch (error) {
        console.error("Error updating group:", error);
        throw error;
    }
};
export const deleteGroup = async (id) => {
    try {
        const { data: updatedGroup } = await axios.delete(`${API}/groups/${id}`);
        return updatedGroup;
    }
    catch (error) {
        console.error("Error updating group:", error);
        throw error;
    }
};
export const fetchGroupEventsById = async (id) => {
    try {
        const groupResponse = await axios.get(`${API}/groups/${id}`);
        const group = groupResponse.data;
        console.log("Group Data:", group);
        if (!group?.events || !Array.isArray(group.events)) {
            throw new Error(`Events not found or invalid for group with ID: ${id}`);
        }
        const eventsResponse = await axios.get(`${API}/events`);
        const events = eventsResponse.data;
        const groupEvents = events.filter((event) => group.events.includes(String(event.id)));
        return groupEvents;
    }
    catch (error) {
        console.error("Error fetching group events by ID:", error);
        throw error;
    }
};
export const fetchGroupMembers = async (id) => {
    try {
        const groupResponse = await axios.get(`${API}/groups/${id}`);
        const group = groupResponse.data;
        console.log("Group Data:", group);
        if (!group?.members || !Array.isArray(group.members)) {
            throw new Error(`Members not found or invalid for group with ID: ${id}`);
        }
        const usersResponse = await axios.get(`${API}/users`);
        const users = usersResponse.data;
        console.log("Fetched Users:", users);
        const groupMembers = users.filter((user) => group.members.includes(String(user.id)));
        console.log("Filtered Group Members:", groupMembers);
        return groupMembers;
    }
    catch (error) {
        throw error;
    }
};
