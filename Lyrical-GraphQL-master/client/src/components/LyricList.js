import React from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import LyricCard from './LyricCard';

const LIKE_LYRIC = gql`
    mutation LikeLyric($id: ID) {
        likeLyric(id: $id) {
            id
            likes
        }
    }
`;

const defaultLyrics = [];
const LyricList = ({ lyrics = defaultLyrics }) => {
    const [likeLyric] = useMutation(LIKE_LYRIC);

    const _onLyricLike = (id, likes) => {
        likeLyric({
            variables: { id },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id,
                    __typename: 'LyricType',
                    likes: likes + 1,
                },
            },
        });
    };

    return (
        <ul className="collection">
            {lyrics.map(({ id, content, likes }) => (
                <LyricCard
                    key={id}
                    id={id}
                    content={content}
                    likes={likes}
                    onLyricLike={_onLyricLike}
                />
            ))}
        </ul>
    );
};

export default LyricList;
