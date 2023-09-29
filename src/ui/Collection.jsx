import { useEffect, useState } from "react";
import PlantItem from "./PlantItem";
import SearchRow from "./SearchRow";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Spinner from "./Spinner";
import {
  setSelectedCollectionItem,
  setSelectedItemId,
} from "../features/plant/plantSlice";
import { API_BASE_URL } from "../util/constants";

function Collection() {
  const [plantList, setPlantList] = useState([]);
  const [showList, setShowList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getPlantList() {
      const destination = API_BASE_URL + "plants/";
      try {
        setIsLoading(true);
        const response = await fetch(destination);
        const data = await response.json();
        const resultData = data.results.slice();
        setPlantList(data.results);
        setShowList(resultData.splice(0, 3));
      } catch (err) {
        //pass
      } finally {
        //pass
        setIsLoading(false);
      }
    }
    getPlantList();
  }, []);

  function leftTurn() {
    let plantListCopy = plantList.slice();
    let shiftItem = plantListCopy.shift();
    plantListCopy.splice(plantListCopy.length, 0, shiftItem);
    setPlantList(plantListCopy);
    setShowList(plantListCopy.slice().splice(0, 3));
  }

  function rightTurn() {
    let plantListCopy = plantList.slice();
    let shiftItem = plantListCopy.pop();
    plantListCopy.splice(0, 0, shiftItem);
    setPlantList(plantListCopy);
    setShowList(plantListCopy.slice().splice(0, 3));
  }

  function viewDetails(details, itemId) {
    dispatch(setSelectedItemId(itemId));
    dispatch(setSelectedCollectionItem(details));
    navigate("/detail-collection/");
  }

  return isLoading ? (
    <>
      <div className="text-4xl mt-[10px] flex justify-center items-center">
        Loading...
      </div>
      <Spinner />
    </>
  ) : (
    <div className="w-full items-center justify-center">
      <div className="w-full mt-[10px] mb-[10px] text-3xl flex flex-wrap align-middle justify-center items-center">
        <div className="flex flex-wrap items-center justify-center">
          <p>Our Collection</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center">
        <span onClick={leftTurn} className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </span>
        {showList.map((item) => (
          <PlantItem item={item} key={item.id} onClick={viewDetails} />
        ))}
        <span onClick={rightTurn} className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </span>
      </div>

      <table className="text-left text-sm font-light w-full">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th
              colSpan="5"
              className="bg-black text-white w-full p-5 justify-center"
            >
              {" "}
              There are {plantList?.length} plants in our personal plant
              collection.
            </th>
          </tr>
          <tr>
            <th scope="col" className="px-6 py-4">
              Common name
            </th>
            <th scope="col" className="px-6 py-4">
              Family
            </th>
            <th scope="col" className="px-6 py-4">
              Scientific name
            </th>
            <th scope="col" className="px-6 py-4">
              Genus
            </th>
          </tr>
        </thead>
        <tbody>
          {plantList.map((i) => (
            <>
              <SearchRow
                onClick={() => viewDetails(i.api_data, i.id)}
                key={i.id}
                itemId={i.id}
                item={i}
              />
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Collection;
