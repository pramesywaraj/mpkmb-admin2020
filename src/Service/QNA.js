import { fetchGraphql } from 'Utils/fetchGraphql';
import Cookies from 'js-cookie';

export function getQNAList({ Page, Limit = 10 }) {
	const query = `
    query (
      $Limit: Int!, 
      $Page: Int!, 
      $OrderBy: QNAOrderBy, 
      $OrderType: OrderType, 
      $PublishStatus: Boolean, 
      $Username: String,
    ) {
      QNAs(
        Limit: $Limit,
        Page: $Page, 
        OrderBy: $OrderBy, 
        OrderType: $OrderType, 
        PublishStatus: $PublishStatus, 
        Username: $Username, 
      ) {
        Data {
          Id
          Username
          Question
          Answer
          PublishStatus
          Order
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
			OrderBy: 'CreatedDate',
			OrderType: 'DESC',
		},
	});

	return res;
}

export function addQNA({ Username, Question }) {
	const query = `
    mutation (
        $Username: String,
        $Question: String!,
    ) {
	CreateQNA(
        Username: $Username,
        Question: $Question,
      ) {
        Id
        Username
        Question
        Answer
        PublishStatus
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
			Username,
			Question,
		},
	});

	return res;
}

export function editQNA({ Id, Answer, PublishStatus, Order }) {
	const query = `
    mutation (
      $Id: String!,
      $Answer: String,
      $Order: Int,
      $PublishStatus: Boolean,
    ) {
	UpdateQNA(
        Id: $Id,
        Answer: $Answer,
        Order: $Order,
        PublishStatus: $PublishStatus,
      ) {
        Id
        Username
        Question
        Answer
        PublishStatus
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
			Answer,
			PublishStatus,
			Order,
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
      UpdateQNA (
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

export function DeleteQNA({ Id }) {
	const query = `
    mutation ($Id: String!) {
		DeleteQNA(Id: $Id) {
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
