import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import React, { useEffect, useRef, useState } from "react";
import { formatAMPM, json_verify, nameTructed } from "../../utils/helper";
import "./chatpanel.scss";

const ChatMessage = ({ senderId, senderName, text, timestamp }) => {
    const mMeeting = useMeeting();
    const localParticipantId = mMeeting?.localParticipant?.id;
    const localSender = localParticipantId === senderId;

    return (
        <div
            className={`chat-panel-main-container ${localSender
                ? "chat-panel-main-container-flex-end"
                : "chat-panel-main-container-flex-start"
                } `}
            style={{
                maxWidth: "100%",
                overflow: "auto"
            }}
        >
            <div
                className={`chat-panel-main-container ${localSender
                    ? "chat-panel-main-container-flex-end"
                    : "chat-panel-main-container-flex-start"
                    } flex-col py-1 px-2 rounded-md bg-gray-700`}
            >
                <p style={{ color: "#ffffff80" }}>
                    {localSender ? "" : nameTructed(senderName, 15)}
                </p>
                <div>
                    <p className="chat-panel-chat-text-p">{text}</p>
                </div>
                <div className="mt-1">
                    <p
                        style={{ color: "#ffffff", fontSize: "x-small", fontStyle: "italic" }}
                        className="chat-panel-time-p"
                    >
                        {formatAMPM(new Date(timestamp))}
                    </p>
                </div>
            </div>
        </div>
    );
};

const ChatInput = ({ inputHeight }) => {
    const [message, setMessage] = useState("");
    const { publish } = usePubSub("CHAT");
    const input = useRef();

    return (
        <div
            className="chat-panel-chat-input-main-container"
        // style={{ height: "7%" }}
        >
            <div class="chat-panel-chat-input-main-container-inner">
                <div style={{ width: "86%", height: "100%" }}>
                    <input
                        type="text"
                        className="py-4 text-base text-white border-gray-400 border bg-gray-750 rounded pr-10 pl-2 focus:outline-none w-full"
                        placeholder="Write your message"
                        autocomplete="off"
                        style={{
                            width: "99%",
                            height: "99%",
                            padding: "2% 4%",
                            borderRadius: "14px",
                        }}
                        ref={input}
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                const messageText = message.trim();

                                if (messageText.length > 0) {
                                    publish(messageText, { persist: true });
                                    setTimeout(() => {
                                        setMessage("");
                                    }, 100);
                                    input.current?.focus();
                                }
                            }
                        }}
                    />
                </div>

                <div
                    style={{ width: "12%", height: "100%" }}
                    class="absolute inset-y-0 right-0 flex mr-2 rotate-90 "
                >
                    <button
                        disabled={message.length < 2}
                        type="submit"
                        className="p-1 focus:outline-none focus:shadow-outline"
                        onClick={() => {
                            const messageText = message.trim();
                            if (messageText.length > 0) {
                                publish(messageText, { persist: true });
                                setTimeout(() => {
                                    setMessage("");
                                }, 100);
                                input.current?.focus();
                            }
                        }}
                        style={{
                            width: "100%",
                            height: "100%",
                            transform: "rotate(90deg)",
                            background: "#28282B",
                            cursor: "pointer"
                        }}
                    >
                        <PaperAirplaneIcon
                            className={`w-6 h-6 ${message.length < 2 ? "text-gray-500 " : "text-white"
                                }`}
                            fill="#E71B4A"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

const ChatMessages = ({ listHeight }) => {
    const listRef = useRef();
    const { messages } = usePubSub("CHAT");
    const chatContainerRef = useRef(null);

    // const scrollToBottom = (data) => {
    //     if (!data) {
    //         if (listRef.current) {
    //             listRef.current.scrollTop = listRef.current.scrollHeight;
    //         }
    //     } else {
    //         const { text } = data;

    //         if (json_verify(text)) {
    //             const { type } = JSON.parse(text);
    //             if (type === "CHAT") {
    //                 if (listRef.current) {
    //                     listRef.current.scrollTop = listRef.current.scrollHeight;
    //                 }
    //             }
    //         }
    //     }
    // };

    useEffect(() => {
        // scrollToBottom();
        // Scroll to the bottom whenever messages change
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return messages ? (
        <div ref={listRef} className="chat-messages-main-container">
            <div className="chat-messages-main-container-inner" ref={chatContainerRef}>
                {messages.map((msg, i) => {
                    const { senderId, senderName, message, timestamp } = msg;
                    return (
                        <ChatMessage
                            key={`chat_item_${i}`}
                            {...{ senderId, senderName, text: message, timestamp }}
                        />
                    );
                })}
            </div>
        </div>
    ) : (
        <p>No messages</p>
    );
};

export function ChatPanel({ panelHeight }) {
    const inputHeight = 72;
    const listHeight = panelHeight - inputHeight;

    return (
        <div
            style={{
                padding: "0 3%",
                height: "92%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <ChatMessages listHeight={listHeight} />
            <ChatInput inputHeight={inputHeight} />
        </div>
    );
}
