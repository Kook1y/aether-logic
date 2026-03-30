import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathTextProps {
  tex: string;
  display?: boolean;
  className?: string;
}

export default function MathText({
  tex,
  display = false,
  className = '',
}: MathTextProps) {
  const html = katex.renderToString(tex, {
    throwOnError: false,
    displayMode: display,
  });

  const Tag = display ? 'div' : 'span';

  return (
    <Tag
      className={`font-mono ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
