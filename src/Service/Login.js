import { fetchGraphql } from 'Utils/fetchGraphql';

export function onLogin({ Email, Password }) {
	const res = fetchGraphql({
		query: `
      mutation(
        $Email: String!,
        $Password: String!
      ) {
        Login(
          Email: $Email,
          Password: $Password
        ) {
          Token
        }
      }
    `,
		variables: {
			Email,
			Password,
		},
	});

	return res;
}
