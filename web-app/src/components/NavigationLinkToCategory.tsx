import Link from "next/link";

export default function NavigationLinkToCategory({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  return (
    <Link href={`/categories/${id}`} className="category-navigation-link">
      {name}
    </Link>
  );
}
