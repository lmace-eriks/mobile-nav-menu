import React, { ReactChildren } from 'react';
import { useEffect, useState } from 'react';

// Styles
import styles from "./styles.css";

interface MobileNavMenuProps {
  children: ReactChildren
}

const MobileNavMenu: StorefrontFunctionComponent<MobileNavMenuProps> = ({ }) => {

  useEffect(() => {
    console.log("Render");
  })

  return (
    <h1>Hello Mobile!</h1>
  )
}

MobileNavMenu.schema = {
  title: 'editor.mobilenavmenu.title',
  description: 'editor.mobilenavmenu.description',
  type: 'object',
  properties: {}
}

export default MobileNavMenu;