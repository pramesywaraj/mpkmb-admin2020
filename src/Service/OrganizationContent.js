import { fetchGraphql } from 'Utils/fetchGraphql';
import { mutationGraphql } from 'Utils/mutationGraphql';
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
          Description
          Thumbnail
          Article
          Url
          UrlFile
          LineUrl
          TwitterUrl
          YoutubeUrl
          InstagramUrl
          Email
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
	Title,
	Subtitle,
	Description,
	Thumbnail,
	Article,
	Url,
	UrlFile,
	LineUrl,
	TwitterUrl,
	YoutubeUrl,
	InstagramUrl,
	Email,
	Category,
}) {
	const query = `
    mutation (
        $Title: String!,
        $Subtitle: String,
        $Description: String,
        $Thumbnail: String,
        $Article: String,
        $Url: String,
        $UrlFile: String,
        $LineUrl: String,
        $TwitterUrl: String,
        $YoutubeUrl: String,
        $InstagramUrl: String,
        $Email: String,
        $Category: String!,
        $PublishStatus: Boolean,
        $Order: Int,
    ) {
	CreateOrganizationContent (
        Title: $Title,
        Subtitle: $Subtitle,
        Description: $Description,
        Thumbnail: $Thumbnail,
        Article: $Article,
        Url: $Url,
        UrlFile: $UrlFile,
        LineUrl: $LineUrl,
        TwitterUrl: $TwitterUrl,
        YoutubeUrl: $YoutubeUrl,
        InstagramUrl: $InstagramUrl,
        Email: $Email,
        Category: $Category,
        PublishStatus: $PublishStatus,
        Order: $Order,
      ) {
        Id
        Title
        Subtitle
        Description
        Thumbnail
        Article
        Url
        UrlFile
        LineUrl
        TwitterUrl
        YoutubeUrl
        InstagramUrl
        Email
        Category
        PublishStatus
        Order
      }
    }  
  `;

	const res = mutationGraphql({
		headers: {
			Authorization: `${Cookies.getJSON('MPKMB_ADMIN_TOKEN').Token}`,
		},
		query,
		variables: {
			Title,
			Subtitle,
			Description,
			Thumbnail,
			Article,
			Url,
			UrlFile,
			LineUrl,
			TwitterUrl,
			YoutubeUrl,
			InstagramUrl,
			Email,
			Category,
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
	Description,
	Thumbnail,
	Article,
	Url,
	UrlFile,
	LineUrl,
	TwitterUrl,
	YoutubeUrl,
	InstagramUrl,
	Email,
	Category,
	PublishStatus,
	Order,
}) {
	const query = `
    mutation (
      $Id: String!,
      $Title: String,
      $Subtitle: String,
      $Description: String,
      $Thumbnail: String,
      $Article: String,
      $Url: String,
      $UrlFile: String,
      $LineUrl: String,
      $TwitterUrl: String,
      $YoutubeUrl: String,
      $InstagramUrl: String,
      $Email: String,
      $Category: String,
      $PublishStatus: Boolean,
      $Order: Int,
    ) {
	UpdateOrganizationContent (
        Id: $Id,
        Title: $Title,
        Subtitle: $Subtitle,
        Description: $Description,
        Thumbnail: $Thumbnail,
        Article: $Article,
        Url: $Url,
        UrlFile: $UrlFile,
        LineUrl: $LineUrl,
        TwitterUrl: $TwitterUrl,
        YoutubeUrl: $YoutubeUrl,
        InstagramUrl: $InstagramUrl,
        Email: $Email,
        Category: $Category,
        PublishStatus: $PublishStatus,
        Order: $Order,
      ) {
        Id
        Title
        Subtitle
        Description
        Thumbnail
        Article
        Url
        UrlFile
        LineUrl
        TwitterUrl
        YoutubeUrl
        InstagramUrl
        Email
        Category
        PublishStatus
        Order
      }
    }  
  `;

	const res = mutationGraphql({
		headers: {
			Authorization: `${Cookies.getJSON('MPKMB_ADMIN_TOKEN').Token}`,
		},
		query,
		variables: {
			Id,
			Title,
			Subtitle,
			Description,
			Thumbnail,
			Article,
			Url,
			UrlFile,
			LineUrl,
			TwitterUrl,
			YoutubeUrl,
			InstagramUrl,
			Email,
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
