# talk-marvel

# Random ideas

## Scrapping data

Mostly two sources of data: Wikipedia and Marvel Api

### Wikipedia

Has a long list of heroes, but the data is hard to get. I could get the whole
list using x-ray. Split into heroes and villains.
TODO: Number of heroes found in the Wikipedia

The API does not return clean formatted data, but a JSON of custom markup
entries. The npm infobox module does a decent job at exporting it, but it is still not
very clean.
TODO: Example of crazy markup with {{Plain list, etc

The DbPedia project is a very nice project, exposing data of all pages in
a better formatted way. But it is frozen in time and some important characters
were completly missing important data.
TODO: Show the missing data from Captain America

Wikidata is not so useful. It does not return any information about the content
of the page, just about the meta around it. The only relevant info are the list
of redirects, to extract aliases from
TODO: List of aliases for Spider-Man

There is also an unofficial project that exposes an API on the pageviews of each
Wikipedia page on the last 90 days max. Being a personal project, the response
time is quite slow, so you have to be patient when requesting it. Also, the
Wikipedia popularity is biased because of Movies and Netflix (Jessica Jones was
the most popular).

Craziest of all is that none of those resources returns the url of the image.
For that I had to manually scrap the page.

### Marvel

Marvel has an API online for the past two years. This is an awesome move on
their part but...

The API is often down. Expect it to return nothing, timeout or redirect often.
I actually even implemented an infinite loop to try until it works in my code.

But it returns some really cool piece of data. You can get the thumbnail of the
hero, a short description and the number of comics/events/series/stories he
appeared in. And that's it. No powers, no aliases, no teams, nothing. Really not
much, but high quality information.

The thing is, it does not have this information for all characters. Either
because the field is empty, or because the character does not exists in their
list. In that case, I fallback to the data I got from the Wikipedia.

But Marvel also has a website, with a lot of data on their characters. But what
is weird is that it does not use the data from their own API. Those pages
displays powers, custom image and background, specific color tint on the page.
So I decided to scrap those pages as well.

### Consolidating

Now that I have all those data from different sources, I merged them together
to build a coherent JSON record for each character and pushed it.

This is a trial and error process. The data is coming from various sources, in
various formats and need to be coherently merged together. This is really
error-prone, so this is why I've added so many tests (260 at the time of
writing).

To avoid scrapping data continuously, I also kept a local copy of all the
downloaded json and html pages. This let me run my extracting scripts over and
over again without having to do a network request everytime (and possibly exceed
my API ratio or getting banned from the websites).

## Configuring Algolia

After all this cleaning and merging, I ended up with a nice JSON record. Here is
how it works

I have a main `name` for each characters, as well as a list of `aliases`.
Sometimes, I also have the list of `secretIdentities`. Those three are the
various names under which the character may be known. I've added them to the
`attributesToIndex`, in that order of importance. I've set the `aliases` and
`secretIdentities` as `unordered` because I don't care in which position the
name is found.

I also searched into the `description` field, because it sometimes holds
valuable information on the character, and it's always nice to highlight the
matched words in it.

Finally, I let users search in the `authors`, `powers`, `species` and `teams`
lists as well. This is so users can still find heroes by typing _telepathy_ or
_flying_ without using the facets list.

Then I also defined `authors`, `powers`, `species` and `teams` as facets, so
they can be used in the sidebar to filter results. I also added `isVillain`,
`isHero` and `partners` but haven't yet used that for filtering.

I used the `comicCount`, `serieCount`, `storyCount` and `eventCount` for the
custom ranking. This puts the characters with the most stories first and looks
like a nice popularity indicator. Those data coming from the Marvel API, it
means that some of my characters do not have them. So I use the `pageviewCount`
for them, actually reverting to the Wikipedia popularity. I decided to put all
those data into the same `ranking` object to not pollute the record with too
many keys.

I also set a `distinct` on `name` because I have several characters with the
same name (but from different Marvel universe). I found it too confusing to have
the same name and picture displayed. This still let us find, for example, Miguel
O'Hara from the 2099 universe by typing "Spider man 2099".

## Hosting for free

There is only 1739 characters, which fits in a free Algolia plan (10.000
records). The website itself is built with Brunch and is just a bunch of static
files hosted on GitHub pages.

All the data is publicly available from the Wikipedia or the Marvel API and all
the tools used for the scraping are open-source.
