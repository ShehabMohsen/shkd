import React from 'react';
import {
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useListingContext } from '../contexts/ListingContext';
export default function DeleteListingButton({ listingId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const { listingVariables } = useListingContext();
  const deleteListing = listingVariables.deleteListing;
  const toast = useToast();

  function onDelete() {
    deleteListing(listingId);
    toast({
      position: 'top',
      title: 'Deletion Success.',
      description: 'Your listing has been removed',
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
    onClose();
  }
  return (
    <>
      <Button
        onClick={onOpen}
        variant="outline"
        colorScheme="red"
        rightIcon={<DeleteIcon />}
      >
        Delete
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Listing
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}