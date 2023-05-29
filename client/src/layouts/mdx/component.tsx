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
        'prose flex grow flex-col p-6 prose-headings:font-display prose-p:mb-0': true,
        'overflow-auto': type === 'default',
        'overflow-visible': type === 'case-study',
      })}
    >
      {/* Content */}
      {children}
    </article>
  );
};

export default LayoutMdx;
