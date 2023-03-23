import React from 'react';
import {
  Box,
  Link,
  Typography as Text,
} from '@mui/material';

interface Props {
  onImportJson: Function,
  onUseExample: Function,
}

function ListScreen({ onImportJson, onUseExample }: Props) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Text variant="h4"><p><Link href="#" onClick={() => onImportJson()}>Import Json</Link> to start editing</p></Text>
      <p>You can <Link href="#" onClick={() => onUseExample()}>use an example JSON</Link>.</p>
    </Box>
  );
}

export default ListScreen;
