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
import { useNavigate } from 'react-router-dom';
export default function ProfileMenu({authVariables}) {
  const navigate = useNavigate();

  function onClickOrderHistory(){
    navigate("/user/orders");
  }
  function onClickMyListings(){
    navigate("/user/listings");
  }

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
          <MenuItem onClick={onClickMyListings}>My Listings</MenuItem>
          <MenuItem onClick={onClickOrderHistory}>Order History </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Account">
          <MenuItem onClick={authVariables.logout}>Sign Out</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}
