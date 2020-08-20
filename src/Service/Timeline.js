import { fetchGraphql } from 'Utils/fetchGraphql';
import Cookies from 'js-cookie';

export function getTimeline({ Page, Limit = 10 }) {
	const query = `
    query (
      $Limit: Int!, 
      $Page: Int!, 
      $Published: Boolean, 
      $DateSort: String
    ) {
      ReminderDates(
        Limit: $Limit, 
        Page: $Page, 
        Published: $Published, 
        DateSort: $DateSort
      ) {
        Data {
          Id
          Title
          Description
          Date
          IsPublish
          CreatedDate
          LastUpdated
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
		},
	});

	return res;
}

export function createTimeline({ Title, Description, Date, IsPublish = true }) {
	const query = `
    mutation (
      $Id: String, 
      $Title: String!, 
      $Description: String!, 
      $Date: String!,
      $IsPublish: Boolean!
    ) {
      CreateOrUpdateRemiderDate(
        Id: $Id, 
        Title: $Title, 
        Description: $Description, 
        Date: $Date,
        IsPublish: $IsPublish
      ) {
        Id
        Title
        Description
        Date
        IsPublish
        CreatedDate
        LastUpdated
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

export function editOrSwitchTimeline({
	Id,
	Title,
	Description,
	Date,
	IsPublish,
}) {
	const query = `
    mutation (
      $Id: String, 
      $Title: String!, 
      $Description: String!, 
      $Date: String!,
      $IsPublish: Boolean!
    ) {
      CreateOrUpdateRemiderDate(
        Id: $Id, 
        Title: $Title, 
        Description: $Description, 
        Date: $Date,
        IsPublish: $IsPublish
      ) {
        Id
        Title
        Description
        Date
        IsPublish
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
			Date,
			IsPublish,
		},
	});

	return res;
}
