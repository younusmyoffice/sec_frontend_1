import React from "react";
import { useMeetingAppContext } from "../MeetingAppContextDef";
import { ParticipantView } from "./ParticipantView";
import "./participantgrid.scss";

const MemoizedParticipant = React.memo(
  ParticipantView,
  (prevProps, nextProps) => {
    return prevProps.participantId === nextProps.participantId;
  }
);

function ParticipantGrid({ participantIds, isPresenting }) {
  const { sideBarMode } = useMeetingAppContext();
  const isMobile = window.matchMedia(
    "only screen and (max-width: 768px)"
  ).matches;

  const perRow =
    isMobile || isPresenting
      ? participantIds.length < 4
        ? 1
        : participantIds.length < 9
        ? 2
        : 3
      : participantIds.length < 5
      ? 2
      : participantIds.length < 7
      ? 3
      : participantIds.length < 9
      ? 4
      : participantIds.length < 10
      ? 3
      : participantIds.length < 11
      ? 4
      : 4;

  return (
    <div
      className={`participant-grid-main-container ${
        participantIds.length < 2 && !sideBarMode && !isPresenting
          ? "participant-grid-main-container-sidebar-two"
          : participantIds.length < 3 && !sideBarMode && !isPresenting
          ? "participant-grid-main-container-sidebar-three "
          : participantIds.length < 4 && !sideBarMode && !isPresenting
          ? "participant-grid-main-container-sidebar-four"
          : participantIds.length > 4 && !sideBarMode && !isPresenting
          ? "participant-grid-main-container-sidebar-five"
          : "participant-grid-main-container-sidebar-default"
      }`}
    >
      <div className="participant-grid-inner-container ">
        {Array.from(
          { length: Math.ceil(participantIds.length / perRow) },
          (_, i) => {
            return (
              <div
                key={`participant-${i}`}
                className={`participant-grid-inner-container-one ${
                  isPresenting
                    ? participantIds.length === 1
                      ? "participant-grid-inner-container-one-one"
                      : "participant-grid-inner-container-one-two"
                    : "participant-grid-inner-container-one-three"
                }`}
              >
                {participantIds
                  .slice(i * perRow, (i + 1) * perRow)
                  .map((participantId) => {
                    return (
                      <div
                        key={`participant_${participantId}`}
                        className={`participant-grid-inner-container-one ${
                          isPresenting
                            ? participantIds.length === 1
                              ? "participant-grid-inner-container-two"
                              : participantIds.length === 2
                              ? "participant-grid-inner-container-two-one"
                              : "participant-grid-inner-container-two-two"
                            : "participant-grid-inner-container-two-default"
                        } participant-grid-inner-container-two-three ${
                          participantIds.length === 1
                            ? "participant-grid-inner-container-two-four"
                            : "participant-grid-inner-container-two-five"
                        } participant-grid-inner-container-two-six`}
                      >
                        <MemoizedParticipant participantId={participantId} />
                      </div>
                    );
                  })}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export const MemoizedParticipantGrid = React.memo(
  ParticipantGrid,
  (prevProps, nextProps) => {
    return (
      JSON.stringify(prevProps.participantIds) ===
        JSON.stringify(nextProps.participantIds) &&
      prevProps.isPresenting === nextProps.isPresenting
    );
  }
);
