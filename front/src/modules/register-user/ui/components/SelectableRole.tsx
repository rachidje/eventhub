import { Card, CardActionArea, Typography } from "@mui/material";

export const SelectableRole: React.FC<{
    title: string|null;
    isSelected: boolean;
    onSelect: () => void
}> = ({title, isSelected, onSelect}) => {
    return (
        <CardActionArea onClick={onSelect}>
            <Card sx={{padding: 4}} elevation={isSelected ? 6 : 1}>
                <Typography variant="h6" fontWeight={isSelected ? 700 : undefined} textAlign="center">
                    {title}
                </Typography>
            </Card>
        </CardActionArea>
    )
}