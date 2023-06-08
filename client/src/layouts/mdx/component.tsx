import cn from 'classnames';

type LayoutMdxProps = {
  type: 'default' | 'case-study';
  children: React.ReactNode;
};

const LayoutMdx: React.FC<LayoutMdxProps> = (props: LayoutMdxProps) => {
  const { type = 'default', children } = props;

  return (
    <article
      className={cn({
        'prose-sm flex grow flex-col prose-headings:font-display prose-h1:mb-0 prose-p:mb-0': true,
        'overflow-auto p-6': type === 'default',
        'overflow-visible': type === 'case-study',
      })}
    >
      {/* Content */}
      {children}
    </article>
  );
};

export default LayoutMdx;
