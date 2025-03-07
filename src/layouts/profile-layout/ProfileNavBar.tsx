import { NavLink } from "react-router-dom";

const ProfileNavBar = () => {
  return (
    <nav className="flex items-center t w-[100%] h-[4rem] bg-bgPrimary rounded-lg mt-8">
      <ul className="w-[100%] flex items-center justify-start gap-10 tablet:text-[14px] desktop:text-[15px] ml-4 p-4 ">
        <NavLink
          to={`/user/profile/events`}
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-primary"
              : "font-semibold text-textPrimary"
          }
        >
          Events
        </NavLink>
        <NavLink
          to={`/user/profile/groups`}
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-primary"
              : "font-semibold text-textPrimary"
          }
        >
          Groups
        </NavLink>
        <NavLink
          to={`/user/profile/connections`}
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-primary"
              : "font-semibold text-textPrimary"
          }
        >
          Connections
        </NavLink>
        <NavLink
          to={`/user/profile/settings`}
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-primary"
              : "font-semibold text-textPrimary"
          }
        >
          Settings
        </NavLink>
      </ul>
    </nav>
  );
};

export default ProfileNavBar;
