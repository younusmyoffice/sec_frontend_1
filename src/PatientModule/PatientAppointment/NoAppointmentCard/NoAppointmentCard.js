import React from "react";
import PropTypes from "prop-types";
import "./noappointment.scss";
import no_calender_image from "../../../static/images/DrImages/no_Appointment_calander.png";
import CustomButton from "../../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import logger from "../../../utils/logger"; // Centralized logging

/**
 * NoAppointmentCard Component
 * 
 * Empty state component displayed when no appointments are found
 * Features:
 * - Shows empty calendar image
 * - Displays customizable text messages
 * - Optional action button for navigation
 * 
 * @param {Object} props - Component props
 * @param {string} [props.ButtonLabel] - Label for the action button
 * @param {string} [props.ButtonPath] - Navigation path for the button
 * @param {string} [props.text_one] - Primary text message
 * @param {string} [props.text_two] - Secondary text message
 * @param {Object} [props.style] - Custom styles for the image
 * 
 * @component
 */
const NoAppointmentCard = ({ 
    ButtonLabel, 
    ButtonPath, 
    text_one, 
    text_two, 
    style = {} 
}) => {
    logger.debug("🔵 NoAppointmentCard component rendering", {
        hasButton: !!ButtonLabel,
        hasTextOne: !!text_one,
        hasTextTwo: !!text_two,
    });
    
    const navigate = useNavigate();

    /**
     * Handle button click - navigate to specified path
     */
    const handleButtonClick = () => {
        logger.debug("🔘 NoAppointmentCard button clicked", { ButtonPath });
        
        if (!ButtonPath) {
            logger.error("❌ Button path is missing");
            return;
        }
        
        try {
            navigate(ButtonPath);
            logger.debug("✅ Navigated to:", ButtonPath);
        } catch (error) {
            logger.error("❌ Error navigating:", error);
        }
    };

    return (
        <div>
            {/* Empty calendar image */}
            <div>
                <img 
                    style={style} 
                    src={no_calender_image} 
                    alt="No appointments calendar" 
                />
            </div>
            
            {/* Primary text message */}
            {text_one && (
                <div>
                    <p>{text_one}</p>
                </div>
            )}
            
            {/* Secondary text message */}
            {text_two && (
                <div>
                    <p>{text_two}</p>
                </div>
            )}

            {/* Action button (optional) */}
            {ButtonLabel && (
                <div>
                    <CustomButton 
                        handleClick={handleButtonClick}
                        buttonCss={{ borderRadius: "100px" }}
                        label={ButtonLabel}
                    />
                </div>
            )}
        </div>
    );
};

// PropTypes for type checking
NoAppointmentCard.propTypes = {
    ButtonLabel: PropTypes.string,
    ButtonPath: PropTypes.string,
    text_one: PropTypes.string,
    text_two: PropTypes.string,
    style: PropTypes.object,
};

NoAppointmentCard.defaultProps = {
    ButtonLabel: null,
    ButtonPath: null,
    text_one: null,
    text_two: null,
    style: {},
};

export default NoAppointmentCard;