import React from 'react';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Delete, Article } from '@mui/icons-material';
import { getTitle } from '../utils';
import type { DaedalusItemSchema } from '../types';

interface Props {
  list: DaedalusItemSchema[],
  onDelete: Function,
  onSelectItem: Function,
}

function ListItems({
  list,
  onDelete,
  onSelectItem,
}: Props) {

  return (
    <List>
      {
        !!list.length && list.map((item, index) => {
          const title = getTitle(item);
          const date = new Date(item.date)
          const key = title.replaceAll(' ', '');
          return (
              <ListItem
                key={key}
                secondaryAction={
                  <IconButton onClick={() => onDelete(index)} edge="end" aria-label="delete">
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemButton
                  onClick={() => onSelectItem(index)}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Article />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={title}
                    secondary={date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  />
                </ListItemButton>
              </ListItem>
          );
        })
      }
    </List>
  );
}

export default ListItems;
