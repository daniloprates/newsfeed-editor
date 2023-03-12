import React, { useState } from 'react';
import { Typography as Text, Box, TextField, Button } from '@mui/material';
import { getTitle } from '../utils';
import type { DaedalusSchema, DaedalusItemSchema } from '../types';

interface Props {
  content: DaedalusSchema,
  onSelectItem: Function,
}

function List({ onSelectItem, content }: Props) {

  const { items: list } = content;

  return (
    <div>
      <Text variant="h2">List</Text>
      <ul>
        {
          list.map((item, index) => {
            const title = getTitle(item);
            const key = title.replaceAll(' ', '');
            return (
              <li key={key}>
                <Button onClick={() => onSelectItem(index)}>{title}</Button>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default List;
