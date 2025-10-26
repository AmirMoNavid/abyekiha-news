const AdItem = ({ date, link, image, text }) => {
  return (
    <a href={link} className="w-[30%] text-sm md:w-full block my-2 ad-item">
      <div
        className="flex justify-between items-center p-2 text-nowrap mb-1 rounded-md"
        style={{ backgroundColor: 'rgb(24, 129, 24)' }}
      >
        <span>{text}</span>
        <span className="text-sm sm:block hidden">{date}</span>
      </div>
      <div className="w-full h-[5%]">
        <img src={image} />
      </div>
    </a>
  );
};

export default AdItem;
