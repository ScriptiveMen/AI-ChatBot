import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const botchat = () => {
    navigate("/chat-bot");
  };

  return (
    <div className="h-screen w-screen relative flex items-center justify-center">
      <video
        loading="lazy"
        muted
        loop
        autoPlay
        src="./images/ai-bg.mp4"
      ></video>

      <div className="overlay absolute py-3 pb-[5vw] md:pb-[3vw] px-5 md:px-10 h-full w-full md:w-[70%] flex flex-col items-center justify-between">
        <div className="top w-full md:w-[70%]">
          <nav className="flex items-center justify-between py-2">
            <div className="left flex items-center justify-center gap-2">
              <div className="profile h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center">
                <i className="ri-user-fill"></i>
              </div>
              <p className="text-gray-500">Hi, Guest</p>
            </div>
            <i className="ri-settings-5-line text-2xl"></i>
          </nav>
          <h1 className="text-4xl font-semibold py-10">
            How May I Help You Today?
          </h1>
        </div>

        <div className="bottom w-full md:w-[70%] flex gap-2">
          <div className="left cursor-pointer relative active:scale-97 transition-all ease-in-out duration-150 w-1/2 bg-blue-200 flex flex-col items-start justify-between gap-10 p-3 rounded-2xl">
            <i className="ri-speak-ai-line text-2xl"></i>
            <h3 className="text-2xl font-semibold">
              Talk <br /> with Bot
            </h3>

            <span className="opacity-40 text-[0.75rem] absolute right-3 top-5">
              Comming soon...
            </span>
          </div>

          <div className="right w-1/2 h-full flex flex-col gap-2">
            <div
              onClick={botchat}
              className="top cursor-pointer active:scale-97 transition-all ease-in-out duration-150 w-full h-1/2 rounded-2xl bg-purple-200 p-3"
            >
              <i className="ri-chat-ai-line text-xl"></i>
              <h3 className="font-semibold">Chat with Bot</h3>
            </div>
            <div className="bottom cursor-pointer relative active:scale-97 transition-all ease-in-out duration-150 w-full h-1/2 rounded-2xl bg-pink-200 p-3">
              <i className="ri-image-ai-line text-xl"></i>
              <h3 className="font-semibold">Search By Image</h3>
              <span className="opacity-40 text-[0.75rem] absolute right-3 top-4">
                Comming soon...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
