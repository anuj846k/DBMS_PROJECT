import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addReview } from '../services/recipeServices'
import { Review } from '../types/Review';

interface Props {
  recipeId: string;
  reviews: Review[];
}

const ReviewSection: React.FC<Props> = ({ recipeId, reviews }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const mutation = useMutation({
    mutationFn: (newReview: { name: string; rating: number; review: string }) =>
      addReview(recipeId, newReview),
    onSuccess: () => {
      setName('');
      setRating(0);
      setReview('');
    },
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name, rating, review });
  };

  return (
    <div>
      <h3 className="font-bold text-xl">Reviews</h3>
      <form onSubmit={handleReviewSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="input"
          required
        />
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          placeholder="Rating (1-5)"
          className="input"
          min={1}
          max={5}
          required
        />
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review"
          className="textarea"
          required
        />
        <button type="submit" className="btn">Submit Review</button>
      </form>

      <div className="mt-6">
        {reviews.map((review) => (
          <div key={review._id} className="review">
            <h4 className="font-semibold">{review.name} ({review.rating}/5)</h4>
            <p>{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
