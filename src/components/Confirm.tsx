import React, { useState } from 'react';
import Dialog from './Dialog';

interface Props {
  content: string,
  onConfirm: Function,
  onCancel: Function,
  confirmLabel?: string,
  cancelLabel?: string,
}


function Confirm({onConfirm, onCancel, content, confirmLabel = 'Confirm', cancelLabel = 'Cancel' }: Props) {

  return (
    <Dialog
      open
      title="Confirm?"
      content={content}
      actions={[
        {
          label: cancelLabel,
          action: onCancel,
          color: 'secondary'
        },
        {
          label: confirmLabel,
          action: onConfirm,
        },


      ]}
    />
  );
}

export default Confirm;
