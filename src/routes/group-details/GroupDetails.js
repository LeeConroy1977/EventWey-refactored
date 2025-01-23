import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import { useGroup } from "../../contexts/GroupContext";
import GroupOrganiserContainer from "../../layouts/group-layout/GroupOrganiserContainer";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
const GroupDetails = () => {
    const { id } = useParams();
    const { group } = useGroup();
    const { isMobile } = useScreenWidth();
    const { name, image, description, location, eventsCount, members, events, messages, category, openAccess, } = group;
    return (_jsx("div", { className: "w-[100%] min-h-[8rem] flex flex-col items-center justify-start bg-bgPrimary mt-0 tablet:mt-8 rounded-lg tablet:p-6  desktop:p-10 desktop:pb-10", children: group && (_jsxs(_Fragment, { children: [_jsx("h3", { className: "text-[14px] desktop:text-[1rem] xl-screen:text-[18px] font-bold text-textPrimary mr-auto  mt-6 tablet:mt-0.5", children: "Group Details" }), description &&
                    description.slice(isMobile ? 1 : 0).map((paragraph, i) => {
                        return (_jsx("p", { className: `${!isMobile && i === 0 ? "font-semibold" : "font-normal"} text-textPrimary  mr-auto mt-4 tablet:mt-6 xl-screen:mt-8 text-[12px] tablet:text-[13px] desktop:text-[15px] xl-screen:text-[17px]`, children: paragraph }));
                    }), isMobile && _jsx(GroupOrganiserContainer, {})] })) }));
};
export default GroupDetails;
