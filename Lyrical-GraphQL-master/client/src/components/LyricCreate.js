import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const ADD_NEW_LYRIC = gql`
    mutation AddLyricToSong($content: String!, $songId: ID!) {
        addLyricToSong(content: $content, songId: $songId) {
            id
            lyrics {
                id
                content
                likes
            }
        }
    }
`;

const LyricCreate = ({ songId }) => {
    const [addLyricToSong] = useMutation(ADD_NEW_LYRIC);

    const [content, setContent] = useState('');

    const _onSubmit = e => {
        e.preventDefault();

        addLyricToSong({ variables: { content, songId } }).then(() => {
            setContent('');
        });
    };

    const _onUpdateLyricContent = e => {
        setContent(e.target.value);
    };

    return (
        <div>
            <form onSubmit={_onSubmit}>
                <label>Add Song Lyric:</label>
                <input onChange={_onUpdateLyricContent} value={content} />
            </form>
        </div>
    );
};

export default LyricCreate;
