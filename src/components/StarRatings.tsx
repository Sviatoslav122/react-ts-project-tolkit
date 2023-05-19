import React from 'react';
import StarRatings from 'react-star-ratings';

interface StarRatingsProps {
    rating: number;
}

const CustomStarRatings: React.FC<StarRatingsProps> = ({ rating }) => {
    return (
        <StarRatings
            rating={rating}
            starRatedColor="gold"
            starEmptyColor="lightgray"
            starHoverColor="gold"
            starDimension="20px"
            starSpacing="2px"
            numberOfStars={10}
        />
    );
};

export default CustomStarRatings;
