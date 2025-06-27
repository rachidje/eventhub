import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export const EventTimePicker: React.FC<{
    label: string
    hour: Date
    setHour: (date: any) => void
}> = ({ label,hour, setHour }) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
                label={label}
                value={hour}
                onChange={(newValue) => setHour(newValue)}
                // renderInput={(params) => <TextField {...params} fullWidth />}
            />
        </LocalizationProvider>
    );
}
