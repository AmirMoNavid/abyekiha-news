import { RefObject } from 'react';

const Btn = (props) => {
  return (
    <button
      disabled={false}
      {...props}
      type={props.type ?? 'button'}
      ref={props.btnRef}
      className={`px-2 py-2 capitalize text-sm rounded-[5px] outline-none f-center-between ${props.className}`}
    >
      {props.ico}
      {props.children}
    </button>
  );
};
export default Btn;
