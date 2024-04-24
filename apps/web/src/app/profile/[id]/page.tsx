import React from "react";
import ProfileCard from "@/components/profile/profile";
import Stats from "@/components/profile/stats";
import { User, prisma } from "@manraj2712/database";
import { getServerSession } from "next-auth";
import testimonial from "@/../public/images/testimonial.jpg";

const UserNotFound = () => {
  return (
    <div className="flex flex-1 justify-center item-center">User not found</div>
  );
};
const Profile = async ({ params }: { params: { id: string } }) => {
  const session = params.id === "my-profile" ? await getServerSession() : null;

  const user = !session
    ? await prisma.user.findUnique({
        where: {
          username: params.id,
        },
      })
    : null;

  if (!session?.user?.email && !user) {
    return <UserNotFound />;
  }
  const email = user ? user.email : session?.user?.email || "";
  const name = user ? user.name : session?.user?.name || "";
  const image = session ? session?.user?.image || "" : testimonial.src;

  return email && name && image ? (
    <div className="flex flex-col mx-2 sm:flex-row mt-2 bg-black ">
      <div className="w-70 sm:w-80 bg-neutral-900 rounded-lg md:mt-0 xl:px-10 mb-4 h-full  px-4 sm:px-6 py-4 sm:py-6 ">
        <ProfileCard name={name} image={image} />
      </div>

      <div className="flex flex-col w-full ">
        <div className="h-1/3 sm:h-fit mt-3 sm:mt-10 w-70 sm:w-96 bg-neutral-900 sm:ml-10 rounded p-4">
          <Stats email={email} />
        </div>
        <div className="hidden md:flex rounded h-full bg-neutral-900 m-10 mb-3 ">
          {/* <Submissiontable /> */}
        </div>
      </div>
    </div>
  ) : (
    <UserNotFound />
  );
};

export default Profile;
