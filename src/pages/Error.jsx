import { Link } from "react-router-dom";


export default function Error() {
  return (
    <div className="bg-black rounded-menu w-fit p-10 px-16 mx-auto">
      <h1 className="text-title font-semibold">404 Error</h1>
      <h2 className="text-xlheader font-semibold">Page not found</h2>
      <Link className="text-header custom-button border-b-[3px]" to="/">Return to Home</Link>
    </div>
  );
}
