import Btn from './btn';

const SubmitBtn = ({ text = null, children = null, className = '' }) => (
  <Btn type="submit" className={`w-max btn-secondary ${className}`}>
    {children || text}
  </Btn>
);

export default SubmitBtn;
