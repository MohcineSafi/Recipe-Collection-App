
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/store/recipeStore";
import { Clock, Users, ChefHat } from "lucide-react";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const difficultyColors = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/70 backdrop-blur-sm border-orange-100">
      <CardHeader className="pb-3">
        <div className="aspect-video bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
          {recipe.image ? (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <ChefHat size={48} className="text-orange-400" />
          )}
          <Badge
            className={`absolute top-2 right-2 ${difficultyColors[recipe.difficulty]}`}
          >
            {recipe.difficulty}
          </Badge>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">
            {recipe.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">{recipe.description}</p>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{recipe.cookTime}m</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          <Badge variant="secondary" className="text-xs">
            {recipe.category}
          </Badge>
          {recipe.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {recipe.tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{recipe.tags.length - 2}
            </Badge>
          )}
        </div>
        
        <Button
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          size="sm"
        >
          View Recipe
        </Button>
      </CardContent>
    </Card>
  );
};
