import { fetchGraphql } from 'Utils/fetchGraphql';
import { sha256 } from 'js-sha256';
import Cookies from 'js-cookie';

const token = Cookies.getJSON('MPKMB_ADMIN_TOKEN');

export function getUserList({ Page, Limit = 10 }) {
	const query = `
    query (
      $Limit: Int!, 
      $Page: Int!, 
    ) {
      Users(
        Limit: $Limit,
        Page: $Page, 
      ) {
          Id
          Name
          Email
          IsActive
        }
    }  
  `;

	const res = fetchGraphql({
		headers: {
			Authorization: `${token.Token}`,
		},
		query,
		variables: {
			Limit,
			Page,
		},
	});

	return res;
}

export function addUser({ Name, Email, Password }) {
	const hashedPass = sha256(Password);
	const query = `
    mutation (
      $Name: String!, 
      $Email: String!, 
      $Password: String!,
      $IsActive: Boolean, 
    ) {
      Register (
        Name: $Name, 
        Email: $Email,
        Password: $Password,
        IsActive: $IsActive,
      ) {
        Id
        Name
        Email
        IsActive
      }
    }  
  `;

	const res = fetchGraphql({
		headers: {
			Authorization: `${token.Token}`,
		},
		query,
		variables: {
			Name,
			Email,
			Password: hashedPass,
			IsActive: false,
		},
	});

	return res;
}

export function editUserProfile({ Id, Name, Email }) {
	const query = `
    mutation (
      $Id: String!,
      $Name: String, 
      $Email: String,
    ) {
      UpdateUserProfile(
        Id: $Id,
        Name: $Name, 
        Email: $Email,
      ) {
        Id
        Name
        Email
      }
    }  
  `;

	const res = fetchGraphql({
		headers: {
			Authorization: `${token.Token}`,
		},
		query,
		variables: {
			Id,
			Name,
			Email,
		},
	});

	return res;
}

export function switchIsActive({ Id, IsActive }) {
	const query = `
    mutation (
      $Id: String!,
      $IsActive: Boolean, 
    ) {
      UpdateUserProfile(
        Id: $Id,
        IsActive: $IsActive, 
      ) {
        Id
        IsActive
      }
    }  
  `;

	const res = fetchGraphql({
		headers: {
			Authorization: `${token.Token}`,
		},
		query,
		variables: {
			Id,
			IsActive,
		},
	});

	return res;
}

export function UpdateUserPassword({ OldPassword, NewPassword }) {
	const query = `
    mutation (
      $OldPassword: String!,
      $NewPassword: String!, 
    ) {
        UpdateUserPassword(
        OldPassword: $OldPassword,
        NewPassword: $NewPassword, 
      ) {
        Id
        Name
        Email
        IsActive
      }
    }  
  `;

	const res = fetchGraphql({
		headers: {
			Authorization: `${token}`,
		},
		query,
		variables: {
			OldPassword,
			NewPassword,
		},
	});

	return res;
}
