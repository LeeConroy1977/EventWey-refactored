import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
const HomeConnectionCard = ({ connection, handleClick, handleModalClose }) => {
    const { id, profileBackgroundImage, profileImage, username, bio } = connection || {};
    const { isMobile } = useScreenWidth();
    return (_jsxs("div", { className: "w-[100px] h-[180px] tablet:w-[23%] desktop:w-[22%] tablet:h-[220px] desktop:h-[260px] xl-screen:h-[290px] bg-bgPrimary rounded-lg flex flex-col items-center justify-start cursor-pointer mt-1 border-[1px] border-gray-200 ", onClick: () => {
            handleClick(id);
            handleModalClose();
        }, children: [_jsxs("div", { className: "relative w-[100%] h-[30%] desktop:h-[28%]  flex items-center justify-center\n      ", children: [_jsx("img", { className: "w-[100%] h-[100%] rounded-tl-lg rounded-tr-lg", src: profileBackgroundImage, alt: "" }), _jsx("img", { className: "absolute top-6 tablet:top-8 xl-screen:top-9 w-[60px] h-[60px] desktop:w-[75px] desktop:h-[75px] xl-screen:w-[80px] xl-screen:h-[80px] rounded-full border-2 border-textPrimary", src: profileImage, alt: "" })] }), _jsx("p", { className: "mt-9 text-[12px] desktop:mt-11 desktop:text-[14px] font-semibold text-textPrimary", children: username }), !isMobile && (_jsx("p", { className: "text-[9px] tablet:text-[8px] desktop:text-[9px] font-medium text-center text-textTertiary tablet:p-2 desktop:p-4", children: bio })), _jsx("button", { className: "w-[80%] py-1 xl-screen:py-1.5 flex justify-center items-center mt-auto mb-3 text-primary mobile:text-[8px] tablet:text-[9px] desktop:text-[10px] font-medium desktop:font-semibold border-[1px] desktop:border-2 border-primary rounded-lg bg-bgPrimary", children: "Message" })] }));
};
export default HomeConnectionCard;
