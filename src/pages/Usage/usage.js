import React, { Fragment, useCallback, useState, useEffect } from "react";
import {
    MyLocationOutlined,
    CloseOutlined,
    ArrowCircleLeftOutlined,
    Inbox,
    StarRate,
    Drafts,
    Delete,
    Info,
    Settings,
} from "@mui/icons-material";
import { Stack, IconButton } from "@mui/material";
import CustomButton from "../../components/CustomButton";
import CustomChip from "../../components/CustomChip";
import CustomTextField from "../../components/CustomTextField";
import CustomRadioButton from "../../components/CustomRadioButton";
import { CustomCircularProgress, CustomLinearProgress } from "../../components/CustomProgress";
import CustomModal from "../../components/CustomModal";
import CustomSnackBar from "../../components/CustomSnackBar";

import "./usage.scss";
import CustomTab from "../../components/CustomTab";
import CustomToggleSwitch from "../../components/CustomToggleSwitch";
import CustomCheckBox from "../../components/CustomCheckBox";
import CustomList from "../../components/CustomList";
import CustomDropdown from "../../components/CustomDropdown";
import CustomMenuDrawer from "../../components/CustomMenuDrawer";

const Usage = () => {
    const radioValues = ["radio1", "radio2", "radio3"];
    const dropdownItems = ["item1", "item2", "item3"];
    const drawerList1 = [
        { name: "Usage", icon: <Inbox /> },
        { name: "Starred", icon: <StarRate /> },
        { name: "Drafts", icon: <Drafts /> },
    ];
    const drawerList2 = [
        { name: "Trash", icon: <Delete /> },
        { name: "Spam", icon: <Info /> },
    ];

    const DrawerChildComponents = () => {
        const [isOn, setIsOn] = useState(true);
        const [radioVal, setRadioVal] = useState(radioValues[0]);
        const [checkVal, setCheckVal] = useState(true);
        const [listItems, setListItems] = useState([
            { name: "item1", checked: false },
            { name: "item2", checked: true },
            { name: "item3", checked: false },
        ]);
        const [activeDropdown, setActiveDropdown] = useState("");
        const [activeFabDropdown, setActiveFabDropdown] = useState(dropdownItems[0]);
        const [progress, setProgress] = useState(10);
        const [openDialog, setOpenDialog] = useState(false);
        const [showSnack, setShowSnack] = useState(true);
        const [textField1, setTextField1] = useState("");
        const [textField2, setTextField2] = useState("");
        const [textField3, setTextField3] = useState("");
        const [textField4, setTextField4] = useState("");
        const [textField5, setTextField5] = useState("");
        const [textField6, setTextField6] = useState("");

        const handleClickChips = useCallback(() => {
            console.info("You clicked the Chip.");
        });

        const handleDelete = useCallback(() => {
            console.info("You clicked the delete icon.");
        });

        const handleCheckList = useCallback((updatedItem) => {
            // eslint-disable-next-line no-confusing-arrow
            const updatedItems = listItems.map((item) =>
                item.name === updatedItem.name ? updatedItem : item,
            );
            setListItems(updatedItems);
        });

        useEffect(() => {
            // const timer = setInterval(() => {
            //     setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
            // }, 800);
            // return () => {
            //     clearInterval(timer);
            // };
        }, []);
        return (
            <Fragment>
                <div className="component-library">
                    <div className="items">
                        <CustomButton
                            label={"enabled"}
                            leftIcon={<MyLocationOutlined />}
                            rightIcon={<MyLocationOutlined />}
                            isTransaprent={false}
                            isDisabled={false}
                            isElevated={false}
                        />
                        <CustomButton
                            label={"enabled"}
                            isTransaprent={false}
                            isDisabled={false}
                            isElevated={false}
                        />
                        <CustomButton
                            label={"disabled"}
                            leftIcon={<MyLocationOutlined />}
                            rightIcon={<MyLocationOutlined />}
                            isTransaprent={false}
                            isDisabled
                            isElevated={false}
                        />
                        <CustomButton
                            label={"enabled"}
                            leftIcon={<MyLocationOutlined />}
                            isTransaprent
                        />

                        <CustomChip
                            label={"enabled"}
                            isTransparent={false}
                            leftIcon={<ArrowCircleLeftOutlined />}
                            rightIcon={<CloseOutlined />}
                            onChipClick={handleClickChips}
                            onRightIconClick={handleDelete}
                        />
                        <CustomChip
                            label={"enabled"}
                            isTransparent
                            leftIcon={<ArrowCircleLeftOutlined />}
                            rightIcon={<CloseOutlined />}
                            onChipClick={handleClickChips}
                            onRightIconClick={handleDelete}
                        />
                        <CustomChip
                            label={"disabled"}
                            isDisabled
                            leftIcon={<ArrowCircleLeftOutlined />}
                            rightIcon={<CloseOutlined />}
                            onChipClick={handleClickChips}
                            onRightIconClick={handleDelete}
                        />
                        <CustomChip
                            label={"enabled"}
                            isElevated
                            leftIcon={<ArrowCircleLeftOutlined />}
                            rightIcon={<CloseOutlined />}
                            onChipClick={handleClickChips}
                            onRightIconClick={handleDelete}
                        />
                        <CustomChip
                            label={"disabled"}
                            isTransparent
                            isDisabled
                            leftIcon={<ArrowCircleLeftOutlined />}
                            rightIcon={<CloseOutlined />}
                            onChipClick={handleClickChips}
                            onRightIconClick={handleDelete}
                        />
                    </div>
                </div>
                <div className="component-library">
                    <div className="items">
                        <CustomTextField
                            id={"standard-helperText1"}
                            label={"username"}
                            defaultValue={textField1}
                            helperText={"valid username"}
                            onChange={(value) => setTextField1(value)}
                        />
                        <CustomTextField
                            id={"standard-helperText2"}
                            label={"username"}
                            defaultValue={textField2}
                            helperText={"valid username"}
                            onChange={(value) => setTextField2(value)}
                            isValid
                        />
                        <CustomTextField
                            id={"standard-helperText3"}
                            label={"username"}
                            defaultValue={textField3}
                            helperText={"invalid username"}
                            onChange={(value) => setTextField3(value)}
                            isInvalid
                        />
                        <CustomTextField
                            id={"standard-helperText4"}
                            label={"username"}
                            defaultValue={textField4}
                            helperText={"valid username"}
                            onChange={(value) => setTextField4(value)}
                            leftIcon={<MyLocationOutlined />}
                        />
                        <CustomTextField
                            id={"standard-helperText5"}
                            label={"username"}
                            defaultValue={textField5}
                            helperText={"valid username"}
                            onChange={(value) => setTextField5(value)}
                            rightIcon={<MyLocationOutlined />}
                        />
                        <CustomTextField
                            id={"filled-disabled"}
                            label={"disabled"}
                            defaultValue={textField6}
                            helperText={"valid username"}
                            onChange={(value) => setTextField6(value)}
                            isDisabled
                        />
                    </div>
                </div>
                <div className="component-library">
                    <div className="items">
                        <CustomTab items={["item 1", "item 2", "item 3"]} />
                    </div>
                </div>
                <div className="component-library">
                    <div className="items">
                        <CustomToggleSwitch
                            id={"switch-1"}
                            name={"custom-switch"}
                            checked={isOn}
                            onChange={() => setIsOn(!isOn)}
                        />
                        <CustomToggleSwitch
                            id={"switch-1"}
                            name={"custom-switch"}
                            checked={isOn}
                            onChange={() => setIsOn(!isOn)}
                            disabled
                        />
                    </div>
                </div>
                <div className="component-library">
                    <div className="items">
                        <CustomRadioButton
                            label={"radio buttons"}
                            handleChange={({ target }) => setRadioVal(target.value)}
                            value={radioVal}
                            items={radioValues}
                        />
                    </div>
                </div>
                <div className="component-library">
                    <div className="items">
                        <CustomCheckBox
                            checked={checkVal}
                            onChange={(e) => setCheckVal(e.target.checked)}
                        />
                        <CustomCheckBox checked={checkVal} disabled />
                    </div>
                </div>
                <div className="component-library">
                    <div className="items">
                        <CustomList items={listItems} handleToggle={handleCheckList} />
                        <CustomList
                            items={listItems}
                            handleToggle={handleCheckList}
                            showDescription
                            maxWidth={800}
                            showAvatar
                        />
                        <CustomList items={listItems} handleToggle={handleCheckList} showAvatar />
                    </div>
                </div>
                <div className="component-library">
                    <div className="items">
                        <CustomDropdown
                            label={"items1"}
                            items={dropdownItems}
                            activeItem={activeDropdown}
                            handleChange={(item) => setActiveDropdown(item)}
                        />
                        <CustomDropdown
                            label={"items2"}
                            items={dropdownItems}
                            activeItem={activeFabDropdown}
                            handleChange={(item) => setActiveFabDropdown(item)}
                            isFabIcon
                            fabIcon={
                                <IconButton
                                    aria-label="settings"
                                    sx={{
                                        bgcolor: "primary.main",
                                        color: "white",
                                        borderRadius: "50%",
                                        width: "40px",
                                        height: "40px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Settings />
                                </IconButton>
                            }
                        />
                    </div>
                </div>
                <div className="component-library">
                    <div className="items">
                        <CustomCircularProgress progress={progress} />
                        <CustomLinearProgress progress={progress} />
                    </div>
                </div>
                <div className="component-library">
                    <div className="items">
                        <CustomButton
                            label={"open modal"}
                            isElevated
                            handleClick={() => setOpenDialog(true)}
                        />
                        <CustomModal
                            isOpen={openDialog}
                            title={"dialog title"}
                            footer={
                                <Fragment>
                                    <CustomButton
                                        label={"action 1"}
                                        handleClick={() => setOpenDialog(false)}
                                        isTransaprent
                                        isText
                                    />
                                    <CustomButton
                                        label={"action 2"}
                                        isTransaprent
                                        handleClick={() => setOpenDialog(false)}
                                        isText
                                    />
                                </Fragment>
                            }
                        >
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </div>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </div>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </div>
                        </CustomModal>
                    </div>
                </div>
                <div className="component-library">
                    <div className="items">
                        <Stack spacing={10} alignItems="center" flexDirection="column">
                            <CustomSnackBar isOpen={showSnack} message={"Snack bar Message"} />
                            <CustomSnackBar
                                isOpen={showSnack}
                                actionLabel={"action"}
                                handleAction={() => setShowSnack(false)}
                                message={"error Message"}
                                type="error"
                            />
                        </Stack>
                        <Stack spacing={20} alignItems="center" flexDirection="column">
                            <CustomSnackBar
                                isOpen={showSnack}
                                actionLabel={"action"}
                                handleAction={() => setShowSnack(false)}
                                message={"success Message"}
                                type="success"
                            />
                            <CustomSnackBar
                                isOpen={showSnack}
                                actionLabel={"action"}
                                handleAction={() => setShowSnack(false)}
                                message={"caution Message"}
                                type="warning"
                            />
                        </Stack>
                    </div>
                </div>
            </Fragment>
        );
    };

    const StarredComponent = () => {
        return <div>Starred component</div>;
    };

    const DraftsComponent = () => {
        return <div>Drafts component</div>;
    };

    const TrashComponent = () => {
        return <div>Trash component</div>;
    };

    const SpamComponent = () => {
        return <div>Spam component</div>;
    };

    const drawerComponentList = {
        usage: <DrawerChildComponents />,
        starred: <StarredComponent />,
        drafts: <DraftsComponent />,
        trash: <TrashComponent />,
        spam: <SpamComponent />,
    };

    const [activeComponent, setActiveComponent] = useState(drawerComponentList.usage);

    return (
        <div className="usage">
            <div className="component-library">
                <div className="items">
                    <CustomMenuDrawer
                        headerLabel={"custom drawer"}
                        list1={drawerList1}
                        list2={drawerList2}
                        handleOnMenuSelect={(item) =>
                            setActiveComponent(drawerComponentList[item.toLowerCase()])
                        }
                    >
                        {activeComponent}
                    </CustomMenuDrawer>
                </div>
            </div>
        </div>
    );
};

export default Usage;
