import React, {Fragment} from "react";
import { Helmet } from "react-helmet-async";
const favicon = require("../../public/favicon.ico");

const isProd = process.env.NODE_ENV === "production";

interface HeadProps {
  url?:string;
	description?: string;
  title?: string;
  keywords?: string;
  ogImage?: string;
  metadataWidth?: string;
  metadataHeight?: string;
  publishTime?: string;
  modifiedTime?: string;
  canonical?: string;
  ogUrl?: string;
  htmlProps?: any;
  alternateUrl?: string;
  robots?: string;
  author?: string;
  publisher?: string;
  lang?: string;
  themecolor?: string;
	children?: any;
}

function Head({
  htmlProps= '',
  url = "https://vidicommerce.com/",
  title = "Vidi Commerce Official Website | Create a Video Commerce Website",
  keywords= "video website builder, how to create a video commerce website, tell your brand story through videos, start a live-streaming session on your ecommerce site, unite your brand community on your own site, fully customizable video ecommerce web-builder, sell more products with videos, mobile-first video shopping, best video commerce builder 2021",
  description = "Vidi Commerce has launched its video commerce website builder. Try it out for free and start building a mobile-first ecommerce site populated with full screen videos. Tell your brand story through videos and host live streaming sessions to sell your products from your website.",
  lang = "en-us",
  themecolor = "#000000",
  ogImage = "images/ogImage.jpg",
  author = "Vidi Rendering Technologies",
  publisher = "Vidi Rendering Technologies",
  metadataWidth = "",
  metadataHeight = "",
  publishTime = "",
  modifiedTime = "",
  canonical = "",
  ogUrl = "",
  alternateUrl = "",
  robots = "",
	children,
}: HeadProps) {

	return (
		<Helmet>
      <html lang="en" amp  {...htmlProps} />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>
			<link rel="shortcut icon" href={favicon} type="image/x-icon" />
			{/* <link rel="apple-touch-icon" sizes="512x512" href={icon512} />
			<link rel="apple-touch-icon" sizes="192x192" href={icon192} />
			<link rel="apple-touch-icon-precomposed" href={icon192} />
			<link rel="icon" sizes="192x192" href={icon192} /> */}


			{title && <meta property="og:title" content={title} />}
			{title && <meta property="twitter:title" content={title} />}
			{ogImage && <meta property="og:image" content={ogImage} />}
			{ogImage && <meta property="twitter:image" content={ogImage} />}
			{description && <meta name="description" content={description} />}
			{description && <meta name="og:description" content={description} />}
			{description && <meta name="twitter:description" content={description} />}
			{keywords && <meta name="keywords" content={keywords}/>}
			{metadataWidth && <meta property="og:image:width" content={metadataWidth} />}
			{metadataHeight && <meta property="og:image:width" content={metadataHeight} />}
			{publishTime && <meta property="article:published_time" content={publishTime} />}
			{modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
			{canonical ? <link rel="canonical" href={canonical} /> : url && <link rel="canonical" href={url} />}
			{ogUrl ? <meta property="og:url" content={ogUrl} /> : url && <meta property="og:url" content={url} />}
			{alternateUrl && <link rel="alternate" href={alternateUrl} />}
			{robots && <meta name="robots" content={robots} />}
			{author && <meta name="author" content={author} />}
			{publisher && <meta name="publisher" content={publisher} />}
			{themecolor && <meta name="theme-color" content={themecolor}/>}


			<link rel="manifest" href="/manifest.json" />
			{children && children}
			{title && <title>{title}</title>}
		</Helmet>
	);
}

export default Head;
