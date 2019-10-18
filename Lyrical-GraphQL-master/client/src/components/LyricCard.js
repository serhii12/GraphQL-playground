import React from 'react';

const defaultOnLyricLike = () => {};
const LyricCard = ({ id, content, likes, onLyricLike = defaultOnLyricLike }) => {
    const _onLyricLike = () => {
        onLyricLike(id, likes);
    };

    return (
        <li className="collection-item">
            {content}
            <div className="vote-box">
                <i className="material-icons" onClick={_onLyricLike}>
                    thumb_up
                </i>
                {likes}
            </div>
        </li>
    );
};

export default LyricCard;
