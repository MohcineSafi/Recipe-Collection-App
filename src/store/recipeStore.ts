
import { create } from 'zustand';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  image?: string;
  tags: string[];
  createdAt: Date;
}

export interface MealPlan {
  id: string;
  date: string;
  breakfast?: Recipe;
  lunch?: Recipe;
  dinner?: Recipe;
  snacks?: Recipe[];
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  completed: boolean;
  recipeId?: string;
}

interface RecipeStore {
  recipes: Recipe[];
  mealPlans: MealPlan[];
  shoppingList: ShoppingItem[];
  categories: string[];
  
  addRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt'>) => void;
  updateRecipe: (id: string, recipe: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;
  
  addMealPlan: (mealPlan: Omit<MealPlan, 'id'>) => void;
  updateMealPlan: (id: string, mealPlan: Partial<MealPlan>) => void;
  
  addToShoppingList: (item: Omit<ShoppingItem, 'id'>) => void;
  toggleShoppingItem: (id: string) => void;
  removeFromShoppingList: (id: string) => void;
  generateShoppingListFromMealPlan: (startDate: string, endDate: string) => void;
}

const sampleRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Spaghetti Carbonara',
    description: 'A creamy Italian pasta dish with eggs, cheese, and pancetta',
    category: 'Italian',
    cookTime: 20,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      '400g spaghetti',
      '200g pancetta or guanciale',
      '4 large eggs',
      '100g Pecorino Romano cheese',
      'Black pepper',
      'Salt'
    ],
    instructions: [
      'Bring a large pot of salted water to boil and cook spaghetti until al dente',
      'While pasta cooks, cut pancetta into small cubes and cook until crispy',
      'Beat eggs with grated cheese and black pepper in a bowl',
      'Drain pasta, reserving 1 cup of pasta water',
      'Toss hot pasta with pancetta, then quickly mix in egg mixture',
      'Add pasta water as needed to create a creamy sauce',
      'Serve immediately with extra cheese and black pepper'
    ],
    tags: ['pasta', 'italian', 'quick', 'creamy'],
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Mediterranean Quinoa Salad',
    description: 'Fresh and healthy salad with quinoa, vegetables, and feta cheese',
    category: 'Healthy',
    cookTime: 15,
    servings: 6,
    difficulty: 'Easy',
    ingredients: [
      '1 cup quinoa',
      '1 cucumber, diced',
      '2 tomatoes, diced',
      '1/2 red onion, finely chopped',
      '1/2 cup kalamata olives',
      '100g feta cheese',
      '1/4 cup olive oil',
      '2 tbsp lemon juice',
      'Fresh herbs (parsley, mint)'
    ],
    instructions: [
      'Rinse quinoa and cook according to package instructions',
      'Let quinoa cool completely',
      'Dice all vegetables and crumble feta cheese',
      'Whisk together olive oil, lemon juice, salt, and pepper',
      'Combine quinoa with vegetables, olives, and feta',
      'Drizzle with dressing and toss gently',
      'Garnish with fresh herbs before serving'
    ],
    tags: ['healthy', 'vegetarian', 'mediterranean', 'salad'],
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    title: 'Chocolate Chip Cookies',
    description: 'Classic homemade chocolate chip cookies that are crispy outside and chewy inside',
    category: 'Dessert',
    cookTime: 25,
    servings: 24,
    difficulty: 'Easy',
    ingredients: [
      '2 1/4 cups all-purpose flour',
      '1 tsp baking soda',
      '1 tsp salt',
      '1 cup butter, softened',
      '3/4 cup brown sugar',
      '3/4 cup white sugar',
      '2 large eggs',
      '2 tsp vanilla extract',
      '2 cups chocolate chips'
    ],
    instructions: [
      'Preheat oven to 375°F (190°C)',
      'Mix flour, baking soda, and salt in a bowl',
      'Cream together butter and both sugars until fluffy',
      'Beat in eggs and vanilla extract',
      'Gradually blend in flour mixture',
      'Stir in chocolate chips',
      'Drop rounded tablespoons onto ungreased cookie sheets',
      'Bake for 9-11 minutes until golden brown',
      'Cool on baking sheet for 2 minutes before removing'
    ],
    tags: ['dessert', 'cookies', 'chocolate', 'baking'],
    createdAt: new Date('2024-01-05'),
  }
];

export const useRecipeStore = create<RecipeStore>((set, get) => ({
  recipes: sampleRecipes,
  mealPlans: [],
  shoppingList: [],
  categories: ['Italian', 'Healthy', 'Dessert', 'Asian', 'Mexican', 'American', 'Vegetarian', 'Vegan'],

  addRecipe: (recipe) => set((state) => ({
    recipes: [...state.recipes, {
      ...recipe,
      id: Date.now().toString(),
      createdAt: new Date(),
    }]
  })),

  updateRecipe: (id, recipe) => set((state) => ({
    recipes: state.recipes.map(r => r.id === id ? { ...r, ...recipe } : r)
  })),

  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter(r => r.id !== id)
  })),

  addMealPlan: (mealPlan) => set((state) => ({
    mealPlans: [...state.mealPlans, {
      ...mealPlan,
      id: Date.now().toString(),
    }]
  })),

  updateMealPlan: (id, mealPlan) => set((state) => ({
    mealPlans: state.mealPlans.map(mp => mp.id === id ? { ...mp, ...mealPlan } : mp)
  })),

  addToShoppingList: (item) => set((state) => ({
    shoppingList: [...state.shoppingList, {
      ...item,
      id: Date.now().toString(),
    }]
  })),

  toggleShoppingItem: (id) => set((state) => ({
    shoppingList: state.shoppingList.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    )
  })),

  removeFromShoppingList: (id) => set((state) => ({
    shoppingList: state.shoppingList.filter(item => item.id !== id)
  })),

  generateShoppingListFromMealPlan: (startDate, endDate) => {
    const { mealPlans, addToShoppingList } = get();
    const relevantPlans = mealPlans.filter(plan => 
      plan.date >= startDate && plan.date <= endDate
    );

    const ingredients = new Map<string, { quantity: string; category: string; recipeId: string }>();

    relevantPlans.forEach(plan => {
      [plan.breakfast, plan.lunch, plan.dinner, ...(plan.snacks || [])].forEach(recipe => {
        if (recipe) {
          recipe.ingredients.forEach(ingredient => {
            if (ingredients.has(ingredient)) {
              // Combine quantities if same ingredient
              const existing = ingredients.get(ingredient)!;
              ingredients.set(ingredient, {
                ...existing,
                quantity: `${existing.quantity} + more`,
              });
            } else {
              ingredients.set(ingredient, {
                quantity: '1',
                category: 'Groceries',
                recipeId: recipe.id,
              });
            }
          });
        }
      });
    });

    // Add to shopping list
    ingredients.forEach((details, ingredient) => {
      addToShoppingList({
        name: ingredient,
        quantity: details.quantity,
        category: details.category,
        completed: false,
        recipeId: details.recipeId,
      });
    });
  },
}));
