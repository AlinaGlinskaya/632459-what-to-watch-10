import {TabsProps} from '../../types/types';
import {comments} from '../../mocks/comments';
import Comment from '../comment/comment';

function Reviews({film}: TabsProps): JSX.Element {
  const commentsLeft = comments.slice(0, (comments.length / 2));
  const commentsRight = comments.slice((comments.length / 2), comments.length);

  const commentsLeftItems = commentsLeft.map((item) => (
    <Comment
      key={item.id}
      comment={item.comment}
      date={item.date}
      id={item.id}
      rating={item.rating}
      user={{
        id: 0,
        name: item.user.name
      }}
    />));

  const commentsRightItems = commentsRight.map((item) => (
    <Comment
      key={item.id}
      comment={item.comment}
      date={item.date}
      id={item.id}
      rating={item.rating}
      user={{
        id: 0,
        name: item.user.name
      }}
    />));

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {commentsLeftItems}
      </div>
      <div className="film-card__reviews-col">
        {commentsRightItems}
      </div>
    </div>
  );
}

export default Reviews;
