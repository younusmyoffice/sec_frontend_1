import React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CustomButton from "../../../../components/CustomButton";
import FilterItems from "./FilterItems";
import FilterItems2 from "./FilterItems2";

const ITEM_HEIGHT = 78;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.0 + ITEM_PADDING_TOP,
            width: 350,
        },
    },
};

const names = [<FilterItems />, <FilterItems2 />];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
const Filter = () => {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value,
        );
    };
    return (
        <>
            <div>
                <FormControl sx={{ width: 100, background: " #EFEFEF" }}>
                    <Select
                        multiple
                        displayEmpty
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <em>Filter</em>;
                            }

                            return selected.join(", ");
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ "aria-label": "Without label" }}
                    >
                        <MenuItem value="">
                            <em style={{ fontWeight: "bold" }}>Filter</em>
                        </MenuItem>
                        {names.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, personName, theme)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                        <div style={{ textAlign: "center" }}>
                            <CustomButton label="Apply" /> <br />
                            <br />
                            <CustomButton label="Clear" isTransaprent />
                        </div>
                    </Select>
                </FormControl>
            </div>
        </>
    );
};
export default Filter;
