import React, { useState } from 'react';
import { Link, hashHistory } from 'react-router';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { FETCH_SONGS } from '../queries';

const ADD_NEW_SONG = gql`
    mutation AddSong($title: String!) {
        addSong(title: $title) {
            id
            title
        }
    }
`;

const SongCreate = props => {
    const [addSong] = useMutation(ADD_NEW_SONG);

    const [title, setTitle] = useState('');

    const _onSubmit = e => {
        e.preventDefault();

        addSong({ variables: { title }, refetchQueries: [{ FETCH_SONGS }] }).then(() => {
            return hashHistory.push('/');
        });
    };

    const _onUpdateTitle = e => {
        setTitle(e.target.value);
    };

    return (
        <div>
            <Link to="/">Back</Link>
            <h3>Create a New Song</h3>
            <form onSubmit={_onSubmit}>
                <label>Song Title:</label>
                <input onChange={_onUpdateTitle} value={title} />
            </form>
        </div>
    );
};

export default SongCreate;
