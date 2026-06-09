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
      <h1 className="text-4xl font-bold">
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