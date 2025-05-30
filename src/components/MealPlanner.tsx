
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRecipeStore } from "@/store/recipeStore";
import { Calendar, Plus, ChefHat } from "lucide-react";
import { format, addDays, startOfWeek } from "date-fns";

export const MealPlanner = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const { recipes, mealPlans, generateShoppingListFromMealPlan } = useRecipeStore();
  
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 }); // Monday start
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getMealPlanForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return mealPlans.find(plan => plan.date === dateStr);
  };

  const generateWeeklyShoppingList = () => {
    const startDate = format(weekStart, 'yyyy-MM-dd');
    const endDate = format(addDays(weekStart, 6), 'yyyy-MM-dd');
    generateShoppingListFromMealPlan(startDate, endDate);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar size={20} />
              Weekly Meal Planner
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentWeek(addDays(currentWeek, -7))}
              >
                Previous Week
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentWeek(new Date())}
              >
                This Week
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentWeek(addDays(currentWeek, 7))}
              >
                Next Week
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Week of {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d, yyyy')}
            </p>
            <Button
              onClick={generateWeeklyShoppingList}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              Generate Shopping List
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {weekDays.map((day, index) => {
          const mealPlan = getMealPlanForDate(day);
          const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
          
          return (
            <Card
              key={index}
              className={`bg-white/70 backdrop-blur-sm ${
                isToday ? 'ring-2 ring-orange-400 bg-orange-50/70' : ''
              }`}
            >
              <CardHeader className="pb-3">
                <h3 className="font-semibold text-center">
                  {format(day, 'EEE')}
                  <br />
                  <span className="text-sm text-gray-600">{format(day, 'MMM d')}</span>
                </h3>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {/* Breakfast */}
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs w-full justify-center">
                    Breakfast
                  </Badge>
                  {mealPlan?.breakfast ? (
                    <div className="p-2 bg-yellow-50 rounded border text-xs">
                      <div className="font-medium">{mealPlan.breakfast.title}</div>
                      <div className="text-gray-600">{mealPlan.breakfast.cookTime}m</div>
                    </div>
                  ) : (
                    <Button variant="ghost" size="sm" className="w-full h-12 border-dashed border-2">
                      <Plus size={16} />
                    </Button>
                  )}
                </div>

                {/* Lunch */}
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs w-full justify-center">
                    Lunch
                  </Badge>
                  {mealPlan?.lunch ? (
                    <div className="p-2 bg-green-50 rounded border text-xs">
                      <div className="font-medium">{mealPlan.lunch.title}</div>
                      <div className="text-gray-600">{mealPlan.lunch.cookTime}m</div>
                    </div>
                  ) : (
                    <Button variant="ghost" size="sm" className="w-full h-12 border-dashed border-2">
                      <Plus size={16} />
                    </Button>
                  )}
                </div>

                {/* Dinner */}
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs w-full justify-center">
                    Dinner
                  </Badge>
                  {mealPlan?.dinner ? (
                    <div className="p-2 bg-blue-50 rounded border text-xs">
                      <div className="font-medium">{mealPlan.dinner.title}</div>
                      <div className="text-gray-600">{mealPlan.dinner.cookTime}m</div>
                    </div>
                  ) : (
                    <Button variant="ghost" size="sm" className="w-full h-12 border-dashed border-2">
                      <Plus size={16} />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recipe Library for Planning */}
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Recipe Library</CardTitle>
          <p className="text-sm text-gray-600">
            Drag recipes to add them to your meal plan, or click the + buttons above
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {recipes.slice(0, 8).map(recipe => (
              <div
                key={recipe.id}
                className="p-3 border rounded-lg bg-white/80 hover:bg-white transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <ChefHat size={16} className="text-orange-500" />
                  <span className="font-medium text-sm">{recipe.title}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{recipe.cookTime}m</span>
                  <Badge variant="secondary" className="text-xs">
                    {recipe.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
