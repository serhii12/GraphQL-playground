import React from 'react';
import { Link } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';
import { FETCH_SONGS } from '../queries';
import SongCard from './SongCard';

const SongList = props => {
    const { loading, error, data } = useQuery(FETCH_SONGS);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error :(</p>;

    const { songs = [] } = data;
    return (
        <div>
            <ul className="collection">
                {songs.map(({ id, title } = {}) => (
                    <SongCard
                        key={id}
                        id={id}
                        title={title}
                        // onSongDelete={this._onSongDelete}
                    />
                ))}
            </ul>
            <Link to="/songs/new" className="btn-floating btn-large red right">
                <i className="material-icons">add</i>
            </Link>
        </div>
    );
};

export default SongList;
