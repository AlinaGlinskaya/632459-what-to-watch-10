import {CommentProps} from '../../types/types';
import {getDateCommentFormat, getDatetimeFormat, getRatingFormat} from '../../utils';

function Comment(comment: CommentProps): JSX.Element {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{comment.user.name}</cite>
          <time className="review__date" dateTime={getDatetimeFormat(comment.date)}>{getDateCommentFormat(comment.date)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{getRatingFormat(comment.rating)}</div>
    </div>
  );
}

export default Comment;
