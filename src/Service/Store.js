import { fetchGraphql } from 'Utils/fetchGraphql';
import Cookies from 'js-cookie';

export function getStoreProducts({ Page, Limit = 8 }) {
	const query = `
    query (
      $Limit: Int!, 
      $Page: Int!, 
      $OrderBy: ProductOrderBy,
      $OrderType: OrderType,
      $PublishStatus: Boolean,
      $Name: String,
      $ProductCode: String,
      $PriceGreaterThan: Int,
      $PriceLowerThan: Int
    ) {
      Products(
        Limit: $Limit, 
        Page: $Page, 
        OrderBy: $OrderBy,
        OrderType: $OrderType,
        PublishStatus: $PublishStatus,
        Name: $Name,
        ProductCode: $ProductCode,
        PriceLowerThan: $PriceLowerThan,
        PriceGreaterThan: $PriceGreaterThan
      ) {
        Data {
          Id,
          Name,
          Description,
          Thumbnail,
          ProductCode,
          Price,
          Order,
          PublishStatus
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

export function createNewProduct({
	Name,
	Description,
	Thumbnail,
	ProductCode,
	Price,
}) {
	const query = `
    mutation (
      $Name: String!, 
      $Description: String, 
      $Thumbnail: String,
      $ProductCode: String,
      $Price: Int,
      $PublishStatus: Boolean,
    ) {
      CreateProduct(
        Name: $Name,
        Description: $Description,
        Thumbnail: $Thumbnail,
        ProductCode: $ProductCode,
        Price: $Price,
        PublishStatus: $PublishStatus,
      ) {
        Id
        Name
        Description
        Thumbnail
        ProductCode
        Price
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
			Name,
			Description,
			Thumbnail,
			ProductCode,
			Price,
			PublishStatus: true,
		},
	});

	return res;
}

export function updateProduct({
	Id,
	Name,
	Description,
	Thumbnail,
	ProductCode,
	Price,
}) {
	const query = `
    mutation (
      $Id: String!,
      $Name: String!, 
      $Description: String, 
      $Thumbnail: String,
      $ProductCode: String,
      $Price: Int,
    ) {
      UpdateProduct(
        Id: $Id,
        Name: $Name,
        Description: $Description,
        Thumbnail: $Thumbnail,
        ProductCode: $ProductCode,
        Price: $Price,
      ) {
        Id
        Name
        Description
        Thumbnail
        ProductCode
        Price
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
			Name,
			Description,
			Thumbnail,
			ProductCode,
			Price,
		},
	});

	return res;
}

export function deleteProduct({ Id }) {
	const query = `
    mutation ($Id: String!) {
      DeleteProduct(Id: $Id) {
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

export function switchPublish({ Id, PublishStatus }) {
	const query = `
    mutation (
      $Id: String!,
      $PublishStatus: Boolean, 
    ) {
      UpdateProduct(
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
