import Link from "next/link";
import Label from "../ui/label";

export default function CategoryLabel({ categories }:any) {
  return (
    <div>
      {categories?.length &&
        categories.slice(0).map((category:any, index:any) => (
          <Link
            href={`/category/${category.slug.current}`}
            key={index}>
            <a>
              <Label color={category.color}>{category.title}</Label>
            </a>
          </Link>
        ))}
    </div>
  );
}
