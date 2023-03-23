import React from 'react';
import {
  Box,
  Button,
  Stack,
} from '@mui/material';

interface Props {
  onSelectItem: Function,
}

function ListNew({ onSelectItem }: Props) {

  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{
        border: 1,
        borderColor: 'divider',
        padding: 3,
        textAlign: 'right'
    }}
    >
      <Box sx={{ flexGrow: 1 }} />
      <Button variant="contained" onClick={() => onSelectItem()}>New item</Button>
    </Stack>
  );
}

export default ListNew;
