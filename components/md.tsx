import md from "markdown-it";

type Props = {
  content?: string;
  frontmatter: any;
};

export default function MD({ frontmatter ,content }: Props) {
  return (
    <div className="prose prose-xl prose-pink">
      <div dangerouslySetInnerHTML={{ __html: md().render(content || '') }} />
    </div>
  );
}
