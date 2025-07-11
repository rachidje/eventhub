import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

export const EventTimePicker: React.FC<{
    label: string
    hour: Date
    setHour: (date: any) => void
}> = ({ label,hour, setHour }) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileTimePicker
                label={label}
                value={hour}
                onChange={(newValue) => setHour(newValue)}
            />
        </LocalizationProvider>
    );
}
