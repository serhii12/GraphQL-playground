import React from 'react';
import { Link } from 'react-router';

const SongCard = ({ id, title, onSongDelete }) => {
    // const _onSongDelete = () => {
    //     onSongDelete(id);
    // };

    return (
        <li className="collection-item">
            <Link to={`/songs/${id}`}>{title}</Link>
            <i
                className="material-icons"
                // onClick={_onSongDelete}
            >
                delete
            </i>
        </li>
    );
};

export default SongCard;
