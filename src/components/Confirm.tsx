import React, { useState } from 'react';
import Dialog from './Dialog';

interface Props {
  content: string,
  onConfirm: Function,
  onCancel: Function,
  title?: string,
  confirmLabel?: string,
  cancelLabel?: string,
}


function Confirm({
  onConfirm,
  onCancel,
  content,
  title = 'Confirm?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel'
}: Props) {

  return (
    <Dialog
      open
      title={title}
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
