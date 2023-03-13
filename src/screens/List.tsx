import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography as Text,
} from '@mui/material';
import { ArrowBackIos, Delete, Article, Reorder, Add } from '@mui/icons-material';
import { getTitle } from '../utils';
import type { DaedalusSchema, DaedalusItemSchema } from '../types';

interface Props {
  content?: DaedalusSchema,
  onSelectItem: Function,
  onDelete: Function,
}

function ListScreen({ onSelectItem, onDelete, content }: Props) {

  const { items: list = [] } = content || {};

  return (
    <div>
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
        <Button variant="contained" disabled>New item (soon)</Button>
      </Stack>
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
      {
        !list.length && (
          <Text variant="h4" align="center"><p>Import Json to start editing</p></Text>
        )
      }
    </div>
  );
}

export default ListScreen;
