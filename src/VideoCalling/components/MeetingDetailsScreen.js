import { CheckIcon, ClipboardIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./MeetingDetailsScreen.scss";
import axiosInstance from "../../config/axiosInstance";
import { useParams } from "react-router-dom";
import CustomButton from "../../components/CustomButton";

export function MeetingDetailsScreen({
    onClickJoin,
    _handleOnCreateMeeting,
    participantName,
    setParticipantName,
    onClickStartMeeting,
}) {
    const [meetingId, setMeetingId] = useState("");
    const [meetingIdError, setMeetingIdError] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [iscreateMeetingClicked, setIscreateMeetingClicked] = useState(false);
    const [isJoinMeetingClicked, setIsJoinMeetingClicked] = useState(false);
    const [socketID, setSocketID] = useState(null);
    const [isDisableButon, setIdDisableButton] = useState(true);
    const params = useParams();

    // api to pass the meeting id , doctor id
    const fetch_getSocketID = async () => {
        try {
            const response = await axiosInstance(`/sec/patient/getUpdateSocketId/${params?.appID}`);
            if (response?.data?.response === "Generate SocketID") {
                console.log("this is generate response ", response?.data?.response);
                setMeetingId("");
                setSocketID(null);
            } else {
                console.log("this is the socket id : ", response?.data?.response[0]?.socket_id);
                setMeetingId(response?.data?.response[0]?.socket_id)
                setSocketID(response?.data?.response[0]?.socket_id);
            }
        } catch (error) {
            console.log("this is the error in video : ", error);
        }
    };

    // check for the appointment date and time
    const fetch_CheckForTheAppointmentDateAndTime = async () => {
        try {
            const response = await axiosInstance(
                `/sec/patient/getAppointmentDateTime/${params?.appID}`,
            );
            console.log("check for date and appointment : ", response?.data?.joinCallflag);

            if (response?.data?.joinCallflag) {
                console.log("false response");
                setIdDisableButton(false);
                fetch_getSocketID();
            } else {
                console.log("response is true");
                setIdDisableButton(true);
            }
        } catch (error) {
            console.log("Error in video : ", error);
        }
    };

    const update_socketID = async (meetingId) => {
        try {
            const reponse = await axiosInstance.put("/sec/patient/putSocketId/", {
                appointment_id: params?.appID,
                socket_id: meetingId,
            });
            alert('this is success : ',meetingId)
        } catch (error) {
          console.log(`Error while uploading the socket ID : ${error}`)
        }
    };

    useEffect(() => {
        fetch_CheckForTheAppointmentDateAndTime();
    }, []);

    return (
        <div className={`meeting-detail-main-container`}>
            {iscreateMeetingClicked ? (
                <div className="meeting-clicked-container">
                    <p className="meeting-paragraph-container">{`Meeting code : ${meetingId}`}</p>
                    <button
                        className="button-container"
                        onClick={() => {
                            navigator.clipboard.writeText(meetingId);
                            setIsCopied(true);
                            setTimeout(() => {
                                setIsCopied(false);
                            }, 3000);
                        }}
                    >
                        {isCopied ? (
                            <CheckIcon className="check-icon-container" />
                        ) : (
                            <ClipboardIcon className="clipboard-container" />
                        )}
                    </button>
                </div>
            ) : isJoinMeetingClicked ? (
                <>
                    {/* <input
                        defaultValue={meetingId}
                        onChange={(e) => {
                            setMeetingId(e.target.value);
                        }}
                        placeholder={"Enter meeting Id"}
                        className="joinMeeting-input-container"
                    /> */}
                    {meetingIdError && (
                        <p className="meetingErrorId">{`Please enter valid meetingId`}</p>
                    )}
                </>
            ) : null}

            {(iscreateMeetingClicked || isJoinMeetingClicked) && (
                <>
                    <input
                        value={participantName}
                        onChange={(e) => setParticipantName(e.target.value)}
                        placeholder="Enter your name"
                        className="created-meeting-joined-input"
                    />

                    {/* <p className="text-xs text-white mt-1 text-center">
            Your name will help everyone identify you in the meeting.
          </p> */}
                    <button
                        disabled={participantName.length < 3}
                        className={`meeting-button-width ${
                            participantName.length < 3
                                ? "created-meeting-joined-input-gray"
                                : "created-meeting-joined-input-purple"
                        }  text-white px-2 py-3 rounded-xl mt-5`}
                        onClick={(e) => {
                            if (iscreateMeetingClicked) {
                                onClickStartMeeting();
                            } else {
                                if (meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}")) {
                                    onClickJoin(meetingId);
                                } else setMeetingIdError(true);
                            }
                        }}
                    >
                        {iscreateMeetingClicked ? "Start a meeting" : "Join a meeting"}
                    </button>
                </>
            )}

            {!iscreateMeetingClicked && !isJoinMeetingClicked && (
                <div className="inner-created-meeting-clicked-container-two">
                    {socketID === null || undefined ? (
                        <CustomButton
                            className={"inner-created-meeting-clicked-container-three"}
                            isDisabled={isDisableButon}
                            label={"Create a meeting"}
                            handleClick={async (e) => {
                                const { meetingId, err } = await _handleOnCreateMeeting();

                                if (meetingId) {
                                    setMeetingId(meetingId);
                                    setIscreateMeetingClicked(true);
                                    update_socketID(meetingId);
                                } else {
                                    toast(`${err}`, {
                                        position: "bottom-left",
                                        autoClose: 4000,
                                        hideProgressBar: true,
                                        closeButton: false,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                    });
                                }
                            }}
                        />
                    ) : (
                        // <button
                        //     className="inner-created-meeting-clicked-container-three"
                        //     disabled={false}
                        //     onClick={async (e) => {
                        //         const { meetingId, err } = await _handleOnCreateMeeting();

                        //         if (meetingId) {
                        //             setMeetingId(meetingId);
                        //             setIscreateMeetingClicked(true);
                        //         } else {
                        //             toast(`${err}`, {
                        //                 position: "bottom-left",
                        //                 autoClose: 4000,
                        //                 hideProgressBar: true,
                        //                 closeButton: false,
                        //                 pauseOnHover: true,
                        //                 draggable: true,
                        //                 progress: undefined,
                        //                 theme: "light",
                        //             });
                        //         }
                        //     }}
                        // >
                        //     Create a meeting
                        // </button>
                        <CustomButton
                            className={"join-meeting-button"}
                            isDisabled={isDisableButon}
                            handleClick={(e) => {
                                setIsJoinMeetingClicked(true);
                            }}
                            label="Join a Meeting"
                        />

                        // <button
                        //     className="join-meeting-button"
                        //     disabled={false}
                        //     onClick={(e) => {
                        //         setIsJoinMeetingClicked(true);
                        //     }}
                        // >
                        //     Join a meeting
                        // </button>
                    )}
                    {/* create a meeting */}

                    {/* Join meeting */}
                </div>
            )}
        </div>
    );
}
