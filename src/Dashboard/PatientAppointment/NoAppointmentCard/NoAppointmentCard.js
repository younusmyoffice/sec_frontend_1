import React from 'react';
import './noappointment.scss';
import no_calender_image from '../../../static/images/DrImages/no_Appointment_calander.png';
import CustomButton from '../../../components/CustomButton';
import { useNavigate } from 'react-router-dom';

const NoAppointmentCard = ({ButtonLabel , ButtonPath , text_one , text_two , style={} }) => {
    const navigate = useNavigate();
    return(
        <>
            <div>
                <div><img style={style} src={no_calender_image}/></div>
                {
                    text_one ?  <div><p>{text_one}</p></div> : null
                }
                {   
                    text_two ?  <div><p>{text_two}</p></div> : null
                }

                {
                    ButtonLabel ? <div><CustomButton 
                    handleClick={() => {
                        console.log("Appointment Navigate");
                        navigate(`${ButtonPath}`);
                    }}
                    buttonCss={{borderRadius : "100px"}}
                    label={ButtonLabel}
                 /></div> : null
                }
            </div>
        </>
    )
}

export default NoAppointmentCard;