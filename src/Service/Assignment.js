import { fetchGraphql } from 'Utils/fetchGraphql';
import Cookies from 'js-cookie';

export function getAssignmentList({ Page, Limit = 10 }) {
	const query = `
    query (
      $Limit: Int!, 
      $Page: Int!, 
      $OrderBy: ContentOrderBy, 
      $OrderType: OrderType, 
      $PublishStatus: Boolean, 
      $Title: String, 
      $Category: String, 
      $Type: String
    ) {
      Contents(
        Limit: $Limit,
        Page: $Page, 
        OrderBy: $OrderBy, 
        OrderType: $OrderType, 
        PublishStatus: $PublishStatus, 
        Title: $Title, 
        Category: $Category, 
        Type: $Type
      ) {
        Data {
          Id
          Title
          Description
          Thumbnail
          Url
          PublishStatus
          Category
          Type
          Order
        }
        DataCount
      }
    }  
  `;

	const res = fetchGraphql({
		headers: {
			Authorization: `${Cookies.getJSON('MPKMB_ADMIN_TOKEN').Token}`,
		},
		query,
		variables: {
			Limit,
			Page,
			OrderBy: 'CreatedDate',
			OrderType: 'DESC',
		},
	});

	return res;
}

export function addAssignment({
	Title,
	Description,
	Thumbnail,
	Url,
	Category,
	Type,
}) {
	const query = `
    mutation (
      $Title: String!, 
      $Description: String, 
      $Thumbnail: String, 
      $Url: String,
      $PublishStatus: Boolean!, 
      $Category: String!, 
      $Type: String!, 
      $Order: Int
    ) {
      CreateContent(
        Title: $Title, 
        Description: $Description,
        Thumbnail: $Thumbnail,
        Url: $Url,
        PublishStatus: $PublishStatus, 
        Category: $Category, 
        Type: $Type,
        Order: $Order
      ) {
        Id
        Title
        Description
        Thumbnail
        Url
        PublishStatus
        Category
        Type
        Order
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
			Thumbnail,
			Url,
			Category,
			Type,
			PublishStatus: true,
			Order: null,
		},
	});

	return res;
}

export function editAssignment({
	Id,
	Title,
	Description,
	Thumbnail,
	Url,
	Category,
	Type,
}) {
	const query = `
    mutation (
      $Id: String!,
      $Title: String, 
      $Description: String, 
      $Thumbnail: String, 
      $Url: String,
      $PublishStatus: Boolean, 
      $Category: String, 
      $Type: String, 
      $Order: Int
    ) {
      UpdateContent(
        Id: $Id,
        Title: $Title, 
        Description: $Description,
        Thumbnail: $Thumbnail,
        Url: $Url,
        PublishStatus: $PublishStatus, 
        Category: $Category, 
        Type: $Type,
        Order: $Order
      ) {
        Id
        Title
        Description
        Thumbnail
        Url
        PublishStatus
        Category
        Type
        Order
      }
    }  
  `;

	const res = fetchGraphql({
		headers: {
			Authorization: `${Cookies.getJSON('MPKMB_ADMIN_TOKEN').Token}`,
		},
		query,
		variables: {
			Id,
			Title,
			Description,
			Thumbnail,
			Url,
			Category,
			Type,
			Order: null,
		},
	});

	return res;
}

export function switchPublish({ Id, PublishStatus }) {
	const query = `
    mutation (
      $Id: String!,
      $PublishStatus: Boolean, 
    ) {
      UpdateContent(
        Id: $Id,
        PublishStatus: $PublishStatus, 
      ) {
        Id
        PublishStatus
      }
    }  
  `;

	const res = fetchGraphql({
		headers: {
			Authorization: `${Cookies.getJSON('MPKMB_ADMIN_TOKEN').Token}`,
		},
		query,
		variables: {
			Id,
			PublishStatus,
		},
	});

	return res;
}

export function deleteAssignment({ Id }) {
	const query = `
    mutation ($Id: String!) {
      DeleteContent(Id: $Id) {
        message
      }
    }  
  `;

	const res = fetchGraphql({
		headers: {
			Authorization: `${Cookies.getJSON('MPKMB_ADMIN_TOKEN').Token}`,
		},
		query,
		variables: {
			Id,
		},
	});

	return res;
}
