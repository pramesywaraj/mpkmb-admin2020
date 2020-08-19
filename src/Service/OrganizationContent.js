import { fetchGraphql } from 'Utils/fetchGraphql';
import Cookies from 'js-cookie';

export function getOrganizationContentList({ Page, Limit = 10 }) {
	const query = `
    query (
      $Limit: Int!, 
      $Page: Int!, 
      $OrderBy: OrganizationContentOrderBy, 
      $OrderType: OrderType, 
      $PublishStatus: Boolean, 
      $Title: String, 
      $Category: String,
    ) {
	OrganizationContents(
        Limit: $Limit,
        Page: $Page, 
        OrderBy: $OrderBy, 
        OrderType: $OrderType, 
        PublishStatus: $PublishStatus, 
        Title: $Title, 
        Category: $Category,
      ) {
        Data {
            Id
            Title
            Subtitle
            Thumbnail
            Article
            Url
            LineUrl
            TwitterUrl
            YoutubeUrl
            InstagramUrl
            Category
            PublishStatus
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

export function addOrganizationContent({
	Id,
	Title,
	Subtitle,
	Thumbnail,
	Article,
	Url,
	LineUrl,
	TwitterUrl,
	YoutubeUrl,
	InstagramUrl,
	Category,
}) {
	const query = `
    mutation (
        $Title: String!,
        $Subtitle: String,
        $Thumbnail: String,
        $Article: String,
        $Url: String,
        $LineUrl: String,
        $TwitterUrl: String,
        $YoutubeUrl: String,
        $InstagramUrl: String,
        $Category: String!,
        $PublishStatus: Boolean,
        $Order: Int,
    ) {
	CreateOrganizationContent (
        Title: $Title,
        Subtitle: $Subtitle,
        Thumbnail: $Thumbnail,
        Article: $Article,
        Url: $Url,
        LineUrl: $LineUrl,
        TwitterUrl: $TwitterUrl,
        YoutubeUrl: $YoutubeUrl,
        InstagramUrl: $InstagramUrl,
        Category: $Category,
        PublishStatus: $PublishStatus,
        Order: $Order,
      ) {
        Id
        Title
        Subtitle
        Thumbnail
        Article
        Url
        LineUrl
        TwitterUrl
        YoutubeUrl
        InstagramUrl
        Category
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
			Title,
			Subtitle,
			Thumbnail,
			Article,
			Url,
			LineUrl,
			TwitterUrl,
			YoutubeUrl,
			InstagramUrl,
			Category: 'UKM',
			PublishStatus: false,
			Order: null,
		},
	});

	return res;
}

export function editOrganizationContent({
	Id,
	Title,
	Subtitle,
	Thumbnail,
	Article,
	Url,
	LineUrl,
	TwitterUrl,
	YoutubeUrl,
	InstagramUrl,
	Category,
	PublishStatus,
	Order,
}) {
	const query = `
    mutation (
      $Id: String!,
      $Title: String!,
      $Subtitle: String,
      $Thumbnail: String,
      $Article: String,
      $Url: String,
      $LineUrl: String,
      $TwitterUrl: String,
      $YoutubeUrl: String,
      $InstagramUrl: String,
      $Category: String!,
      $PublishStatus: Boolean,
      $Order: Int,
    ) {
	UpdateOrganizationContent (
        Id: $Id,
        Title: $Title,
        Subtitle: $Subtitle,
        Thumbnail: $Thumbnail,
        Article: $Article,
        Url: $Url,
        LineUrl: $LineUrl,
        TwitterUrl: $TwitterUrl,
        YoutubeUrl: $YoutubeUrl,
        InstagramUrl: $InstagramUrl,
        Category: $Category,
        PublishStatus: $PublishStatus,
        Order: $Order,
      ) {
        Id
        Title
        Subtitle
        Thumbnail
        Article
        Url
        LineUrl
        TwitterUrl
        YoutubeUrl
        InstagramUrl
        Category
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
			Title,
			Subtitle,
			Thumbnail,
			Article,
			Url,
			LineUrl,
			TwitterUrl,
			YoutubeUrl,
			InstagramUrl,
			Category,
			PublishStatus,
			Order: Order,
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
	UpdateOrganizationContent (
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

export function deleteOrganizationContent({ Id }) {
	const query = `
    mutation ($Id: String!) {
		DeleteOrganizationContent(Id: $Id) {
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
