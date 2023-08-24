import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Picker from "emoji-picker-react";
import { v4 as uuidv4 } from 'uuid';
import { io } from "socket.io-client";

import "./LiveChat.css";

import messengerIcon from "../../assets/messenger.png";
import Axios from "../../api/Axios";
import { getFromStorage, isEmptyObject, saveToStorage, clearStorage } from "../../utils/utils";
import SERVER from "../../config.server";

const LiveChat = () => {
  const socket = useRef();
  const scrollRef = useRef();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const handleEmojiClick = (event) => {
    let msg = message;
    msg += event.emoji;
    setMessage(msg);
    setShowEmojiPicker(false);
  };

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  // init room id and user id form local storage
  useEffect(() => {
    if (!localStorage.getItem('RoomId')) saveToStorage('RoomId', uuidv4())
    if (!localStorage.getItem('UserChatId')) saveToStorage('UserChatId', `user-${uuidv4()}`)
  }, [])

  const currentUser = getFromStorage('UserChatId', {});
  const roomId = getFromStorage('RoomId', {});

  // add user to socket 
  useEffect(() => {
    if (!isEmptyObject(currentUser)) {
      socket.current = io(SERVER);
      socket.current.emit("add-user", currentUser);
    }
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [currentUser]);

  const getMsg = async () => {
    const res = await Axios.post('/session/getmsg', {
      roomId: roomId,
      from: currentUser,
      to: 'counselor',
    });
    setMessages(res.data);
  }

  useEffect(() => {
    getMsg()
    // eslint-disable-next-line
  }, []);

  const handleSendMsg = async (msg) => {
    if (!msg) return;
    socket.current.emit("send-msg", {
      roomId: roomId,
      to: 'counselor',
      from: currentUser,
      msg,
    });
    await Axios.post('/session/addmsg', {
      roomId: roomId,
      from: currentUser,
      to: 'counselor',
      message: msg,
    });

    if (msg === '/end') {
      await Axios.post('/session/endmsg', {
        roomId: roomId,
      });
      setMessages([])
      setMessage("")
      clearStorage()
      saveToStorage('RoomId', uuidv4())
      saveToStorage('UserChatId', `user-${uuidv4()}`)
      return;
    }

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
    setMessage("")
  };

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const toggle = () => {
    setShow((prevState) => !prevState);
  };

  const onKeyPressed = (e) => {
    if (e.key === "Enter") {
      handleSendMsg(message)
    }
  }

  const handleChatChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <div className="live-chat" onClick={toggle}>
        <img src={messengerIcon} alt="livechat" />
      </div>

      {show && (
        <div className="live-chat-box">
          <div className="live-chat-box-header">
            <h3>Customer Support</h3>
            <p>Let's Chat App</p>
          </div>
          <div className="horizon-line"></div>
          <div className="live-chat-box-body">
            <p className="noti">Send message for start chat. Send /end for end chat.</p>
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${message.fromSelf ? "user-chat" : "admin-chat"
                      }`}
                  >
                    <div className="content ">
                      <p>{!message.fromSelf && <FontAwesomeIcon icon={faUser} />} {message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="horizon-line"></div>
          <div className="live-chat-box-footer">
            <div className="live-chat-box-input">
              <FontAwesomeIcon icon={faUser} />
              &nbsp; &nbsp;
              <input type="text" placeholder="Enter Message!" onKeyDown={onKeyPressed} onChange={handleChatChange} value={message || ""} />
            </div>
            <div className="live-chat-actions">
              {/* <FontAwesomeIcon icon={faPaperclip} className="live-chat-icon" /> */}
              <FontAwesomeIcon icon={faFaceSmile} className="live-chat-icon" onClick={handleEmojiPickerhideShow} />
              {showEmojiPicker &&
                <div className="emoji-container">
                  <Picker className="emoji-container" onEmojiClick={handleEmojiClick} width={300} height={400} />
                </div>}
              <FontAwesomeIcon icon={faPaperPlane} className="send-action live-chat-icon" onClick={() => handleSendMsg(message)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
