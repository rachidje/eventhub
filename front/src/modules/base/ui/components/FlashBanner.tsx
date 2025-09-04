import { useAppDispatch, type AppState } from '@eventhub/store/store';
import { useEffect, type JSX } from 'react';
import { useSelector } from 'react-redux';
import { flashActions } from '../../store/flash-message.slice';
import { Alert } from '@mui/material';

export default function FlashBanner(): JSX.Element | null {
    const dispatch = useAppDispatch();
    const { message, level } = useSelector((state: AppState) => state.flash);

    useEffect(() => {
        if (!message) return;
        const id = setTimeout(() => dispatch(flashActions.clearFlash()), 4000);
        return () => clearTimeout(id);
    }, [message, dispatch]);

    if (!message) return null;

    return (
        <Alert
            severity={level} // 'success' | 'info' | 'warning' | 'error'
            onClose={() => dispatch(flashActions.clearFlash())}
            sx={{ mb: 2 }}
        >
        {message}
        </Alert>
    );
}
