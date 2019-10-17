import React from 'react';
import { Link } from 'react-router';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { FETCH_SONGS } from '../queries';
import SongCard from './SongCard';

const DELETE_SONG = gql`
    mutation DeleteSong($id: ID!) {
        deleteSong(id: $id) {
            id
        }
    }
`;

const SongList = () => {
    const [deleteSong] = useMutation(DELETE_SONG);

    const { loading, error, data, refetch } = useQuery(FETCH_SONGS);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error :(</p>;

    const { songs = [] } = data;

    const _onSongDelete = id => {
        deleteSong({ variables: { id } });
        refetch();
    };

    return (
        <div>
            <ul className="collection">
                {songs.map(({ id, title } = {}) => (
                    <SongCard key={id} id={id} title={title} onSongDelete={_onSongDelete} />
                ))}
            </ul>
            <Link to="/songs/new" className="btn-floating btn-large red right">
                <i className="material-icons">add</i>
            </Link>
        </div>
    );
};

export default SongList;
