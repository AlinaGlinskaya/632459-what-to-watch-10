type FilmCardProps = {
  title: string,
  img: string,
}

function FilmCard(props: FilmCardProps) {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={props.img} alt={props.title} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{props.title}</a>
      </h3>
    </article>
  );
}

export default FilmCard;
