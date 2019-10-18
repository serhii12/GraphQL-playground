import React from 'react';
import { Link } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';
import { FETCH_SONG } from '../queries';

const SongDetail = props => {
    const { loading, error, data } = useQuery(FETCH_SONG, {
        variables: { id: props.params.id },
    });

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error :(</p>;

    const { song = {} } = data;
    return (
        <div>
            <Link to="/">Back</Link>
            <h3>{song.title}</h3>
            <LyricList lyrics={song.lyrics} />
            <LyricCreate songId={props.params.id} />
        </div>
    );
};

export default SongDetail;
