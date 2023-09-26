import { useParams } from "next/navigation";

export default function Category() {
  const { id } = useParams();

  return `page catégorie ${id}`;
}
