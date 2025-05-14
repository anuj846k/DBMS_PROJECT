export interface Recipe {
    likes: number;
    comments: any;
    reviews: any[];
    _id: string;
    title: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    image?: string;
    tags?: string[];
  }
  