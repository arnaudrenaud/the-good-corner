import { useParams } from "next/navigation";

export default function Category() {
  const params = useParams();
  const id = params?.id;

  return id ? `Catégorie ${id}` : "Loading…";
}
