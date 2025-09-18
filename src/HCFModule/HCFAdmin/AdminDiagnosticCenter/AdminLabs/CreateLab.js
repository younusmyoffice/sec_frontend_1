import React from "react";
const CreateLab = () => {
    return (
        <>
            <form>
            <div>
            <CustomDropdown
                            label={"Department"}
                            items={dropdownItems}
                            activeItem={activeDropdown}
                            handleChange={(item) => setActiveDropdown(item)}
                            style={{width:"400px"}}
                        />
                            </div>
                            <h5 style={{ textAlign: "start", marginLeft: "20px" }}>Working days</h5>
                            <div>
                                <div style={{ display: "flex", margin: "10px" }} >
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateRangePicker']}>
                                            <DateRangePicker localeText={{ start:<div>From <CalendarTodayIcon style={{marginLeft:"130px",color:"grey"}}/></div>, end: <div>To <CalendarTodayIcon style={{marginLeft:"130px",color:"grey"}}/></div> }} />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                                </div>
            </form>
        </>
    )
}
export default CreateLab

