import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

export default function SplitButton(props) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
        props.onSelect(index);
    };

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <Grid style={{ ...props.style }} container direction="column" alignItems="center">
            <Grid item xs={12}>
                <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                    <Button onClick={handleToggle}>{props.options[selectedIndex].vendorName}</Button>
                    <Button
                        color="primary"
                        size="small"
                        aria-owns={open ? "menu-list-grow" : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === "bottom" ? "center top" : "center bottom"
                            }}
                        >
                            <Paper id="menu-list-grow">
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList>
                                        {props.options.map((option, index) => (
                                            <MenuItem
                                                key={index}
                                                selected={index === selectedIndex}
                                                onClick={event => handleMenuItemClick(event, index)}
                                            >
                                                {option.vendorName}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Grid>
        </Grid>
    );
}
