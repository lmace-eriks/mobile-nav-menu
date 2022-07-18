import React, { ReactChildren, useRef } from 'react';
import { useEffect, useState } from 'react';

// Styles
import styles from "./styles.css";

interface MobileNavMenuProps {
  children: ReactChildren
}

const MobileNavMenu: StorefrontFunctionComponent<MobileNavMenuProps> = ({ children }) => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const navRef = useRef(null);
  const overlayRef = useRef(null);

  // @ts-expect-error
  const miniCart = children[0];

  const childrenBelowCart: any = [];

  // @ts-expect-error
  for (let i = 0; i < children.length; i++) {
    if (i > 0) {
      // @ts-expect-error
      childrenBelowCart.push(children[i]);
    }
  }

  useEffect(() => {
    // console.clear();
  })

  const handleOpenNav = () => {
    setOpenNav(true);

    setTimeout(() => {
      // @ts-expect-error
      navRef.current.style.left = 0;

      // @ts-expect-error
      overlayRef.current.style.opacity = 0.5;
    }, 100);

  }

  const handleCloseNav = () => {
    // @ts-expect-error
    navRef.current.style.left = "-100%";

    // @ts-expect-error
    overlayRef.current.style.opacity = 0;

    setTimeout(() => {
      setOpenNav(false);
    }, 250);
  }

  return (
    <div className={styles.mobileNavMenuContainer}>
      <div className={styles.hamburgerContainer}>
        <div onClick={handleOpenNav} className={styles.hamburgerWrapper}>
          <div onClick={handleOpenNav} className={styles.hamburgerLine}></div>
          <div onClick={handleOpenNav} className={styles.hamburgerLine}></div>
          <div onClick={handleOpenNav} className={styles.hamburgerLine}></div>
        </div>
      </div>
      <div className={styles.logoContainer}>
        <div className={styles.logoWrapper}>
          <a href="/"><img src="https://eriksbikeshop.vtexassets.com/arquivos/logo.png" alt="Erik's Bike Shop" loading="lazy" className={styles.mobileLogo} /></a>
        </div>
      </div>
      <div className={styles.miniCartContainer}>
        <div className={styles.miniCartWrapper}>
          {miniCart}
        </div>
      </div>
      {openNav &&
        <>
          <nav ref={navRef} className={styles.navigationContainer}>
            <div className={styles.navigationWrapper}>
              <div onClick={handleCloseNav} className={styles.closeMobileNavButton}>X</div>
              <div className={styles.childrenContainer}>
                <div className={styles.childrenWrapper}>
                  {childrenBelowCart}
                </div>
              </div>
            </div>
          </nav>
          <div onClick={handleCloseNav} ref={overlayRef} className={styles.mobileNavOverlay}></div>
        </>
      }
    </div>
  )
}

MobileNavMenu.schema = {
  title: 'editor.mobilenavmenu.title',
  description: 'editor.mobilenavmenu.description',
  type: 'object',
  properties: {}
}

export default MobileNavMenu;