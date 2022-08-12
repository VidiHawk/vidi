import React from 'react'
import { Helmet } from 'react-helmet-async'
import { stripTags } from './helpers'

export const OrganizationJSONLD = React.memo(function OrganizationJSONLD() {
  let rich_snippet = `{
		"@context":"https:\/\/schema.org",
		"@type":"Organization",
		"name":"vidicommerce.com",
		"description":"vidicommerce has launched its video commerce website builder. Try it out for free and start building a mobile-first ecommerce site populated with full screen videos. Tell your brand story through videos and host live streaming sessions to sell your products from your website.",
		"logo":"https:\/\/vidicommerce.com\/images\/logo.svg",
		"url":"https:\/\/vidicommerce.com",
		"email":"info@vidiren.com",
		"location":{
			"@type":"Place",
			"address":{
				"@type":"PostalAddress",
				"name":"Vidi Rendering Technologies, 8383 Wilshire Blvd, 90211 Los Angeles, California"}
			}
		}`

  return (
    <Helmet
      script={[
        {
          type: 'application/ld+json',
          innerHTML: rich_snippet,
        },
      ]}
    />
  )
})

function formatDescription(description) {
  description = description.replace(
    /<script(.*?)(.*?)[^>]*>(.*?)<\s*\/\s*script>/gm,
    '',
  )
  description = stripTags(description)
  description = description.replace(/"/g, '\\"')
  return description
}
