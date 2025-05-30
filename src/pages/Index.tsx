
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeForm } from "@/components/RecipeForm";
import { MealPlanner } from "@/components/MealPlanner";
import { ShoppingList } from "@/components/ShoppingList";
import { Search, Plus, Book, Calendar, ShoppingCart, Filter } from "lucide-react";
import { useRecipeStore } from "@/store/recipeStore";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const { recipes, categories } = useRecipeStore();

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl text-white">
                <Book size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Recipe Collection</h1>
                <p className="text-sm text-gray-600">Organize, plan, and cook with joy</p>
              </div>
            </div>
            <Button
              onClick={() => setShowRecipeForm(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              <Plus size={16} className="mr-2" />
              Add Recipe
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="recipes" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="recipes" className="flex items-center gap-2">
              <Book size={16} />
              Recipes
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search size={16} />
              Search
            </TabsTrigger>
            <TabsTrigger value="planner" className="flex items-center gap-2">
              <Calendar size={16} />
              Meal Planner
            </TabsTrigger>
            <TabsTrigger value="shopping" className="flex items-center gap-2">
              <ShoppingCart size={16} />
              Shopping List
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recipes" className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === "all" ? "default" : "secondary"}
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedCategory("all")}
              >
                All Recipes
              </Badge>
              {categories.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
              {filteredRecipes.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <div className="p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No recipes found</h3>
                    <p className="text-gray-500 mb-4">Start by adding your first recipe!</p>
                    <Button
                      onClick={() => setShowRecipeForm(true)}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    >
                      <Plus size={16} className="mr-2" />
                      Add Recipe
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <Card className="bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search size={20} />
                  Search Recipes
                </CardTitle>
                <CardDescription>
                  Find recipes by name, ingredients, or cooking time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search recipes or ingredients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white/80"
                    />
                  </div>
                  <Button variant="outline" className="px-3">
                    <Filter size={16} />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={selectedCategory === "all" ? "default" : "secondary"}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setSelectedCategory("all")}
                  >
                    All Categories
                  </Badge>
                  {categories.map(category => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "secondary"}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="planner">
            <MealPlanner />
          </TabsContent>

          <TabsContent value="shopping">
            <ShoppingList />
          </TabsContent>
        </Tabs>
      </main>

      {/* Recipe Form Modal */}
      {showRecipeForm && (
        <RecipeForm onClose={() => setShowRecipeForm(false)} />
      )}
    </div>
  );
};

export default Index;
