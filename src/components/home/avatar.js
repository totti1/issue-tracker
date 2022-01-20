import * as React from 'react';
import { Avatar, Stack } from '@mui/material';
import account from '../../_mocks_/account';

export default function ImageAvatars() {
  return (
    <Stack direction="row" sx={{ marginTop: 2 }}>
      <Avatar alt="Remy Sharp" src={account.photoURL} sx={{ width: 75, height: 75 }} />
    </Stack>
  );
}
