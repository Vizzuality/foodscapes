type LayoutMdxProps = {
  children: React.ReactNode;
};

const LayoutMdx: React.FC<LayoutMdxProps> = (props: LayoutMdxProps) => {
  const { children } = props;

  return (
    <article className="prose flex grow flex-col overflow-auto p-6 prose-headings:font-display prose-p:mb-0">
      {/* Content */}
      {children}
    </article>
  );
};

export default LayoutMdx;
