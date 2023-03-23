import React from 'react';
import {
  Button,
  Grid
} from '@mui/material';
import type { Confirmation } from '../types';

import ImportConfirmations from './ImportConfirmations';

interface Props {
  onSubmit: Function,
  onCancel: Function,
  isDisabled: boolean,
  confirmation?: Confirmation,
  onConfirmCancel?: Function,
  onConfirmSubmit?: Function,
  onDontConfirm?: Function,
}

function ImportFooter({
  onSubmit,
  onCancel,
  isDisabled,
  confirmation,
  onConfirmCancel,
  onConfirmSubmit,
  onDontConfirm
}: Props) {

  return (
    <div>

      <Grid
        container
        justifyContent="right"
        sx={{ borderTop: 1, borderColor: 'divider', mb: 5, mt: 5, padding: 5, align: 'center', '& button': { m: 1 } }}
      >
        <Grid item>
          <Button
            color="secondary"
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={isDisabled}
            onClick={() => onSubmit()}
          >
            Import json
          </Button>
        </Grid>
      </Grid>
      {
        !!confirmation &&
        !!onConfirmCancel &&
        !!onConfirmSubmit &&
        !!onDontConfirm && (
          <ImportConfirmations
            confirmation={confirmation}
            onConfirmCancel={onConfirmCancel}
            onConfirmSubmit={onConfirmSubmit}
            onDontConfirm={onDontConfirm}
          />
        )
      }
    </div>
  );
}

export default ImportFooter;
