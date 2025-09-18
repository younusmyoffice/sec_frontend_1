import React, { useEffect, useRef, useState } from "react";
import { MeetingDetailsScreen } from "../MeetingDetailsScreen";
import { createMeeting, getToken, validateMeeting } from "../../api";
import ConfirmBox from "../ConfirmBox";
import {
  Constants,
  useMediaDevice
} from "@videosdk.live/react-sdk";
import useMediaStream from "../../hooks/useMediaStream";
import useIsMobile from "../../hooks/useIsMobile";
import WebcamOffIcon from "../../icons/WebcamOffIcon";
import WebcamOnIcon from "../../icons/Bottombar/WebcamOnIcon";
import MicOffIcon from "../../icons/MicOffIcon";
import MicOnIcon from "../../icons/Bottombar/MicOnIcon";
import MicPermissionDenied from "../../icons/MicPermissionDenied";
import CameraPermissionDenied from "../../icons/CameraPermissionDenied";
import DropDown from "../DropDown";
import DropDownCam from "../DropDownCam";
import DropDownSpeaker from "../DropDownSpeaker";
import NetworkStats from "../NetworkStats";
import { useMeetingAppContext } from "../../MeetingAppContextDef";
import { toast } from "react-toastify";
import "./joinScreen.scss";
import VideocamIcon from '@mui/icons-material/Videocam';

export function JoiningScreen({
  participantName,
  setParticipantName,
  setMeetingId,
  setToken,
  onClickStartMeeting,
  micOn,
  webcamOn,
  setWebcamOn,
  setMicOn,
  customAudioStream,
  setCustomAudioStream,
  setCustomVideoStream
}) {

  const {
    selectedWebcam,
    selectedMic,
    setSelectedMic,
    setSelectedWebcam,
    setSelectedSpeaker,
    isCameraPermissionAllowed,
    isMicrophonePermissionAllowed,
    setIsCameraPermissionAllowed,
    setIsMicrophonePermissionAllowed
  } = useMeetingAppContext()

  const [{ webcams, mics, speakers }, setDevices] = useState({
    webcams: [],
    mics: [],
    speakers: [],
  });
  const { getVideoTrack, getAudioTrack } = useMediaStream();
  const {
    checkPermissions,
    getCameras,
    getMicrophones,
    requestPermission,
    getPlaybackDevices,
  } = useMediaDevice({ onDeviceChanged });
  const [audioTrack, setAudioTrack] = useState(null);
  const [videoTrack, setVideoTrack] = useState(null);
  const [dlgMuted, setDlgMuted] = useState(false);
  const [dlgDevices, setDlgDevices] = useState(false);
  const [didDeviceChange, setDidDeviceChange] = useState(false)

  const videoPlayerRef = useRef();
  const videoTrackRef = useRef();
  const audioTrackRef = useRef();
  const audioAnalyserIntervalRef = useRef();
  const permissonAvaialble = useRef();
  const webcamRef = useRef();
  const micRef = useRef();
  const isMobile = useIsMobile();

  useEffect(() => { webcamRef.current = webcamOn }, [webcamOn])

  useEffect(() => { micRef.current = micOn }, [micOn])

  useEffect(() => {
    permissonAvaialble.current = {
      isCameraPermissionAllowed,
      isMicrophonePermissionAllowed,
    };
  }, [isCameraPermissionAllowed, isMicrophonePermissionAllowed]);

  useEffect(() => {
    if (micOn) {
      audioTrackRef.current = audioTrack;
      startMuteListener();
    }

  }, [micOn, audioTrack]);

  useEffect(() => {
    if (webcamOn) {
      videoTrackRef.current = videoTrack;

      var isPlaying =
        videoPlayerRef.current.currentTime > 0 &&
        !videoPlayerRef.current.paused &&
        !videoPlayerRef.current.ended &&
        videoPlayerRef.current.readyState >
        videoPlayerRef.current.HAVE_CURRENT_DATA;

      if (videoTrack) {
        const videoSrcObject = new MediaStream([videoTrack]);

        if (videoPlayerRef.current) {
          videoPlayerRef.current.srcObject = videoSrcObject;
          if (videoPlayerRef.current.pause && !isPlaying) {
            videoPlayerRef.current
              .play()
              .catch((error) => console.log("error", error));
          }
        }
      } else {
        if (videoPlayerRef.current) {
          videoPlayerRef.current.srcObject = null;
        }
      }
    }
  }, [webcamOn, videoTrack]);

  useEffect(() => {
    getCameraDevices();
  }, [isCameraPermissionAllowed]);

  useEffect(() => {
    getAudioDevices();
  }, [isMicrophonePermissionAllowed]);

  useEffect(() => {
    checkMediaPermission();
    return () => { };
  }, []);

  const _toggleWebcam = () => {
    const videoTrack = videoTrackRef.current;

    if (webcamOn) {
      if (videoTrack) {
        videoTrack.stop();
        setVideoTrack(null);
        setCustomVideoStream(null)
        setWebcamOn(false);
      }
    } else {
      getDefaultMediaTracks({ mic: false, webcam: true });
      setWebcamOn(true);
    }
  }

  const _toggleMic = () => {
    const audioTrack = audioTrackRef.current;

    if (micOn) {
      if (audioTrack) {
        audioTrack.stop();
        setAudioTrack(null);
        setCustomAudioStream(null)
        setMicOn(false);
      }
    } else {
      getDefaultMediaTracks({ mic: true, webcam: false });
      setMicOn(true);
    }
  }

  const changeWebcam = async (deviceId) => {
    if (webcamOn) {
      const currentvideoTrack = videoTrackRef.current;
      if (currentvideoTrack) {
        currentvideoTrack.stop();
      }

      const stream = await getVideoTrack({
        webcamId: deviceId
      })
      setCustomVideoStream(stream);
      const videoTracks = stream?.getVideoTracks();
      const videoTrack = videoTracks.length ? videoTracks[0] : null;
      setVideoTrack(videoTrack);
    }

  };
  const changeMic = async (deviceId) => {
    if (micOn) {
      const currentAudioTrack = audioTrackRef.current;
      currentAudioTrack && currentAudioTrack.stop();
      const stream = await getAudioTrack({
        micId: deviceId
      })
      setCustomAudioStream(stream);
      const audioTracks = stream?.getAudioTracks();
      const audioTrack = audioTracks.length ? audioTracks[0] : null;
      clearInterval(audioAnalyserIntervalRef.current);
      setAudioTrack(audioTrack);
    }
  };

  const getDefaultMediaTracks = async ({ mic, webcam }) => {
    if (mic) {
      const stream = await getAudioTrack({
        micId: selectedMic.id
      })
      setCustomAudioStream(stream);
      const audioTracks = stream?.getAudioTracks();
      const audioTrack = audioTracks.length ? audioTracks[0] : null;
      setAudioTrack(audioTrack)
    }

    if (webcam) {
      const stream = await getVideoTrack({
        webcamId: selectedWebcam.id
      })
      setCustomVideoStream(stream);
      const videoTracks = stream?.getVideoTracks();
      const videoTrack = videoTracks.length ? videoTracks[0] : null;
      setVideoTrack(videoTrack);

    }
  };

  async function startMuteListener() {
    const currentAudioTrack = audioTrackRef.current;
    if (currentAudioTrack) {
      if (currentAudioTrack.muted) {
        setDlgMuted(true);
      }
      currentAudioTrack.addEventListener("mute", (ev) => {
        setDlgMuted(true);
      });
    }
  }

  async function requestAudioVideoPermission(mediaType) {
    try {
      const permission = await requestPermission(mediaType);

      if (mediaType == Constants.permission.AUDIO) {
        setIsMicrophonePermissionAllowed(
          permission.get(Constants.permission.AUDIO)
        );
      }

      if (mediaType == Constants.permission.VIDEO) {
        setIsCameraPermissionAllowed(
          permission.get(Constants.permission.VIDEO)
        );
      }

      if (permission.get(Constants.permission.AUDIO)) {
        setMicOn(true);
        getDefaultMediaTracks({ mic: true, webcam: false });
      }

      if (permission.get(Constants.permission.VIDEO)) {
        setWebcamOn(true);
        getDefaultMediaTracks({ mic: false, webcam: true });
      }
    } catch (ex) {
      console.log("Error in requestPermission ", ex);
    }
  }
  function onDeviceChanged() {
    setDidDeviceChange(true)
    getCameraDevices();
    getAudioDevices();
    getDefaultMediaTracks({ mic: micRef.current, webcam: webcamRef.current });
  }

  const checkMediaPermission = async () => {
    const checkAudioVideoPermission = await checkPermissions();
    const cameraPermissionAllowed = checkAudioVideoPermission.get(
      Constants.permission.VIDEO
    );
    const microphonePermissionAllowed = checkAudioVideoPermission.get(
      Constants.permission.AUDIO
    );

    setIsCameraPermissionAllowed(cameraPermissionAllowed);
    setIsMicrophonePermissionAllowed(microphonePermissionAllowed);

    if (microphonePermissionAllowed) {
      setMicOn(true);
      getDefaultMediaTracks({ mic: true, webcam: false });

    } else {
      await requestAudioVideoPermission(Constants.permission.AUDIO);
    }
    if (cameraPermissionAllowed) {
      setWebcamOn(true);
      getDefaultMediaTracks({ mic: false, webcam: true });
    } else {
      await requestAudioVideoPermission(Constants.permission.VIDEO);
    }
  };

  const getCameraDevices = async () => {
    try {
      if (permissonAvaialble.current?.isCameraPermissionAllowed) {
        let webcams = await getCameras();
        setSelectedWebcam({ id: webcams[0]?.deviceId, label: webcams[0]?.label })
        setDevices((devices) => {
          return { ...devices, webcams };
        });
      }
    } catch (err) {
      console.log("Error in getting camera devices", err);
    }
  };

  const getAudioDevices = async () => {
    try {
      if (permissonAvaialble.current?.isMicrophonePermissionAllowed) {

        let mics = await getMicrophones();
        let speakers = await getPlaybackDevices();
        const hasMic = mics.length > 0;
        if (hasMic) {
          startMuteListener();
        }
        setSelectedSpeaker({ id: speakers[0]?.deviceId, label: speakers[0]?.label })
        setSelectedMic({ id: mics[0]?.deviceId, label: mics[0]?.label });
        setDevices((devices) => {
          return { ...devices, mics, speakers };
        });
      }
    } catch (err) {
      console.log("Error in getting audio devices", err);
    }
  };

  const ButtonWithTooltip = ({ onClick, onState, OnIcon, OffIcon }) => {
    const btnRef = useRef();
    return (
      <>
        <div>
          <button
            ref={btnRef}
            onClick={onClick}
            style={{
              backgroundColor : "black",
              borderRadius : "50px",
              padding : "10px"
            }}
            // className={`rounded-full min-w-auto w-12 h-12 flex items-center justify-center 
            // ${onState ? "bg-white" : "bg-red-650 text-white"}`}
          >
            {onState ? (
              <OnIcon fillcolor={onState ? "#E72B4A" : "white"} />
            ) : (
              <OffIcon fillcolor={onState ? "#E72B4A" : "white"} />
            )}
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="main-outer-container">
      <div className="inner-container-eight">
        <video
          autoPlay
          playsInline
          muted
          ref={videoPlayerRef}
          controls={false}
          style={{
            backgroundColor: "#1c1c1c",
          }}
          className={"video-container"}
        />

        {!isMobile ? (
          <>
            <div className="isMobileContainer-main">
              {!webcamOn ? (
                <p className="camera-pff-container">
                  The camera is off
                </p>
              ) : null}
            </div>
          </>
        ) : null}

        <div className="mic-container">
          <div className="innermic-container">
            {isMicrophonePermissionAllowed ? (
              <ButtonWithTooltip
                onClick={_toggleMic}
                onState={micOn}
                mic={true}
                OnIcon={MicOnIcon}
                OffIcon={MicOffIcon}
              />
            ) : (
              <MicPermissionDenied />
            )}

            {isCameraPermissionAllowed ? (
              <ButtonWithTooltip
                onClick={_toggleWebcam}
                onState={webcamOn}
                mic={false}
                OnIcon={WebcamOnIcon}
                OffIcon={WebcamOffIcon}
              />
            ) : (
              <CameraPermissionDenied />
            )}
          </div>
        </div>
      </div>
      <div className="meeting-inner-container">
          <MeetingDetailsScreen
            participantName={participantName}
            setParticipantName={setParticipantName}
            videoTrack={videoTrack}
            setVideoTrack={setVideoTrack}
            onClickStartMeeting={onClickStartMeeting}
            onClickJoin={async (id) => {
              const token = await getToken();
              const { meetingId, err } = await validateMeeting({
                roomId: id,
                token,
              });
              if (meetingId === id) {
                setToken(token);
                setMeetingId(id);
                onClickStartMeeting();
              } else {
                toast(
                  `${err}`,
                  {
                    position: "bottom-left",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeButton: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  }
                );
              }
            }}
            _handleOnCreateMeeting={async () => {
              const token = await getToken();
              const { meetingId, err } = await createMeeting({ token });

              if (meetingId) {
                setToken(token);
                setMeetingId(meetingId);
              }
              return { meetingId: meetingId, err: err }
            }}
          />
      </div>
    <div>
      <ConfirmBox
              open={dlgMuted}
              successText="OKAY"
              onSuccess={() => {
                setDlgMuted(false);
              }}
              title="System mic is muted"
              subTitle="You're default microphone is muted, please unmute it or increase audio
                  input volume from system settings."
            />
            <ConfirmBox
              open={dlgDevices}
              successText="DISMISS"
              onSuccess={() => {
                setDlgDevices(false);
              }}
              title="Mic or webcam not available"
              subTitle="Please connect a mic and webcam to speak and share your video in the meeting. You can also join without them."
            />
    </div>
    </div>
  );
}
