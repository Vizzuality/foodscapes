import cn from 'classnames';

type LayoutMdxProps = {
  children: React.ReactNode;
};

const LayoutMdx: React.FC<LayoutMdxProps> = (props: LayoutMdxProps) => {
  const { children } = props;

  return (
    <article
      className={cn({
        'prose-sm flex grow flex-col overflow-auto p-6 prose-headings:font-display prose-h1:mb-0 prose-p:mb-0 prose-ol:list-decimal prose-ul:list-disc':
          true,
      })}
    >
      {/* Content */}
      {children}
    </article>
  );
};

export default LayoutMdx;
