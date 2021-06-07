// eslint-disable-next-line no-use-before-define
import React from 'react';
import styles from './styles/SlideMenu.module.scss';

type SlideMenuProps = React.PropsWithChildren<{}>;

function ajustPosition(event: React.SyntheticEvent) {
  (event.target as Element).scrollIntoView({
    inline: 'start',
  });
}

export default function SlideMenu({ children }: SlideMenuProps) {
  // return (
  //   <div className={styles.menuOverlay}>
  //     <div className={styles.menuContainer}>
  //       <div className={styles.menuContent}>{children}</div>
  //       <div className={styles.placeholder} onLoad={ajustPosition} />
  //     </div>
  //   </div>
  // );
  return (
    <div className={styles.menuGrid}>
      <div className={styles.menuContainer}>{children}</div>
      <div className={styles.placeholder} />
      <div className={styles.backdrop} />
    </div>
  );
}
