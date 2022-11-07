import md from "markdown-it";

type Props = {
  content?: string;
  frontmatter: any;
};

export default function MD({ frontmatter ,content }: Props) {
  return (
    <div className="container mx-auto flex flex-col md:flex-row items-start my-2 md:my-2 prose prose-xl prose-pink">
      <div dangerouslySetInnerHTML={{ __html: md().render(content || '') }} />
    </div>
  );
}
