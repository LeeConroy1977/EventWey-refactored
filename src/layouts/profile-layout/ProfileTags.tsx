import React from "react";
import Tag from "../../reuseable-components/Tag";

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
  bio: string;
  tags: string[];
  connections: string[];
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

interface ProfileTagsProps {
  user: User;
}

const ProfileTags: React.FC<ProfileTagsProps> = ({ user }) => {
  const tags = Array.isArray(user?.tags) ? user.tags : [];

  return (
    <div className="w-[100%] min-h-[150px] flex flex-col rounded-lg bg-white mt-8 p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-[14px] desktop:text-[1rem] xl-screen:text-[18px] font-bold text-textPrimary mr-auto  mt-6 tablet:mt-0.5">
          Tags
        </h3>
      </div>
      <div className="flex items-start justify-start flex-wrap mt-6 gap-3">
        {tags.length > 0 ? (
          tags.map((tag: any, index: any) => <Tag key={index} tag={tag} />)
        ) : (
          <p className="text-textSecondary">No tags available</p>
        )}
      </div>
    </div>
  );
};

export default ProfileTags;
