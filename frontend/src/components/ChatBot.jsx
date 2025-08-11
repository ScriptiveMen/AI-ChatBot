import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";
import ReactMarkdown from "react-markdown";

const ChatBot = () => {
  const bottomref = useRef();

  const [socket, setSocket] = useState(null);

  const [message, setMessage] = useState([]);

  const { register, handleSubmit, resetField } = useForm();

  const submitHandler = ({ user_message }) => {
    let usernewMsg = {
      sender: "user",
      text: user_message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };

    setMessage((prev) => [...prev, usernewMsg]);

    socket.emit("ai-message", user_message);
    resetField("user_message");
  };

  useEffect(() => {
    let socketInstance = io(import.meta.env.VITE_BACKEND_URL);
    setSocket(socketInstance);

    socketInstance.on("ai-response", (data) => {
      let botnewMsg = {
        role: "bot",
        text: data,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };

      setMessage((prev) => [...prev, botnewMsg]);
    });
  }, []);

  useEffect(() => {
    bottomref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className="py-3 px-2 h-screen w-screen ">
      <div className="flex flex-col gap-1 h-full w-full md:w-[70%] m-auto">
        <div className="messages w-full  h-[90%] overflow-y-auto flex flex-col gap-3 p-2">
          {message.length > 0 ? (
            message.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-3xl text-white max-w-[70%] ${
                    msg.sender === "user"
                      ? "bg-blue-400 rounded-br-none"
                      : "bg-gray-500 rounded-bl-none"
                  }`}
                >
                  <h3>
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </h3>
                  <span className="text-right block text-sm pt-2">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <h1 className="m-auto italic opacity-40">
              Start a new conversation...
            </h1>
          )}

          <div ref={bottomref}></div>
        </div>

        <div className="typebox w-full">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex justify-between gap-2"
          >
            <input
              {...register("user_message")}
              className="w-full border-2 border-gray-300 focus:border-blue-400 rounded-2xl outline-none py-3 px-4 placeholder:text-sm"
              type="text"
              placeholder="Type Your Message Here..."
            />
            <button
              className="px-6 py-2 rounded-2xl bg-blue-400 text-white font-semibold"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
