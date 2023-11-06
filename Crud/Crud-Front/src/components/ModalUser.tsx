'use client'
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import AddUser from '@/components/AddUser';
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import styles from '../app/page.module.css'; 

export default function ModalUser() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} className={styles['open-modal-button']}>Open Modal</Button> 

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className={styles.modal}> 
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className={styles['modal-header']}>Usuário Edits</ModalHeader> 
              <ModalBody className={styles['modal-body']}>
              <div className={styles['modal-item']}>
                <AddUser />
              </div>
              <div className={styles['modal-item']}>
                <EditUser />
              </div>
              <div className={styles['modal-item']}>
                <DeleteUser />
              </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Voltar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
