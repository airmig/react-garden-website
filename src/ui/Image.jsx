function Image({ onTextChange }) {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Add Image
      </h2>
      Choose an image:
      <input
        onChange={(e) => onTextChange(e.target.files[0])}
        id="comment"
        name="text"
        type="file"
        placeholder="add your file"
        required
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
}

export default Image;
