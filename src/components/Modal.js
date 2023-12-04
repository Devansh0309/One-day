import * as React from 'react';
import List from '@mui/joy/List';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';

export default function DialogVerticalScroll({
    layout, setLayout,modalContent
}) {

  return (
    <React.Fragment>
      <Modal
        open={!!layout}
        onClose={() => {
          setLayout(undefined);
        }}
      >
        <ModalDialog layout={layout}>
          <ModalClose />
          <DialogTitle>Place, Day and Time</DialogTitle>
          
          <List
            sx={{
              overflow: "auto",
              mx: 'calc(-1 * var(--ModalDialog-padding))',
              px: 'var(--ModalDialog-padding)',
            }}
          >
            
            <p>{modalContent}</p>
          </List>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}