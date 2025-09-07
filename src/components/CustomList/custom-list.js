import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemAvatar,
    Checkbox,
    Avatar,
} from "@mui/material";

const CustomList = ({
    items,
    handleToggle,
    showDescription,
    showAvatar,
    maxWidth,
    labelText = " I will be in your neighborhood doing errands",
    descriptionText,
}) => {
    return (
        <List sx={{ width: "100%", maxWidth }}>
            {items.map((item, idx) => {
                const { name, checked } = item;
                const labelId = `checkbox-list-label-${name}`;
                return (
                    <ListItem
                        key={idx}
                        secondaryAction={
                            <Checkbox
                                edge="end"
                                onChange={() => handleToggle({ ...item, checked: !item.checked })}
                                checked={checked}
                                inputProps={{ "aria-labelledby": labelId }}
                            />
                        }
                        disablePadding
                    >
                        <ListItemButton>
                            <ListItemAvatar>
                                {showAvatar && (
                                    <Avatar
                                        alt={`Avatar n°${idx + 1}`}
                                        src={`/static/images/avatar/${idx + 1}.jpg`}
                                    />
                                )}
                            </ListItemAvatar>
                            <ListItemText
                                id={labelId}
                                primary={`Line item ${idx + 1}`}
                                secondary={
                                    showDescription ? (
                                        <Fragment>{descriptionText || labelText}</Fragment>
                                    ) : null
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
};

CustomList.defaultProps = {
    items: [
        { name: "item1", checked: false },
        { name: "item2", checked: true },
        { name: "item3", checked: false },
    ],
    handleToggle: () => {},
    showDescription: false,
    descriptionText: "",
    showAvatar: false,
    maxWidth: 360,
};

CustomList.propTypes = {
    items: PropTypes.array,
    handleToggle: PropTypes.func,
    showDescription: PropTypes.bool,
    showAvatar: PropTypes.bool,
    maxWidth: PropTypes.number,
    descriptionText: PropTypes.string,
};

export default CustomList;
