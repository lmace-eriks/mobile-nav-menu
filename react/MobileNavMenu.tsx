import React, { ReactChildren, useRef, useEffect, useState } from 'react';
// import { canUseDOM } from 'vtex.render-runtime';

// Styles
import styles from "./styles.css";
import { canUseDOM } from 'vtex.render-runtime';

interface MobileNavMenuProps {
  children: ReactChildren | any
}

const closeMenuButtonClass = "eriksbikeshop-mobilenavmenu-1-x-closeMobileNavButton";

const MobileNavMenu: StorefrontFunctionComponent<MobileNavMenuProps> = ({ children }) => {
  const openGate = useRef(true);
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [miniCart, setMiniCart] = useState<any>(children[0]);
  const navRef = useRef<any>(!null);
  const overlayRef = useRef<any>(!null);
  const [childrenInDrawer, setChildrenInDrawer] = useState<any>();

  useEffect(() => {
    if (!openGate.current) return;
    openGate.current = false;

    const tempChildrenInDrawer: any = [];

    // [0] child is Mini Cart and should not be in the drawer - LM
    children.forEach((child: any, index: number) => {
      if (index) tempChildrenInDrawer.push(child);
    });

    setChildrenInDrawer(tempChildrenInDrawer);
  });

  const handleOpenNav = () => {
    if (!canUseDOM) return;
    setOpenNav(true);

    // Timeout accounts for CSS transition / animation - LM
    setTimeout(() => {
      navRef.current.style.left = 0;
      overlayRef.current.style.opacity = 0.5;

      // Focusing the Close Menu button assists non-sighted users by skipping to nav content - LM
      const closeMenuButton: any = document.querySelector(`.${closeMenuButtonClass}`);
      closeMenuButton.focus();
    }, 100);
  }

  const handleCloseNav = () => {
    navRef.current.style.left = "-100%";
    overlayRef.current.style.opacity = 0;

    // Timeout accounts for CSS transition / animation - LM
    setTimeout(() => {
      setOpenNav(false);
    }, 250);
  }

  const OpenNavButton = () => (
    <div className={styles.hamburgerContainer}>
      <button aria-label="Open Navigation" onClick={handleOpenNav} className={styles.hamburgerWrapper}>
        <div className={styles.hamburgerLine}></div>
        <div className={styles.hamburgerLine}></div>
        <div className={styles.hamburgerLine}></div>
      </button>
    </div>
  );

  const EriksLogo = () => (
    <a className={styles.logoLink} href="/">
      <img src="https://eriksbikeshop.vtexassets.com/arquivos/eriks-logo.svg" alt="Logo / Home Link" loading="eager" className={styles.mobileLogo} />
    </a>
  );

  const ShoppingCart = () => (
    <div className={styles.miniCartContainer}>
      {miniCart}
    </div>
  );

  const MobileNavOpenState = () => (<>
    <nav ref={navRef} className={styles.navigationContainer}>
      <div className={styles.childrenContainer}>
        {childrenInDrawer}
      </div>
    </nav>
    <div onClick={handleCloseNav} ref={overlayRef} className={styles.mobileNavOverlay}></div>
    <button aria-label="Close Navigation" onClick={handleCloseNav} className={styles.closeMobileNavButton}>X</button>
  </>);

  return (
    <div className={styles.mobileNavMenuContainer}>
      <OpenNavButton />
      <EriksLogo />
      <ShoppingCart />
      {openNav && <MobileNavOpenState />}
    </div>
  );
}

MobileNavMenu.schema = {
  title: "Mobile Navigation Menu",
  description: "",
  type: "object",
  properties: {}
}

export default MobileNavMenu;