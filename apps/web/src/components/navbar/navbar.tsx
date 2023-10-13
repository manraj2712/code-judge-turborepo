import Link from "next/link";
import { getServerSession } from "next-auth";
export default async function Navbar() {
  const session = await getServerSession();
  return (
    <div
      style={{
        borderBottomWidth: "0.3px",
      }}
      className="flex justify-between px-10 items-center h-16 border-neutral-600 border-opacity-70"
    >
      <div>
        <h1 className="text-lg md:text-xl font-bold">CodeStreax</h1>
      </div>
      {session?.user?.email ? (
        session.user.email
      ) : (
        <div style={{ display: "flex" }}>
          <Link className="invisible md:visible" href="/api/auth/signin">
            Register
          </Link>
          <span
            className="invisible md:visible"
            style={{ padding: "0px 10px" }}
          >
            or
          </span>
          <Link href="/api/auth/signin">Sign in</Link>
        </div>
      )}
    </div>
  );
}
