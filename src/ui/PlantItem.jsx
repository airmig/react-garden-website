function PlantItem({ item, onClick }) {
  return (
    <div className="relative flex-shrink-0 max-w-xs mx-2 mb-6 overflow-hidden bg-green-500 rounded-lg shadow-lg">
      <svg
        className="absolute bottom-0 left-0 mb-8"
        viewBox="0 0 375 283"
        fill="none"
      >
        <rect
          x="159.52"
          y="175"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 159.52 175)"
          fill="#339966"
        ></rect>
        <rect
          y="107.48"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 0 107.48)"
          fill="#339933"
        ></rect>
      </svg>
      <div className="relative flex items-center justify-center px-10 pt-10">
        <div className="absolute bottom-0 left-0 block w-48 h-48 ml-3 -mb-24"></div>
        <picture>
          {/* <source srcSet={item.api_data.image_url} /> */}
          <img
            className="relative w-[248px] h-[248px]"
            src={item.api_data.image_url}
            alt="Picture unavailable"
          />
        </picture>
      </div>
      <div className="relative px-6 pb-6 mt-3 text-white">
        <span className="block text-xl font-semibold px-2">
          {item.scientific_name}
        </span>
        <div className="flex justify-between py-2">
          <button
            onClick={() => onClick(item.api_data, item.id)}
            className="flex items-center px-9 py-2 text-xs font-bold leading-none text-green-500 bg-white rounded-full"
          >
            View Plant
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlantItem;
