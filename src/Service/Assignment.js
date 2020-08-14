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
			Authorization: `bearer ${Cookies.get('MPKMB_ADMIN_TOKEN')}`,
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
			Authorization: `bearer ${Cookies.get('MPKMB_ADMIN_TOKEN')}`,
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
