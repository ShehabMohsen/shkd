import React from 'react';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/menu';
import { ChevronDownIcon} from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

export default function ProfileMenu({authVariables}) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon = {<ChevronDownIcon/>}
        colorScheme="orange"
        bg={'orange.400'}
        _hover={{
          bg: 'orange.500',
        }}
        _active={{
            bg:'orange.500'
        }}
      >
        Profile
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
          <MenuItem>My Listings</MenuItem>
          <MenuItem>Order History </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Help">
          <MenuItem onClick={authVariables.logout}>Sign Out</MenuItem>
          <MenuItem>About Us</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}