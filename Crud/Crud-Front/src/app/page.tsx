'use client'
import Image from 'next/image';
import styles from './page.module.css';
import { NextUIProvider } from "@nextui-org/react";
import UserList from '@/components/UserList';
import ModalUser from '../components/ModalUser';

export default function Home() {
  return (
    <div className={styles.App}>
      <NextUIProvider>
        <div>
          <ModalUser />
        </div>
        <div className={styles['home-page-list']}>
          <UserList />
        </div>
      </NextUIProvider>
    </div>
  );
}



