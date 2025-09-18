import { useMeeting } from "@videosdk.live/react-sdk";
import React, { Fragment } from "react";
import useIsMobile from "../../hooks/useIsMobile";
import useIsTab from "../../hooks/useIsTab";
import { XIcon } from "@heroicons/react/outline";
import { ChatPanel } from "./ChatPanel";
import { ParticipantPanel } from "./ParticipantPanel";
import { Dialog, Transition } from "@headlessui/react";
import { useMediaQuery } from "react-responsive";
import { useMeetingAppContext } from "../../MeetingAppContextDef";
import "./sidebarContainer.scss";
import logo from "../../../static/images/icon.png"

const SideBarTabView = ({
  height,
  sideBarContainerWidth,
  panelHeight,
  panelHeaderHeight,
  panelHeaderPadding,
  panelPadding,
  handleClose,
}) => {
  const { participants } = useMeeting();
  const { sideBarMode } = useMeetingAppContext();

  return (
    <div
      className="side-bar-tab-view-container "
      // style={{
      //   height,
      //   width: sideBarContainerWidth,
      //   paddingTop: panelPadding,
      //   paddingLeft: panelPadding,
      //   paddingRight: panelPadding,
      //   paddingBottom: panelPadding,
      // }}
    >
      <div style={{height : "100%"}} >
        <div
          className="side-bar-tab-view-container-inner"
          // style={{
          //   // height: height,
          //   borderRadius: 10,
          //   overflow: "hidden",
          // }}
        >
          <>
            {sideBarMode && (
              <div
                className={`side-bar-tab-view-container-inner-sidebarmode-one`}
                style={{
                  padding: panelHeaderPadding,
                  // height: panelHeaderHeight - 1,
                  borderBottom: "1px solid #70707033",
                }}
              >
                <img src={logo} ></img>
                <p className="side-bar-tab-view-container-inner-sidebarmode-one-paragraph">
                  {sideBarMode === "PARTICIPANTS"
                    ? `${
                        sideBarMode.charAt(0).toUpperCase() +
                          sideBarMode.slice(1).toLowerCase() || ""
                      } (${new Map(participants)?.size})`
                    : sideBarMode.charAt(0).toUpperCase() +
                        sideBarMode.slice(1).toLowerCase() || ""}
                </p>
                <button
                  // className="text-white"
                  onClick={handleClose}
                  style={{ margin: 0, padding: 0 , color : "white" }}
                >
                  <XIcon className="side-bar-tab-view-container-inner-sidebarmode-xicon" />
                </button>
              </div>
            )}
            {sideBarMode === "PARTICIPANTS" ? (
              <ParticipantPanel panelHeight={panelHeight} />
            ) : sideBarMode === "CHAT" ? (
              <ChatPanel panelHeight={panelHeight} />
            ) : null}
          </>
        </div>
      </div>
    </div>
  );
};


export function SidebarConatiner({ height, sideBarContainerWidth }) {
  const { raisedHandsParticipants, sideBarMode, setSideBarMode } =
    useMeetingAppContext();
  const isMobile = useIsMobile();
  const isTab = useIsTab();
  const isLGDesktop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
  const isXLDesktop = useMediaQuery({ minWidth: 1440 });

  const panelPadding = 8;

  const paddedHeight = height - panelPadding * 3.5;

  const panelHeaderHeight = isMobile
    ? 40
    : isTab
    ? 44
    : isLGDesktop
    ? 48
    : isXLDesktop
    ? 52
    : 0;

  const panelHeaderPadding = isMobile
    ? 6
    : isTab
    ? 8
    : isLGDesktop
    ? 10
    : isXLDesktop
    ? 12
    : 0;

  const handleClose = () => {
    setSideBarMode(null);
  };

  return sideBarMode ? (
    isTab || isMobile ? (
      <Transition appear show={sideBarMode ? true : false} as={Fragment}>
        <Dialog
          as="div"
          className="side-bar-container"
          style={{ zIndex: 9999  }}
          onClose={handleClose}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="side-bar-container-transition-child-container-one" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="translate-y-full opacity-0 scale-95"
            enterTo="translate-y-0 opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="translate-y-0 opacity-100 scale-100"
            leaveTo="translate-y-full opacity-0 scale-95"
          >
            <div className="side-bar-container-inner-one">
              <div className="side-bar-container-inner-one-one">
                <Dialog.Panel className="side-bar-container-inner-one-dialog-panel">
                  <SideBarTabView
                    height={"100%"}
                    sideBarContainerWidth={"100%"}
                    panelHeight={height}
                    raisedHandsParticipants={raisedHandsParticipants}
                    panelHeaderHeight={panelHeaderHeight}
                    panelHeaderPadding={panelHeaderPadding}
                    panelPadding={panelPadding}
                    handleClose={handleClose}
                  />
                </Dialog.Panel>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    ) : (
      <SideBarTabView
        height={paddedHeight}
        sideBarContainerWidth={sideBarContainerWidth}
        panelHeight={paddedHeight - panelHeaderHeight - panelHeaderPadding}
        raisedHandsParticipants={raisedHandsParticipants}
        panelHeaderHeight={panelHeaderHeight}
        panelHeaderPadding={panelHeaderPadding}
        panelPadding={panelPadding}
        handleClose={handleClose}
      />
    )
  ) : (
    <></>
  );
}
