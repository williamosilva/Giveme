import error from "@assets/404.svg";
import BackButton from "./components/BackButton";

export default function Error404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={error} alt="404" className="w-96" />
      <h1 className="text-3xl font-bold text-gray-700 mb-16">
        Sorry, page not found
      </h1>

      <BackButton />
    </div>
  );
}
