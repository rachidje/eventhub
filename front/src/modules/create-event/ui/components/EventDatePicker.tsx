import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";

export const EventDatePicker: React.FC<{
    date: Date
    setDate: (date: any) => void

}> = ({ date, setDate }) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="Date de l'événement"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                // renderInput={(params) => <TextField {...params} fullWidth />}
            />
        </LocalizationProvider>
    );
}
