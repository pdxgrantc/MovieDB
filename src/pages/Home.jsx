import {Link} from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <Link to={"/movies"} className={"bg-ashGray hover:bg-chineseViolet text-eerieBlack hover:text-silver rounded p-3 transition"}>
            Search for Movies
        </Link>
        <Link to={"/people"} className={"bg-ashGray hover:bg-chineseViolet text-eerieBlack hover:text-silver rounded p-3 transition"}>
            Search for People
        </Link>
        <Link to={"/studios"} className={"bg-ashGray hover:bg-chineseViolet text-eerieBlack hover:text-silver rounded p-3 transition"}>
            Search for Studios
        </Link>
      </div>
    </div>
  );
}
