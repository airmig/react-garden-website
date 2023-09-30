import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { searchDetail } from "../util/api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../util/constants";
import { useDispatch } from "react-redux";
import {
  setSelectedItemId,
  setSelectedCollectionItem,
} from "../features/plant/plantSlice";

function Detail() {
  //const state = useSelector((state) => state.plant);
  const selectedPlant = useSelector((state) => state.plant.selectedId);
  const [isInCollection, setIsInCollection] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedToken = useSelector((state) => state.plant.loginToken);
  const isLoggedIn = loggedToken && loggedToken.length > 0;
  const { isLoading, data, error, refetch, isFetching } = useQuery({
    queryKey: ["plant-detail"],
    queryFn: () => searchDetail(selectedPlant),
  });

  useEffect(
    function () {
      refetch();
    },
    [refetch]
  );

  useEffect(
    function () {
      async function getReference(external_id) {
        const destination = API_BASE_URL + "external_id/" + external_id;
        try {
          const response = await fetch(destination);
          const data = await response.json();
          if (data.external_id) {
            dispatch(setSelectedItemId(data.id));
            dispatch(setSelectedCollectionItem(data.api_data));
            setIsInCollection(true);
          }
        } catch (err) {
          //pass
        } finally {
          //pass
        }
      }
      getReference(selectedPlant);
    },
    [selectedPlant]
  );

  function addCollectionItem() {
    const newPlantRecord = {};
    newPlantRecord.common_name = data.data.common_name;
    newPlantRecord.date_purchased = new Date().toISOString().split("T").at(0);
    newPlantRecord.scientific_name = data.data.scientific_name;
    newPlantRecord.genus = data.data.genus.name;
    newPlantRecord.family = data.data.family.name;
    newPlantRecord.external_id = selectedPlant;
    newPlantRecord.api_data = data.data;
    async function addItem(itemToAdd) {
      const destination = API_BASE_URL + "plants/add/";
      try {
        const response = await fetch(destination, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + loggedToken,
          },
          body: JSON.stringify(itemToAdd),
        });
        const data = await response.json();

        if (data.detail) {
          alert("You are not authorized. Please Login");
        } else {
          setIsInCollection(true);
        }
      } catch (err) {
        //pass
      } finally {
        //pass
      }
    }
    addItem(newPlantRecord);
  }
  function viewCollectionItem() {
    navigate("/detail-collection");
  }

  if (isLoading || isFetching) return <Spinner />;

  return !data.data ? (
    ""
  ) : (
    <div className="bg-white overflow-scroll">
      <div className="mx-auto grid max-w-2xl p-10 grid-cols-1 items-start gap-x-8 gap-y-16 lg:max-w-7xl lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {data.data.scientific_name}
          </h2>
          {data.data.main_species && (
            <p className="mt-4 text-gray-500">
              The family name of the species family is {data.data.family.name}{" "}
              and its genus is {data.data.genus.name}. The first publication of
              a valid name of this species: {data.data.bibliography}. The
              author(s) of the first publication of a valid name of this species
              is {data.data.author}. The first publication was {data.data.year}.
            </p>
          )}
          {isLoggedIn ? (
            !isInCollection ? (
              <button
                onClick={() => addCollectionItem()}
                type="button"
                className="mt-[10px] w-[200px] py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Add to collection
              </button>
            ) : (
              <button
                onClick={() => viewCollectionItem()}
                type="button"
                className="mt-[10px] w-[200px] py-2 px-4  bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 focus:ring-orange-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                View in collection
              </button>
            )
          ) : (
            ""
          )}
          <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Common Name(s)</dt>
              <dd className="mt-2 text-sm text-gray-500">
                <ul>
                  {data.data.main_species &&
                  data.data.main_species.common_names.en
                    ? data.data.main_species.common_names.en.map((i) => (
                        <li key={i}>{i}</li>
                      ))
                    : "Unavailable Information"}
                </ul>
              </dd>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Scientific Name</dt>
              <dd className="mt-2 text-sm text-gray-500">
                {data.data.scientific_name}
              </dd>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Family</dt>
              <dd className="mt-2 text-sm text-gray-500">
                {data.data.family.name}
              </dd>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Genus</dt>
              <dd className="mt-2 text-sm text-gray-500">
                {data.data.genus.name}
              </dd>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Edible/Edible Parts</dt>
              <dd className="mt-2 text-sm text-gray-500">
                {data.data.main_species && data.data.main_species.edible
                  ? "Edible/"
                  : "No Edible/"}
                {data.data.main_species && data.data.main_species.edible_part
                  ? data.data.main_species.edible_part
                  : " None edible parts."}
              </dd>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Distribution</dt>
              <dd className="mt-2 text-sm text-gray-500">
                <ul>
                  {data.data.main_species &&
                  data.data.main_species.distribution.native
                    ? data.data.main_species.distribution.native.map((i) => (
                        <li key={i}>{i}</li>
                      ))
                    : "Unavailable Information"}
                </ul>
              </dd>
            </div>
          </dl>
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          {data.data.image_url && (
            <img
              src={data.data.image_url}
              alt={data.data.common_name}
              className="rounded-lg bg-gray-100 w-[300px] h-[400px]"
            />
          )}

          {data.data.main_species && data.data.main_species.images.flower
            ? data.data.main_species.images.flower.map((i) => (
                <img
                  key={i.image_url}
                  src={i.image_url}
                  alt={i.copyright}
                  className="rounded-lg bg-gray-100 w-[300px] h-[400px]"
                />
              ))
            : ""}
          {data.data.main_species && data.data.main_species.images.fruit
            ? data.data.main_species.images.fruit.map((i) => (
                <img
                  key={i.image_url}
                  src={i.image_url}
                  alt={i.copyright}
                  className="rounded-lg bg-gray-100 w-[300px] h-[400px]"
                />
              ))
            : ""}
          {data.data.main_species && data.data.main_species.images.leaf
            ? data.data.main_species.images.leaf.map((i) => (
                <img
                  key={i.image_url}
                  src={i.image_url}
                  alt={i.copyright}
                  className="rounded-lg bg-gray-100 w-[300px] h-[400px]"
                />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default Detail;
