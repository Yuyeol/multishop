import { useEffect, useState } from "react";
import reactDom from "react-dom";

interface IProps {
  children: React.ReactNode;
}

export const HeaderPortal = ({ children }: IProps) => {
  const [el, setEl] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setEl(document.getElementById("header"));
  }, []);
  if (!el) return <></>;
  return reactDom.createPortal(children, el);
};

export const FriendModalPortal = ({ children }: IProps) => {
  const [el, setEl] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setEl(document.getElementById("friend-modal"));
  }, []);
  if (!el) return <></>;
  return reactDom.createPortal(children, el);
};
