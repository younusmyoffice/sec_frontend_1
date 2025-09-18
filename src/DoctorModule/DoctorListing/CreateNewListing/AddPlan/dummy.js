// ... (Your existing imports and component structure)

const YourComponent = () => {
    const [allChecked, setAllChecked] = useState(false);
    const [completedChecked, setCompletedChecked] = useState(false);
    const [cancelledChecked, setCancelledChecked] = useState(false);

    const handleCheckBoxChange = (checkboxType) => {
        switch (checkboxType) {
            case "all":
                setAllChecked(!allChecked);
                setCompletedChecked(false);
                setCancelledChecked(false);
                break;
            case "completed":
                setCompletedChecked(!completedChecked);
                setAllChecked(false);
                setCancelledChecked(false);
                break;
            case "cancelled":
                setCancelledChecked(!cancelledChecked);
                setAllChecked(false);
                setCompletedChecked(false);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <div className="first-plan">
                <CustomCheckBox checked={allChecked} onChange={() => handleCheckBoxChange("all")} />
                <Typography>Messaging Plan</Typography>
            </div>
            <div className="first-plan-content">
                <CustomTextField
                    label="Price"
                    helperText={""}
                    textcss={{
                        width: "250px",
                        height: "56px",
                        flexShrink: "0",
                        color: "#787579",
                        fontFamily: "poppins", // Fix the typo in fontfamily
                        fontSize: "16px", // Fix the typo in fontSize
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "24px",
                    }}
                    disabled={!allChecked}
                />
                <CustomDropdown
                    label={"Duration"}
                    items={dropdownItems}
                    activeItem={activeDropdown1}
                    dropdowncss={{
                        width: "230px",
                        height: "56px",
                        color: "#E6E1E5",
                    }}
                    disabled={!allChecked}
                />
            </div>

            <div className="second-plan">
                <CustomCheckBox
                    checked={completedChecked}
                    onChange={() => handleCheckBoxChange("completed")}
                />
                <Typography>Video Plan</Typography>
            </div>
            <div className="second-plan-content">
                <CustomTextField
                    label="Price"
                    helperText={""}
                    textcss={{
                        width: "250px",
                        height: "56px",
                        flexShrink: "0",
                        color: "#787579",
                        fontFamily: "poppins",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "24px",
                    }}
                    disabled={!completedChecked}
                />
                <CustomDropdown
                    label={"Duration"}
                    items={dropdownItems}
                    activeItem={activeDropdown2}
                    dropdowncss={{
                        width: "230px",
                        height: "56px",
                        color: "#E6E1E5",
                    }}
                    disabled={!completedChecked}
                />
            </div>

            <div className="third-plan">
                <CustomCheckBox
                    checked={cancelledChecked}
                    onChange={() => handleCheckBoxChange("cancelled")}
                />
                <Typography>Video Plan</Typography>
            </div>
            <div className="third-plan-content">
                <CustomTextField
                    label="Price"
                    helperText={""}
                    textcss={{
                        width: "250px",
                        height: "56px",
                        flexShrink: "0",
                        color: "#787579",
                        fontFamily: "poppins",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "24px",
                    }}
                    disabled={!cancelledChecked}
                />
                <CustomDropdown
                    label={"Duration"}
                    items={dropdownItems}
                    activeItem={activeDropdown3}
                    dropdowncss={{
                        width: "230px",
                        height: "56px",
                        color: "#E6E1E5",
                    }}
                    disabled={!cancelledChecked}
                />
            </div>
        </>
    );
};

export default YourComponent;
