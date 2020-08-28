import { fetchGraphql } from 'Utils/fetchGraphql';
import Cookies from 'js-cookie';

export function getLeaderboards() {
	const query = `
    query (
      $Limit: Int!, 
      $Page: Int!,
      $IsPublish: Boolean,
      $RankSort: String
    ) {
      Leaderboards(
        Limit: $Limit,
        Page: $Page, 
        IsPublish: $IsPublish,
        RankSort: $RankSort,
      ) {
        LeaderboardId
        Title
        Description
        Date
        IsPublish
        Users {
          LeaderboardUserId
          LeaderboardId
          Name
          NIM
          Point
          Rank
        }
      }
    }
  `;

	const res = fetchGraphql({
		headers: {
			Authorization: `${Cookies.getJSON('MPKMB_ADMIN_TOKEN').Token}`,
		},
		query,
		variables: {
			Limit: 1000,
			Page: 1,
		},
	});

	return res;
}

export function addLeaderboard({ Title, Description, Date, IsPublish }) {
	const query = `
    mutations (
      $Title: String!,
      $Description: String!,
      $Date: String!,
      $IsPublish: Boolean!
    ) {
      CreateOrUpdateLeaderboard(
        Title: $Title,
        Description: $Description,
        Date: $Date,
        IsPublish: $IsPublish
      ) {
        LeaderboardId
        Title
        Description
        Date
        IsPublish
        Users {
          LeaderboardUserId
          LeaderboardId
          Name
          NIM
          Point
          Rank
        }
      }
    }
  `;

	const res = fetchGraphql({
		headers: {
			Authorization: `${Cookies.getJSON('MPKMB_ADMIN_TOKEN').Token}`,
		},
		query,
		variables: {
			Title,
			Description,
			Date,
			IsPublish,
		},
	});

	return res;
}
