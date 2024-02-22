import { AiOutlineArrowLeft } from "react-icons/ai";

const EmptyState = () => {
  return (
    <div
      className="hidden md:flex 
          h-screen
          w-full 
          items-center 
          bg-gray-100
        "
    >
      <button>
        <div className="md:hidden absolute top-2 left-2 p-2 rounded-full bg-gray-300  text-gray-200 text-2xl  hover:bg-gray-500">
          <AiOutlineArrowLeft />
        </div>
      </button>
      <div className="flex-1 bg-white-200">
        <h1 className="text-3xl text-gray-700">Hi guys, i'm Guyn!</h1>
        <br />
        <p className="text-lg text-gray-600">GREEN HORNY Chatting</p>
      </div>
    </div>
  );
};

export default EmptyState;
