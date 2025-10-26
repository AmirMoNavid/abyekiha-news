const Err = ({ msg = '' }) => {
  return <p className="capitalize err text-red-400 text-xs w-full">{msg}</p>;
};

export default Err;
