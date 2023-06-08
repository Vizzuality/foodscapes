import cn from 'classnames';

type LayoutStoriesMdxProps = {
  children: React.ReactNode;
};

const LayoutStoriesMdx: React.FC<LayoutStoriesMdxProps> = (props: LayoutStoriesMdxProps) => {
  const { children } = props;

  return (
    <article
      className={cn({
        'prose flex grow flex-col overflow-visible prose-headings:font-display prose-h1:mb-0 prose-p:mb-0':
          true,
      })}
    >
      {/* Content */}
      {children}
    </article>
  );
};

export default LayoutStoriesMdx;
