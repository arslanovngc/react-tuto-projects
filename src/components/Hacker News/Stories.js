import { useGlobalContext } from "./context";

const Stories = () => {
  const { isLoading, hits, removeStory } = useGlobalContext();

  if (isLoading) {
    return <div className="loading"></div>;
  }
  return (
    <section className="stories">
      {hits.map(({ objectID, title, num_comments, url, points, author }) => {
        return (
          <article className="story" key={objectID}>
            <h4 className="title">{title}</h4>
            <p className="info">
              <code>{points}</code> points by <code>{author.toUpperCase()}</code> |<code> {num_comments} </code>comments
            </p>
            <div>
              <a href={url} className="read-link" target="_blank" rel="noreferrer">
                read more
              </a>
              <button className="remove-btn" onClick={() => removeStory(objectID)}>remove</button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Stories;
