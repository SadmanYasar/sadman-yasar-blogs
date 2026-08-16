'use client';

import React from "react";
import ScrollToTop from "react-scroll-to-top";
import ScrollToTopIcon from "./scroll-to-top";

export default function ScrollToTopWrapper() {
  return (
    <ScrollToTop
      smooth
      component={<ScrollToTopIcon />}
      style={{
        backgroundColor: "transparent",
        boxShadow: "none",
        border: "none",
      }}
    />
  );
}
