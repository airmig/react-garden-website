function Status({ onTextChange, queryStatus }) {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Add Comment
      </h2>
      <select defaultValue="-1" onChange={(e) => onTextChange(e.target.value)}>
        <option key="-1" value="-1">
          Pick a status
        </option>
        {queryStatus.results.map((item) => (
          <option key={item.id} value={item.id}>
            {item.status}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Status;
