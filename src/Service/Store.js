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
