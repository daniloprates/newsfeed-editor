import React, { useState } from 'react';
import {
  Typography as Text,
  Box,
  TextField,
  Button,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ArrowBackIos, Delete, Article, Reorder, Add } from '@mui/icons-material';
import { getTitle } from '../utils';
import type { DaedalusSchema, DaedalusItemSchema } from '../types';

interface Props {
  content: DaedalusSchema,
  onSelectItem: Function,
}

function ListScreen({ onSelectItem, content }: Props) {

  const { items: list } = content;

  return (
    <div>
      <List>
        {
          list.map((item, index) => {
            const title = getTitle(item);
            const date = new Date(item.date)
            const key = title.replaceAll(' ', '');
            return (
              <ListItem
                key={key}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
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
    </div>
  );
}

export default ListScreen;
