import { MenuItem, TextField } from "@mui/material";

/**
 * @author Peter An
 * @param {string} title - display label title
 * @param {string || number} value - Final value for submission
 * @param {string[] || number[]} options - A list of options for dropdown
 * @param {function} changeHandler - The function of change values
 * @returns A Dropdown Menu
 */
const DropDown = (props) => {
    const { title, value, options, changeHandler } = props;

    return (
        <TextField
            value={value}
            onChange={changeHandler}
            select // tell TextField to render select
            label={title}
            margin="normal"
        >
            {options.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default DropDown;
