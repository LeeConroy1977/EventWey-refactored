import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import UserWrapper from "./UserWrapper";
import UserEventsPreview from "./UserEventsPreview";
import UserConnectionPreview from "./UserConnectionPreview";
import UserGroupsPreview from "./UserGroupsPreview";
import EventsOptions from "../../components/OptionsContainer";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
const UserLayout = () => {
    // const location = useLocation();
    // const isHomePage = location.pathname === "/user/home";
    const { isMobile } = useScreenWidth();
    return (_jsxs("div", { className: "w-full min-h-screen flex flex-col items-center bg-bgSecondary mt-0 tablet:mt-6", children: [!isMobile && _jsx(UserWrapper, {}), _jsx(EventsOptions, {}), _jsxs("main", { className: "w-full tablet:w-[94%] desktop:w-[66%] min-h-screen flex items-center justify-center bg-bgSecondary ", children: [!isMobile && (_jsxs("section", { className: "w-[34%] tablet:w-[34%] desktop:w-[34%] h-[100%] flex flex-col items-center justify-start mt-8 ", children: [_jsx(UserEventsPreview, {}), _jsx(UserConnectionPreview, {}), _jsx(UserGroupsPreview, {})] })), _jsx("section", { className: "flex flex-col justify-start items-start w-full tablet:w-[66%] desktop:w-[66%] h-[100%] tablet:pl-6", children: _jsx(Outlet, {}) })] })] }));
};
export default UserLayout;
