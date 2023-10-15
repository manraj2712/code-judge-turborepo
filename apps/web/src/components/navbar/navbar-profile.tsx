import { getServerSession } from "next-auth";
import NavbarProfileMenu from "./navbar-profile-menu";
import Link from "next/link";

const NavbarProfile = async () => {
  const session = await getServerSession();
  return (
    <>
      {session?.user?.email ? (
        <NavbarProfileMenu session={session} />
      ) : (
        <Link href="/api/auth/signin">
          <div style={{ display: "flex" }}>Sign in</div>
        </Link>
      )}
    </>
  );
};

export default NavbarProfile;
