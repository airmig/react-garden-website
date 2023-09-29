import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import Comment from "./Comment";
import Comments from "./Comments";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "./Spinner";
import Image from "./Image";
import Status from "./Status";
import { API_BASE_URL } from "../util/constants";

function DetailCollectionItem() {
  const data = useSelector((state) => state.plant.selectedCollectionItem);
  const itemId = useSelector((state) => state.plant.selectedItemId);
  const token = useSelector((state) => state.plant.loginToken);
  const loggedIn = token && token.length > 0 ? true : false;

  const [addAction, setAddAction] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(null);
  const queryClient = useQueryClient();
  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };
  scrollToTop();

  function addImage() {
    setAddAction("image");
  }
  function addComment() {
    setAddAction("comment");
  }
  function addStatus() {
    setAddAction("status");
  }
  function handleCancel() {
    setAddAction("");
  }

  function handleAddImage() {
    let formData = new FormData();
    formData.append("date", new Date().toISOString().split("T").at(0));
    formData.append("plant", itemId);
    formData.append("image_url", image);
    async function addImage(itemToAdd) {
      const destination = API_BASE_URL + "images/add/";
      try {
        const response = await fetch(destination, {
          method: "POST",
          headers: {
            Authorization: "Token " + token,
          },
          body: itemToAdd,
        });

        const data = await response.json();

        queryClient.invalidateQueries({ queryKey: "images" });
        if (data.detail) {
          alert(data.detail);
        } else {
          handleCancel();
        }
      } catch (err) {
        //pass
      } finally {
        //pass
      }
      setAddAction("");
    }
    addImage(formData);
  }
  function handleAddComment() {
    setAddAction("comment");

    const newCommentRecord = {};
    newCommentRecord.comment = comment;
    newCommentRecord.date = new Date().toISOString().split("T").at(0);
    newCommentRecord.plant = itemId;
    newCommentRecord.status = 13;
    async function addComment(itemToAdd) {
      const destination = API_BASE_URL + "comments/add/";
      try {
        const response = await fetch(destination, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + token,
          },
          body: JSON.stringify(itemToAdd),
        });

        const data = await response.json();

        queryClient.invalidateQueries({ queryKey: "comments" });
        if (data.detail) {
          alert(data.detail);
        } else {
          handleCancel();
        }
      } catch (err) {
        //pass
      } finally {
        //pass
      }
    }
    addComment(newCommentRecord);
    //console.log("item to add", newPlantRecord);
    //addItem(newPlantRecord);
  }
  function handleAddStatus() {
    if (!status) {
      setAddAction("");

      return;
    }
    const newCommentRecord = {};
    newCommentRecord.date = new Date().toISOString().split("T").at(0);
    newCommentRecord.plant = itemId;
    newCommentRecord.status = status;

    async function addComment(itemToAdd) {
      const destination = API_BASE_URL + "comments/add/";
      try {
        const response = await fetch(destination, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + token,
          },
          body: JSON.stringify(itemToAdd),
        });

        const data = await response.json();

        queryClient.invalidateQueries({ queryKey: "comments" });
        if (data.detail) {
          alert(data.detail);
        } else {
          handleCancel();
        }
      } catch (err) {
        //pass
      } finally {
        //pass
      }
    }
    addComment(newCommentRecord);
    //console.log("item to add", newPlantRecord);
    //addItem(newPlantRecord);
  }
  function handleCommentChange(value) {
    setComment(value);
  }
  function handleImageChange(value) {
    setImage(value);
  }
  function handleStatusChange(value) {
    setStatus(value);
  }
  async function commentList() {
    const destination = API_BASE_URL + "comments/" + itemId + "/";
    let data = {};
    try {
      const response = await fetch(destination);
      data = await response.json();
    } catch (err) {
      //pass
    } finally {
      //pass
    }
    return data;
  }

  const {
    isLoading,
    data: querydata,
    refetch,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: () => commentList(),
  });

  useEffect(
    function () {
      refetch();
    },
    [refetch]
  );

  async function statusList() {
    const destination = API_BASE_URL + "status/";
    let data = {};
    try {
      const response = await fetch(destination);
      data = await response.json();
    } catch (err) {
      //pass
    } finally {
      //pass
    }
    return data;
  }

  const { data: querystatus, refetch: refetchStatus } = useQuery({
    queryKey: ["status"],
    queryFn: () => statusList(),
  });

  useEffect(
    function () {
      refetchStatus();
    },
    [refetchStatus]
  );

  async function imageList() {
    const destination = API_BASE_URL + "images/" + itemId + "/";
    let data = {};
    try {
      const response = await fetch(destination);
      data = await response.json();
    } catch (err) {
      //pass
    } finally {
      //pass
    }
    return data;
  }

  const {
    isLoading: isLoadingImage,
    data: imagesdata,
    refetch: refetchImage,
  } = useQuery({
    queryKey: ["images"],
    queryFn: () => imageList(),
  });

  useEffect(
    function () {
      refetchImage();
    },
    [refetchImage]
  );

  return (
    <div>
      <div className="bg-white overflow-scroll">
        {data.scientific_name ? (
          <div className="mx-auto grid max-w-2xl p-10 grid-cols-1 items-start  lg:max-w-7xl lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {data.scientific_name}
              </h2>
              <p className="mt-4 text-gray-500">
                The family name of the species family is {data.family.name} and
                its genus is {data.genus.name}. The first publication of a valid
                name of this species: {data.bibliography}. The author(s) of the
                first publication of a valid name of this species is{" "}
                {data.author}. The first publication was {data.year}.
              </p>
              <div className="mt-[10px]">
                {loggedIn ? (
                  <>
                    <button
                      onClick={addComment}
                      type="button"
                      className="w-[150px] ml-[10px] py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    >
                      Add comment
                    </button>
                    <button
                      onClick={addImage}
                      type="button"
                      className="mt-[10px] w-[150px] ml-[10px] py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    >
                      Add image
                    </button>
                    <button
                      onClick={addStatus}
                      type="button"
                      className="mt-[10px] w-[150px] ml-[10px] py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    >
                      Add Status
                    </button>
                    {addAction == "comment" ? (
                      <Modal
                        confirmText="Add"
                        onCancel={handleCancel}
                        onClick={handleAddComment}
                        cancelText="Cancel"
                      >
                        <Comment onTextChange={handleCommentChange} />
                      </Modal>
                    ) : (
                      ""
                    )}
                    {addAction == "image" ? (
                      <Modal
                        confirmText="Add"
                        onCancel={handleCancel}
                        onClick={handleAddImage}
                        cancelText="Cancel"
                      >
                        <Image onTextChange={handleImageChange} />
                      </Modal>
                    ) : (
                      ""
                    )}
                    {addAction == "status" ? (
                      <Modal
                        confirmText="Add"
                        onCancel={handleCancel}
                        onClick={handleAddStatus}
                        cancelText="Cancel"
                      >
                        <Status
                          queryStatus={querystatus}
                          onTextChange={handleStatusChange}
                        />
                      </Modal>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>

              <div className="mt-[10px]">
                {isLoading ? (
                  <Spinner />
                ) : querydata.results ? (
                  <Comments comments={querydata} id={itemId} />
                ) : (
                  ""
                )}
              </div>
              <dl className="mt-5 grid grid-cols-1  sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">Common Name(s)</dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    <ul>
                      {data.main_species && data.main_species.common_names.en
                        ? data.main_species.common_names.en.map((i) => (
                            <li key={i}>{i}</li>
                          ))
                        : "Unavailable Information"}
                    </ul>
                  </dd>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">Scientific Name</dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    {data.scientific_name}
                  </dd>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">Family</dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    {data.family.name}
                  </dd>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">Genus</dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    {data.genus.name}
                  </dd>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">
                    Edible/Edible Parts
                  </dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    {data.main_species && data.main_species.edible
                      ? "Edible/"
                      : "No Edible/"}
                    {data.main_species && data.main_species.edible_part
                      ? data.main_species.edible_part
                      : " None edible parts."}
                  </dd>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">Distribution</dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    <ul>
                      {data.main_species &&
                      data.main_species.distribution.native
                        ? data.main_species.distribution.native.map((i) => (
                            <li key={i}>{i}</li>
                          ))
                        : "Unavailable Information"}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
              {isLoadingImage ? (
                <Spinner />
              ) : imagesdata.results ? (
                imagesdata.results.map((item) => (
                  <img
                    key={item.image_url}
                    src={item.image_url}
                    alt={item.image_url}
                    className="rounded-lg bg-gray-100"
                  />
                ))
              ) : (
                ""
              )}
              {data.image_url && (
                <img
                  src={data.image_url}
                  alt={data.common_name}
                  className="rounded-lg bg-gray-100"
                />
              )}

              {data.main_species && data.main_species.images.flower
                ? data.main_species.images.flower.map((i) => (
                    <img
                      key={i.image_url}
                      src={i.image_url}
                      alt={i.copyright}
                      className="rounded-lg bg-gray-100"
                    />
                  ))
                : ""}
              {data.main_species && data.main_species.images.fruit
                ? data.main_species.images.fruit.map((i) => (
                    <img
                      key={i.image_url}
                      src={i.image_url}
                      alt={i.copyright}
                      className="rounded-lg bg-gray-100"
                    />
                  ))
                : ""}
              {data.main_species && data.main_species.images.leaf
                ? data.main_species.images.leaf.map((i) => (
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
        ) : (
          "Nothing found."
        )}
      </div>
    </div>
  );
}

export default DetailCollectionItem;
