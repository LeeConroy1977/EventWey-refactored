import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGroup } from "../../contexts/GroupContext";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";
const GroupOrganiserContainer = () => {
    const { groupOrganiser } = useGroup();
    const handleConnectionClick = useHandleConnectionClick();
    const { isMobile } = useScreenWidth();
    const { id, profileImage, username, bio } = groupOrganiser || {};
    return (_jsxs("div", { className: "w-[100%] h-auto desktop:min-h-[180px] flex flex-col rounded-lg bg-bgPrimary mt-6 mb-4 tablet:mt-4  p-0 tablet:p-4 xl-screen:p-6 desktop:mb-8", children: [_jsx("h3", { className: "text-[14px] desktop:text-[1rem] font-bold text-textPrimary", children: "Event Organiser" }), _jsx("div", { className: "flex items-center w-full h-full mt-4 desktop:mt-4 xl-screen:mt-6 cursor-pointer ", onClick: () => handleConnectionClick(id), children: groupOrganiser && (_jsxs(_Fragment, { children: [_jsx("img", { src: profileImage, alt: "", className: " w-[46px] desktop:w-[60px] rounded-full" }), _jsxs("div", { className: "w-[50%] desktop:w-[80%] h-[54px] ml-4 pt-1 desktop:pt-0 desktop:ml-6 flex flex-col items-start justify-start", children: [_jsx("h4", { className: "text-textPrimary font-semibold text-[12px] desktop:text-[13px] xl-screen:text-[14px]", children: username }), _jsx("p", { className: "text-textPrimary font-medium text-[10px] desktop:text-[11px] xl-screen:text-[12px] mt-1", children: bio })] }), isMobile && (_jsx("button", { className: "w-[26%] py-2 ml-auto desktop:mt-auto flex justify-center items-center  text-primary text-[10px] font-semibold border-2 border-primary rounded-lg bg-bgPrimary", children: "Message" }))] })) }), !isMobile && (_jsx("button", { className: "w-[24%] py-1.5 desktop:py-2 xl-screen:py-2.5 ml-auto mt-auto flex justify-center items-center  text-primary text-[10px] xl-screen:text-[12px] font-semibold border-2 border-primary rounded-lg bg-bgPrimary", children: "Message" }))] }));
};
export default GroupOrganiserContainer;
