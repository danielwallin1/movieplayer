import gql from 'graphql-tag';

export const GET_MOVIE = gql`
    query movie($id: String!) {
        movie(id: $id) {
            id
            manifest
            name
        }
    }
`;

export const GET_MOVIES = gql`
    query movies {
        movies {
            id
            name
        }
    }
`;