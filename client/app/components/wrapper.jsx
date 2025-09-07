const Wrapper = ({ text }) => {
  return (
    <div className="tpg-header-wrapper w-full pr-2 mt-3">
      <div className="tpg-widget-heading-wrapper rt-clear heading-style4 ">
        <span className="tpg-widget-heading-line line-left"></span>
        <h4 className="tpg-widget-heading text-sm">
          <span>{text}</span>
        </h4>{' '}
        <span className="tpg-widget-heading-line line-right"></span>
      </div>
    </div>
  );
};

export default Wrapper;
