function SearchRow({ onClick, item, itemId }) {
  return (
    <tr className="border-b transition duration-300 ease-in-out hover:bg-green-400 hover:text-white dark:border-neutral-500 dark:hover:bg-neutral-600">
      <td className="whitespace-nowrap px-6 py-4 font-medium">
        {!item.common_name || item.common_name === ""
          ? "Unavailable"
          : item.common_name}
      </td>
      <td className="whitespace-nowrap px-6 py-4">{item.family}</td>
      <td className="whitespace-nowrap px-6 py-4">{item.scientific_name}</td>
      <td className="whitespace-nowrap px-6 py-4">{item.genus}</td>
      <td className="whitespace-nowrap px-6 py-4">
        <button
          onClick={() => onClick(item.id, itemId)}
          type="button"
          className="py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          View Details
        </button>
      </td>
    </tr>
  );
}

export default SearchRow;
