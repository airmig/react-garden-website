import CommentItem from "./CommentItem";

function Comments({ comments }) {
  return (
    <div>
      {comments &&
        comments.results.map((item) => (
          <CommentItem key={item.id} item={item} />
        ))}
    </div>
  );
}

export default Comments;
