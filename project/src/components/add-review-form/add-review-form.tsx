import {useState} from 'react';
import {ChangeEvent, FormEvent} from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {addCommentAction} from '../../store/api-actions';
import {TypedDispatch} from '../../types/types';
import {useAppSelector} from '../../hooks';
import {getIsPosting} from '../../store/comment-process/selectors';
import {getFilm} from '../../store/film-process/selectors';
import './add-review-form.css';
import { ReviewLimit } from '../../const';

function AddReviewForm(): JSX.Element {

  const [formData, setFormData] = useState({
    rating: '',
    'review-text': ''
  });

  const [form, setFormFilled] = useState({
    filled: false
  });

  const dispatch = useDispatch<TypedDispatch>();
  const params = useParams();
  const filmId = Number(params.id);
  const isPosting = useAppSelector(getIsPosting);
  const film = useAppSelector(getFilm);

  const formChangeHandle = (evt: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
    if (formData['review-text'].length >= ReviewLimit.MinLength && formData['review-text'].length <= ReviewLimit.MaxLength && formData['rating'].length > 0) {
      setFormFilled({...form, filled: true});
    } else {
      setFormFilled({...form, filled: false});
    }
  };

  const comment = {
    comment: formData['review-text'],
    rating: Number(formData['rating'])
  };

  const formSubmitHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(addCommentAction([comment, filmId]));
  };

  return (
    <form action="#" className="add-review__form" onSubmit={formSubmitHandle}>
      <div className="rating">
        <div className="rating__stars">
          <input className="rating__input" id="star-10" type="radio" name="rating" onChange={formChangeHandle} value='10' />
          <label className="rating__label" htmlFor="star-10">Rating 10</label>

          <input className="rating__input" id="star-9" type="radio" name="rating" onChange={formChangeHandle} value='9' />
          <label className="rating__label" htmlFor="star-9">Rating 9</label>

          <input className="rating__input" id="star-8" type="radio" name="rating" onChange={formChangeHandle} value='8' />
          <label className="rating__label" htmlFor="star-8">Rating 8</label>

          <input className="rating__input" id="star-7" type="radio" name="rating" onChange={formChangeHandle} value='7' />
          <label className="rating__label" htmlFor="star-7">Rating 7</label>

          <input className="rating__input" id="star-6" type="radio" name="rating" onChange={formChangeHandle} value='6' />
          <label className="rating__label" htmlFor="star-6">Rating 6</label>

          <input className="rating__input" id="star-5" type="radio" name="rating" onChange={formChangeHandle} value='5' />
          <label className="rating__label" htmlFor="star-5">Rating 5</label>

          <input className="rating__input" id="star-4" type="radio" name="rating" onChange={formChangeHandle} value='4' />
          <label className="rating__label" htmlFor="star-4">Rating 4</label>

          <input className="rating__input" id="star-3" type="radio" name="rating" onChange={formChangeHandle} value='3' />
          <label className="rating__label" htmlFor="star-3">Rating 3</label>

          <input className="rating__input" id="star-2" type="radio" name="rating" onChange={formChangeHandle} value='2' />
          <label className="rating__label" htmlFor="star-2">Rating 2</label>

          <input className="rating__input" id="star-1" type="radio" name="rating" onChange={formChangeHandle} value='1' />
          <label className="rating__label" htmlFor="star-1">Rating 1</label>
        </div>
      </div>

      <div className="add-review__text" style={{background: film?.backgroundColor}}>
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          onChange={formChangeHandle}
          placeholder="Review text"
          minLength={ReviewLimit.MinLength}
          maxLength={ReviewLimit.MaxLength}
        >
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={(isPosting || !form.filled) && true}>Post</button>
        </div>
      </div>
    </form>
  );
}

export default AddReviewForm;
