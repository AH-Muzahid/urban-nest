'use client';

import { useState, useEffect } from 'react';
import { getPropertyReviews, addReview, deleteReview } from '@/services/reviewService';
import { MdStar, MdDelete } from 'react-icons/md';
import { getCurrentUser } from '@/services/authService';

const Reviews = ({ propertyId }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        setCurrentUser(getCurrentUser());
        fetchReviews();
    }, [propertyId]);

    const fetchReviews = async () => {
        try {
            const data = await getPropertyReviews(propertyId);
            setReviews(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addReview(propertyId, newReview);
            setNewReview({ rating: 5, comment: '' });
            fetchReviews(); // Refresh list
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to submit review');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return;
        try {
            await deleteReview(id);
            fetchReviews();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className="text-center py-8">Loading reviews...</div>;

    return (
        <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Reviews ({reviews.length})</h3>

            {/* Review List */}
            <div className="space-y-6 mb-12">
                {reviews.length === 0 && <p className="text-gray-500">No reviews yet. Be the first!</p>}
                {reviews.map((review) => (
                    <div key={review._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-gray-200 overflow-hidden">
                                    <img src={review.user?.avatar || `https://ui-avatars.com/api/?name=${review.user?.name || 'User'}`} alt="User" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">{review.user?.name || 'Anonymous'}</p>
                                    <div className="flex text-yellow-500 text-xs">
                                        {[...Array(5)].map((_, i) => (
                                            <MdStar key={i} className={i < review.rating ? 'opacity-100' : 'opacity-20'} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {(currentUser?._id === review.user?._id || currentUser?.role === 'admin') && (
                                <button onClick={() => handleDelete(review._id)} className="text-red-400 hover:text-red-600">
                                    <MdDelete />
                                </button>
                            )}
                        </div>
                        <p className="text-gray-600 text-sm">{review.comment}</p>
                    </div>
                ))}
            </div>

            {/* Add Review Form */}
            {currentUser ? (
                <div className="bg-gray-50 p-6 rounded-2xl">
                    <h4 className="font-bold text-lg mb-4">Write a Review</h4>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        type="button"
                                        key={star}
                                        onClick={() => setNewReview({ ...newReview, rating: star })}
                                        className={`text-2xl ${star <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>
                        <textarea
                            className="w-full bg-white border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary shadow-sm"
                            placeholder="Share your thoughts..."
                            rows="3"
                            required
                            value={newReview.comment}
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        ></textarea>
                        <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-opacity-90 transition">
                            Post Review
                        </button>
                    </form>
                </div>
            ) : (
                <div className="bg-gray-50 p-6 rounded-2xl text-center">
                    <p className="text-gray-500 mb-4">Please log in to write a review.</p>
                </div>
            )}
        </div>
    );
};

export default Reviews;
