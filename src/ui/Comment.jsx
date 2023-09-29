function Comment({ onTextChange }) {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Add Comment
      </h2>
      <textarea
        rows="5"
        cols="80"
        onChange={(e) => onTextChange(e.target.value)}
        id="comment"
        name="text"
        type="text"
        placeholder="add your comment"
        required
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
}

export default Comment;
