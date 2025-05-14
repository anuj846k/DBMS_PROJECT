export interface Recipe {
    _id: string;
    title: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    image?: string;
    category?: string;
    cookingTime?: string;
    tags?: string[];
    likes: number;
    comments: any;
    reviews: any[];
}
  