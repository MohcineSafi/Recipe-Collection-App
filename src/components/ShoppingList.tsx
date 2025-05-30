
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useRecipeStore } from "@/store/recipeStore";
import { ShoppingCart, Plus, Trash2 } from "lucide-react";

export const ShoppingList = () => {
  const { shoppingList, addToShoppingList, toggleShoppingItem, removeFromShoppingList } = useRecipeStore();
  const [newItem, setNewItem] = useState({ name: "", quantity: "", category: "Groceries" });

  const addItem = () => {
    if (newItem.name.trim() && newItem.quantity.trim()) {
      addToShoppingList({
        ...newItem,
        completed: false,
      });
      setNewItem({ name: "", quantity: "", category: "Groceries" });
    }
  };

  const categories = ["Groceries", "Dairy", "Meat", "Produce", "Pantry", "Frozen", "Other"];
  const groupedItems = categories.reduce((acc, category) => {
    acc[category] = shoppingList.filter(item => item.category === category);
    return acc;
  }, {} as Record<string, typeof shoppingList>);

  const completedCount = shoppingList.filter(item => item.completed).length;
  const totalCount = shoppingList.length;

  return (
    <div className="space-y-6">
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart size={20} />
              Shopping List
            </CardTitle>
            <div className="text-sm text-gray-600">
              {completedCount} of {totalCount} items completed
            </div>
          </div>
          {totalCount > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              />
            </div>
          )}
        </CardHeader>
        
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Item name"
              value={newItem.name}
              onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
              className="flex-1"
            />
            <Input
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) => setNewItem(prev => ({ ...prev, quantity: e.target.value }))}
              className="w-24"
            />
            <select
              value={newItem.category}
              onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
              className="px-3 py-2 border rounded-md bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <Button
              onClick={addItem}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              <Plus size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {shoppingList.length === 0 ? (
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardContent className="py-12 text-center">
            <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Your shopping list is empty</h3>
            <p className="text-gray-500 mb-4">
              Add items manually or generate a list from your meal plan
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {categories.map(category => {
            const items = groupedItems[category];
            if (items.length === 0) return null;

            return (
              <Card key={category} className="bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold flex items-center gap-2">
                      {category}
                      <Badge variant="secondary" className="text-xs">
                        {items.length}
                      </Badge>
                    </h3>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2">
                    {items.map(item => (
                      <div
                        key={item.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                          item.completed 
                            ? 'bg-green-50 border-green-200 opacity-60' 
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Checkbox
                          checked={item.completed}
                          onCheckedChange={() => toggleShoppingItem(item.id)}
                        />
                        <div className="flex-1">
                          <div className={`font-medium ${item.completed ? 'line-through text-gray-500' : ''}`}>
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-500">{item.quantity}</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromShoppingList(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
