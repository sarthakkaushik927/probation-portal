interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold md:text-4xl tracking-tight">
        {title}
      </h1>

      {description && (
        <p className="text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}