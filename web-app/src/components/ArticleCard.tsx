import Link from "next/link";

export default function ArticleCard({
  id,
  name,
  price,
}: {
  id: number;
  name: string;
  price: number;
}) {
  return (
    <div className="article-card-container">
      <Link className="article-card-link" href={`/articles/${id}`}>
        <img className="article-card-image" src={`/images/${id}.webp`} />
        <div className="article-card-text">
          <div className="article-card-title">{name}</div>
          <div className="article-card-price">{price} €</div>
        </div>
      </Link>
    </div>
  );
}
