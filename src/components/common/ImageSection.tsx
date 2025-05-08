import { Card } from "@/components/ui/card";

interface ImageSectionProps {
  imagePath: string;
  altText: string;
  caption?: string;
  className?: string;
  height?: string;
}

export const ImageSection = ({ 
  imagePath, 
  altText, 
  caption, 
  className = "rounded-lg overflow-hidden",
  height
}: ImageSectionProps) => {
  return (
    <Card className={`shadow-md ${className}`}>
      <div className="overflow-hidden">
        <img 
          src={imagePath} 
          alt={altText} 
          className={`w-full object-cover transition-transform hover:scale-105 duration-500 ${height ? height : "h-auto"}`} 
        />
      </div>
      {caption && (
        <div className="p-3 text-center text-sm text-muted-foreground">
          {caption}
        </div>
      )}
    </Card>
  );
};
