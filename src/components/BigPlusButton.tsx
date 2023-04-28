import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export function BigPlusButton() {
  return (
    <IconButton aria-label="choose city" sx={{ width: '6rem', height: '6rem' }} color="success">
      <AddCircleIcon sx={{ width: '100%', height: '100%' }} />
    </IconButton>
  );
}
