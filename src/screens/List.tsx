import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Link,
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
  onImportJson: Function,
  onUseExample: Function,
}

function ListScreen({ onSelectItem, onDelete, content, onImportJson, onUseExample }: Props) {

  const { items: list = [] } = content || {};

  return (
    <div>
      {
        !!list.length && (
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
        )
      }
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
          <Box sx={{ textAlign: 'center' }}>
            <Text variant="h4"><p><Link href="#" onClick={() => onImportJson()}>Import Json</Link> to start editing</p></Text>
            <p>You can <Link href="#" onClick={() => onUseExample()}>use an example JSON</Link>.</p>
          </Box>
        )
      }
    </div>
  );
}

export default ListScreen;
