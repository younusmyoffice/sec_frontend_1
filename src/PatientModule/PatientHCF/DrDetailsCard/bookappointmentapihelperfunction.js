import React from "react";
import axiosInstance from "../../../config/axiosInstance";

// export const fetch_Time_Slots = async (timeslotData) => {
//     try {
//         const response = await axiosInstance.post("/sec/patient/getAppointmentSlots", timeslotData);
//         return response?.data?.response?.availableSlots;
//         // setTime_slot(response?.data?.response?.availableSlots);
//     } catch (err) {
//         return err;
//         console.log("Erorr : ", err);
//     }
// };

export const FetchDoctorAvailableDates = async (drID) => {
    try {
        const resp = await axiosInstance.post(
            "/sec/patient/getAvailableAppointmentDates",
            JSON.stringify({
                doctor_id: Number(drID),
            }),
        );
        console.log("Getting avaliable slots")
        let date = resp?.data?.availableDates;
        let availableDates = date.map((dateString) => {
            const [year, month, day] = dateString.split("-").map(Number);
            return new Date(year, month - 1, day); // month -1 to get the correct month
        });
        return availableDates;
    } catch (err) {
        return err;
        console.log("Available dates slots : ", err);
    }
};

export const fetchQuestions = async (drID , listID) => {
    try {
        const response = await axiosInstance.post(
            "/sec/patient/createAppointmentPackageQuestion/",
            JSON.stringify({
                doctor_id: drID,
                is_active: 1,
                doctor_list_id : listID
            }),
        );
        return response?.data?.response?.questions;
    } catch (err) {
        console.log("Questions Error : ", err);
    }
};

//  api function to fetch the doctor duration slots
export const fetchDocDuration = async (drID, date) => {
    try {
        const response = await axiosInstance(`/sec/patient/getAppointmentPlanDuration/${drID}?date=${date}`);
        // console.log("Suration : ", response.data?.response?.durations);
        let duration = [];
        for (let key in response.data?.response?.durations) {
            console.log("durations :   ==   ",response.data?.response?.durations[key]?.plan_duration);
            duration.push(response.data?.response?.durations[key]?.plan_duration);
        }
        console.log(duration);
        return duration;
    } catch (err) {
        return err;
        console.log("Duration Error : ", err);
    }
};


export function formatDate(inputDateStr) {
    // Create a Date object from the input string
    const date = new Date(inputDateStr);

    // Extract year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');

    // Format as "YYYY-MM-DD"
    return `${year}-${month}-${day}`;
}


    // api function to fetch the select package
    export const fetchSelectPackage = async (data) => {
        console.log("fetch select package", data);
        try {
            const response = await axiosInstance.post(
                "/sec/patient/createAppointmentPackageSelect/",
                JSON.stringify(data),
            );
            console.log("Package plan : ", response.data?.response.plan);
            return  response?.data?.response.plan
            // setSelectPackage(response?.data?.response.plan);
            // for (let key in response?.data?.response) {
            //     duration.push(key);
            //     // setDuration([...duration , key])
            // }
        } catch (err) {
            return err;
            // console.log("select Error : ", err);
        }
    };