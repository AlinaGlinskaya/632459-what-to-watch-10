import Comment from '../comment/comment';
import {useEffect} from 'react';
import {fetchCommentsAction} from '../../store/api-actions';
import {useAppDispatch} from '../../hooks';
import {useParams} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {getComments} from '../../store/comment-process/selectors';

function Reviews(): JSX.Element {

  const dispatch = useAppDispatch();
  const params = useParams();
  const filmId = Number(params?.id);

  useEffect(() => {
    dispatch(fetchCommentsAction(filmId));
  }, [filmId, dispatch]);

  const comments = useAppSelector(getComments);

  const commentsLeft = comments.slice(0, (Math.ceil(comments.length / 2)));
  const commentsRight = comments.slice(Math.ceil(comments.length / 2), comments.length);

  const commentsLeftItems = commentsLeft?.map((item) => (
    <Comment
      comment={item}
      key={item.id}
    />));

  const commentsRightItems = commentsRight?.map((item) => (
    <Comment
      comment={item}
      key={item.id}
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
