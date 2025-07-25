# Helper Function Collection

Collection of fields added to the GraphQL schema, providing useful functionality concerning URLs, date formatting, text manipulation, and others.

Helper fields are **Global Fields**, hence they are added to every single type in the GraphQL schema: in `QueryRoot`, but also in `Post`, `User`, etc.

## List of Helper Fields

This is the list of helper fields.

### `_generateRandomString`

Generate a random string.

For instance, running this query:

```graphql
{
  _generateRandomString(
    length: 24,
    characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  )
}
```

might produce:

```json
{
  "data": {
    "_generateRandomString": "BPXV1T1UJLH2S7VG3IO33FUP"
  }
}
```

### `_objectConvertToNameValueEntryList`

Retrieve the properties from a JSON object to create a list of JSON entries.

This field is used to transform a `JSONObject` output from some field, into a `[JSONObject]` that is input into another field.

For instance, the response from `_httpRequestHeaders` (from the **HTTP Request via Schema** extension) is a `StringValueJSONObject`, and the headers passed as input in `_sendHTTPRequest` are `[HTTPRequestOptionHeaderInput!]`, with each `HTTPRequestOptionHeaderInput` having shape:

```json
{
  "name": "...",
  "value": "..."
}
```

Then, the following query allows to bridge between output and input:

```graphql
{
  headers: _httpRequestHeaders
  headersInput: _objectConvertToNameValueEntryList(
    object: $__headers
  )
  _sendHTTPRequest(
    input: {
      url: "...",
      options: {
        headers: $__headersInput
      }
    }
  ) {
    # ...
  }
}
```

### `_objectSpreadIDListValueAndFlip`

Given a JSON object with ID as key, and a list of IDs as value, flip it into another JSON object, where each of the IDs in the list becomes the key, and the key becomes the value.

For instance, if we provide the following JSON object (mapping the IDs from a post to all of its translation posts):

```json
{
  "originPostToTranslationPostIDs": {
    "1": [3, 4, 5],
    "8": [10, 11],
    "17": [19, 20, 21]
  }
}
```

...when applying field `_objectSpreadIDListValueAndFlip`:

```graphql
query SpreadAndFlipJSONObjectIDs(
  $originPostToTranslationPostIDs: JSONObject!
) {
  translationPostToOriginPostID: _objectSpreadIDListValueAndFlip(object: $originPostToTranslationPostIDs)
}
```

the response will become:

```json
{
  "translationPostToOriginPostID": {
    "3": "1",
    "4": "1",
    "5": "1",
    "10": "8",
    "11": "8",
    "19": "17",
    "20": "17",
    "21": "17"
  }
}
```

### `_strConvertMarkdownToHTML`

Converts Markdown to HTML.

This method can help produce HTML content that is provided as input to some field or mutation. That is the case with mutation `_sendEmail` (from the **Email Sender** extension), which can send emails in HTML format.

For instance, this query uses Markdown content to produce the HTML to send in the email:

```graphql
query GetPostData($postID: ID!) {
  post(by: {id: $postID}) {
    title @export(as: "postTitle")
    excerpt @export(as: "postExcerpt")
    url @export(as: "postLink")
    author {
      name @export(as: "postAuthorName")
      url @export(as: "postAuthorLink")
    }
  }
}

query GetEmailData @depends(on: "GetPostData") {
  emailMessageTemplate: _strConvertMarkdownToHTML(
    text: """

There is a new post by [{$postAuthorName}]({$postAuthorLink}):

**{$postTitle}**: {$postExcerpt}

[Read online]({$postLink})

    """
  )
  emailMessage: _strReplaceMultiple(
    search: ["{$postAuthorName}", "{$postAuthorLink}", "{$postTitle}", "{$postExcerpt}", "{$postLink}"],
    replaceWith: [$postAuthorName, $postAuthorLink, $postTitle, $postExcerpt, $postLink],
    in: $__emailMessageTemplate
  )
    @export(as: "emailMessage")
  subject: _sprintf(string: "New post created by %s", values: [$postAuthorName])
    @export(as: "emailSubject")
}

mutation SendEmail @depends(on: "GetEmailData") {
  _sendEmail(
    input: {
      to: "target@email.com"
      subject: $emailSubject
      messageAs: {
        html: $emailMessage
      }
    }
  ) {
    status
  }
}
```

### `_strDecodeXMLAsJSON`

Decode an XML string as JSON.

This method can help process an XML string, such as an RSS feed, by converting it into a JSON object which can be manipulated by several fields in Gato GraphQL.

This query:

```graphql
{
  _strDecodeXMLAsJSON(xml: """<?xml version="1.0" encoding="UTF-8"?>
<bookstore>  
  <book category="COOKING">  
    <title lang="en">Everyday Italian</title>  
    <author>Giada De Laurentiis</author>  
    <year>2005</year>  
    <price>30.00</price>  
  </book>  
  <book category="CHILDREN">  
    <title lang="en">Harry Potter</title>  
    <author>J K. Rowling</author>  
    <year>2005</year>  
    <price>29.99</price>  
  </book>  
  <book category="WEB">  
    <title lang="en">Learning XML</title>  
    <author>Erik T. Ray</author>  
    <year>2003</year>  
    <price>39.95</price>  
  </book>  
</bookstore>
  """)
}
```

...will produce:

```json
{
  "data": {
    "_strDecodeXMLAsJSON": {
      "bookstore": {
        "book": [
          {
            "@category": "COOKING",
            "title": {
              "@lang": "en",
              "_": "Everyday Italian"
            },
            "author": "Giada De Laurentiis",
            "year": "2005",
            "price": "30.00"
          },
          {
            "@category": "CHILDREN",
            "title": {
              "@lang": "en",
              "_": "Harry Potter"
            },
            "author": "J K. Rowling",
            "year": "2005",
            "price": "29.99"
          },
          {
            "@category": "WEB",
            "title": {
              "@lang": "en",
              "_": "Learning XML"
            },
            "author": "Erik T. Ray",
            "year": "2003",
            "price": "39.95"
          }
        ]
      }
    }
  }
}
```

### `_strParseCSV`

Parse a CSV string into a list of JSON objects.

This field will take a CSV as input, and convert it into a format that can be extracted, iterated and manipulated using other function fields.

For instance, this query:

```graphql
{
  _strParseCSV(
    string: """Year,Make,Model,Description,Price
1997,Ford,E350,"ac, abs, moon",3000.00
1999,Chevy,"Venture ""Extended Edition"" (2008)","",4900.00
1999,Chevy,"Venture ""Extended Edition, Very Large"" (2008)","",5000.00
1996,Jeep,Grand Cherokee,"MUST SELL!
air, moon roof, loaded",4799.00"""
  )
}
```

...will produce:

```json
{
  "data": {
    "_strParseCSV": [
      {
        "Year": "1997",
        "Make": "Ford",
        "Model": "E350",
        "Description": "ac, abs, moon",
        "Price": "3000.00"
      },
      {
        "Year": "1999",
        "Make": "Chevy",
        "Model": "Venture \"Extended Edition\" (2008)",
        "Description": "",
        "Price": "4900.00"
      },
      {
        "Year": "1999",
        "Make": "Chevy",
        "Model": "Venture \"Extended Edition, Very Large\" (2008)",
        "Description": "",
        "Price": "5000.00"
      },
      {
        "Year": "1996",
        "Make": "Jeep",
        "Model": "Grand Cherokee",
        "Description": "MUST SELL!\nair, moon roof, loaded",
        "Price": "4799.00"
      }
    ]
  }
}
```

### `_dataMatrixOutputAsCSV`

Output data as a CSV.

This field will take a matrix of data, and produce a CSV string. This string can then be uploaded to the Media Library, or uploaded to an S3 bucket or FileStack, or other.

For instance, this query:

```graphql
csv: _dataMatrixOutputAsCSV(
  fields: 
    ["Name", "Surname", "Year"]
  data: [
    ["John", "Smith", 2003],
    ["Pedro", "Gonzales", 2012],
    ["Manuel", "Perez", 2008],
    ["Jose", "Pereyra", 1999],
    ["Jacinto", "Bloomberg", 1998],
    ["Jun-E", "Song", 1983],
    ["Juan David", "Santamaria", 1943],
    ["Luis Miguel", null, 1966],
  ]
)
```

...will produce:

```json
{
  "data": {
    "csv": "Name,Surname,Year\nJohn,Smith,2003\nPedro,Gonzales,2012\nManuel,Perez,2008\nJose,Pereyra,1999\nJacinto,Bloomberg,1998\nJun-E,Song,1983\nJuan David,Santamaria,1943\nLuis Miguel,,1966\n"
  }
}
```

### `_urlAddParams`

Adds params to a URL.

The parameters input is a `JSONObject` of `param name => value`, allowing us to pass values of multiple types, including `String`, `Int`, List (eg: `[String]`) and also `JSONObject`.

This query:

```graphql
{
  _urlAddParams(
    url: "https://gatographql.com",
    params: {
      stringParam: "someValue",
      intParam: 5,
      stringListParam: ["value1", "value2"],
      intListParam: [8, 9, 4],
      objectParam: {
        "1st": "1stValue",
        "2nd": 2,
        "3rd": ["uno", 2.5]
        "4th": {
          nestedIn: "nestedOut"
        }
      }
    }
  )
}
```

...produces:

```json
{
  "data": {
    "_urlAddParams": "https:\/\/gatographql.com?stringParam=someValue&intParam=5&stringListParam%5B0%5D=value1&stringListParam%5B1%5D=value2&intListParam%5B0%5D=8&intListParam%5B1%5D=9&intListParam%5B2%5D=4&objectParam%5B1st%5D=1stValue&objectParam%5B2nd%5D=2&objectParam%5B3rd%5D%5B0%5D=uno&objectParam%5B3rd%5D%5B1%5D=2.5&objectParam%5B4th%5D%5BnestedIn%5D=nestedOut"
  }
}
```

(The decoded URL is `"https://gatographql.com?stringParam=someValue&intParam=5&stringListParam[0]=value1&stringListParam[1]=value2&intListParam[0]=8&intListParam[1]=9&intListParam[2]=4&objectParam[1st]=1stValue&objectParam[2nd]=2&objectParam[3rd][0]=uno&objectParam[3rd][1]=2.5&objectParam[4th][nestedIn]=nestedOut"`.)

Please notice that `null` values are not added to the URL.

This query:

```graphql
{
  _urlAddParams(
    url: "https://gatographql.com",
    params: {
      stringParam: null,
      listParam: [1, null, 3],
      objectParam: {
        uno: null,
        dos: 2
      }
    }
  )
}
```

...produces:

```json
{
  "data": {
    "_urlAddParams": "https:\/\/gatographql.com?listParam%5B0%5D=1&listParam%5B2%5D=3&objectParam%5Bdos%5D=2"
  }
}
```

(The decoded URL is `"https://gatographql.com?listParam[0]=1&listParam[2]=3&objectParam[dos]=2"`.)

### `_urlRemoveParams`

Removes params from a URL.

This query:

```graphql
{
  _urlRemoveParams(
    url: "https://gatographql.com/?existingParam=existingValue&stringParam=originalValue&stringListParam[]=firstVal&stringListParam[]=secondVal&stringListParam[]=thirdVal",
    names: [
      "existingParam"
      "stringParam"
      "stringListParam"
    ]
  )
}
```

...produces:

```json
{
  "data": {
    "_urlRemoveParams": "https:\/\/gatographql.com\/"
  }
}
```

### `_arrayDeepFlatten`

Extract all values from a mixed array containing single values, arrays, and objects, up to their deepest level, and return them as a flattened array.

This field is similar to `_arrayFlatten`, but it handles mixed types and recursively flattens nested structures at any depth. It can process:

- Single values (strings, numbers, booleans, null)
- Arrays (recursively flattened)
- Objects (converted to arrays and flattened)

This query:

```graphql
{
  _arrayDeepFlatten(array: [
    "single string",
    ["array", "of", "strings"],
    {
      key1: "value1",
      key2: "value2"
    },
    42,
    true,
    null,
    ["nested", ["deep", "array"]],
    {
      nested: {
        inner: "value"
      }
    }
  ])
}
```

...produces:

```json
{
  "data": {
    "_arrayDeepFlatten": [
      "single string",
      "array",
      "of",
      "strings",
      "value1",
      "value2",
      42,
      true,
      null,
      "nested",
      "deep",
      "array",
      "value"
    ]
  }
}
```

### `_arrayFlatten`

Flatten an array of arrays into an array.

This query:

```graphql
{
  _arrayFlatten(array: [
    [
      {
        "id": 2302,
        "url": "https://mysite.com/media/143"
      }
    ],
    [
      {
        "id": 2303,
        "url": "https://mysite.com/media/146"
      },
      {
        "id": 2304,
        "url": "https://mysite.com/media/147"
      },
    ]
  ])
}
```

...produces:

```json
{
  "data": {
    "_arrayFlatten": [
      {
        "id": 2302,
        "url": "https://mysite.com/media/143"
      },
      {
        "id": 2303,
        "url": "https://mysite.com/media/146"
      },
      {
        "id": 2304,
        "url": "https://mysite.com/media/147"
      }
    ]
  }
}
```

### `_arrayGenerateAllCombinationsOfItems`

Combine the elements in the arrays, extracting one item from each array and merging it with all others, under the corresponding label.

This query:

```graphql
{
  dataCombinations: _arrayGenerateAllCombinationsOfItems(labelItems: [
    {
      label: "person",
      items: ["Sam", "Eric"]
    },
    {
      label: "location",
      items: ["Paris", "Rome"]
    },
    {
      label: "meal",
      items: ["Pasta", "Bagel"]
    }
  ])
}
```

...produces:

```json
{
  "data": {
    "dataCombinations": [
      {
        "person": "Sam",
        "location": "Paris",
        "meal": "Pasta"
      },
      {
        "person": "Sam",
        "location": "Paris",
        "meal": "Bagel"
      },
      {
        "person": "Sam",
        "location": "Rome",
        "meal": "Pasta"
      },
      {
        "person": "Sam",
        "location": "Rome",
        "meal": "Bagel"
      },
      {
        "person": "Eric",
        "location": "Paris",
        "meal": "Pasta"
      },
      {
        "person": "Eric",
        "location": "Paris",
        "meal": "Bagel"
      },
      {
        "person": "Eric",
        "location": "Rome",
        "meal": "Pasta"
      },
      {
        "person": "Eric",
        "location": "Rome",
        "meal": "Bagel"
      }
    ]
  }
}
```

### `_arrayOfJSONObjectsExtractPropertiesAndConvertToObject`

Given an array of JSON objects, with all of them having two common properties (such as `name` and `value`), extract the values of these properties and create a JSON object, with one property as the key and the other one as the value.

This query:

```graphql
{
  arrayToObject: _arrayOfJSONObjectsExtractPropertiesAndConvertToObject(
    array: [
      {
        label: "person",
        items: ["Sam", "Eric"]
      },
      {
        label: "location",
        items: ["Paris", "Rome"]
      },
      {
        label: "meal",
        items: ["Pasta", "Bagel"]
      }
    ],
    key: "label",
    value: "items"
  )
}
```

...produces:

```json
{
  "data": {
    "arrayToObject": {
      "person": ["Sam", "Eric"],
      "location": ["Paris", "Rome"],
      "meal": ["Pasta", "Bagel"]
    }
  }
}
```

### `_arrayOfJSONObjectsExtractProperty`

Given an array of JSON objects, with all of them having a common property, extract the value of this property and replace it as elements on the array.

This query:

```graphql
{
  arrayOfProperties: _arrayOfJSONObjectsExtractProperty(
    array: [
      {
        label: "person",
        items: ["Sam", "Eric"]
      },
      {
        label: "location",
        items: ["Paris", "Rome"]
      },
      {
        label: "meal",
        items: ["Pasta", "Bagel"]
      }
    ],
    key: "label"
  )
}
```

...produces:

```json
{
  "data": {
    "arrayOfProperties": ["person", "location", "meal"]
  }
}
```

## Examples

In combination with extensions **HTTP Request via Schema** and **Field to Input**, we can retrieve the currently-requested URL when executing a GraphQL custom endpoint or persisted query, add extra parameters, and send another HTTP request to the new URL.

For instance, in this query, we retrieve the IDs of the users in the website and execute a new GraphQL query passing their ID as parameter:

```graphql
{
  users {
    userID: id
    url: _urlAddParams(
      url: "https://somewebsite.com/endpoint/user-data",
      params: {
        userID: $__userID
      }
    )
    headers: _httpRequestHeaders
    headerNameValueEntryList: _objectConvertToNameValueEntryList(
      object: $__headers
    )
    _sendHTTPRequest(input: {
      url: $__url
      options: {
        headers: $__headerNameValueEntryList
      }
    }) {
      statusCode
      contentType
      body
    }
  }
}
```
