import moment from 'jalali-moment';
import './style.css';
const CommentItem = ({ comment }) => {
  return (
    <div className="w-full p-4 flex flex-col mb-2  items-starts comment-item">
      <div className="flex items-end justify-start gap-4">
        <span className="font-semibold">{comment.name}</span>
        <time className="opacity-75 text-sm">
          {moment(comment.createdAt).locale('fa').format('hh:mm - YYYY/MM/DD')}
        </time>
      </div>
      <p className="pt-1 pr-1">{comment.description}</p>
    </div>
  );
};

export default CommentItem;
