export const sortByPopularity = (events) => {
    return events.sort((a, b) => b.going - a.going);
};
export const sortByDate = (events) => {
    return events.sort((a, b) => b.date - a.date);
};
export const sortByFree = (events) => {
    return events.filter((event) => event.free === true);
};
