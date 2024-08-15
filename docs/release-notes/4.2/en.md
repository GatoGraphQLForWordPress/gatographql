# Release Notes: 4.2

## Improvements

- Validate `assign_terms` capability on `setCategory` and `setTag` mutations ([#2772](https://github.com/GatoGraphQL/GatoGraphQL/pull/2772))
- Added predefined persisted queries: ([#2774](https://github.com/GatoGraphQL/GatoGraphQL/pull/2774))
  - Create missing translation categories for Polylang
  - Create missing translation tags for Polylang
  - Translate categories for Polylang
  - Translate tags for Polylang
  - Translate categories for MultilingualPress
  - Translate tags for MultilingualPress
- Added translation language mapping to persisted queries ([#2775](https://github.com/GatoGraphQL/GatoGraphQL/pull/2775))

### Added mutations for categories ([#2764](https://github.com/GatoGraphQL/GatoGraphQL/pull/2764))

It is now possible to create, update and delete post categories, with the newly-added mutations:

- `Root.createPostCategory`
- `Root.updatePostCategory`
- `Root.deletePostCategory`
- `PostCategory.update`
- `PostCategory.delete`

And also custom categories, with the newly-added mutations:

- `Root.createCategory`
- `Root.updateCategory`
- `Root.deleteCategory`
- `GenericCategory.update`
- `GenericCategory.delete`

This query creates, updates and deletes post category terms:

```graphql
mutation CreateUpdateDeletePostCategories {
  createPostCategory(input: {
    name: "Some name"
    slug: "Some slug"
    description: "Some description"
  }) {
    status
    errors {
      __typename
      ...on ErrorPayload {
        message
      }
    }
    category {
      ...PostCategoryData
    }
  }

  updatePostCategory(input: {
    id: 1
    name: "Some updated name"
    slug: "Some updated slug"
    description: "Some updated description"
  }) {
    status
    errors {
      __typename
      ...on ErrorPayload {
        message
      }
    }
    category {
      ...PostCategoryData
    }
  }

  deletePostCategory(input: {
    id: 1
  }) {
    status
    errors {
      __typename
      ...on ErrorPayload {
        message
      }
    }
  }
}

fragment PostCategoryData on PostCategory {
  id
  name
  slug
  description
  parent {
    id
  }
}
```

This query creates, updates and deletes category terms for a custom `some-cat-taxonomy` category:

```graphql
mutation CreateUpdateDeleteCategories {
  createCategory(input: {
    taxonomy: "some-cat-taxonomy",
    name: "Some name"
    slug: "Some slug"
    description: "Some description"
  }) {
    status
    errors {
      __typename
      ...on ErrorPayload {
        message
      }
    }
    category {
      ...CategoryData
    }
  }

  updateCategory(input: {
    id: 1
    taxonomy: "some-cat-taxonomy"
    name: "Some updated name"
    slug: "Some updated slug"
    description: "Some updated description"
  }) {
    status
    errors {
      __typename
      ...on ErrorPayload {
        message
      }
    }
    category {
      ...CategoryData
    }
  }

  deleteCategory(input: {
    id: 1
    taxonomy: "some-cat-taxonomy"
  }) {
    status
    errors {
      __typename
      ...on ErrorPayload {
        message
      }
    }
  }
}

fragment CategoryData on Category {
  id
  name
  slug
  description
  parent {
    id
  }
}
```

### Added mutations for tags ([#2765](https://github.com/GatoGraphQL/GatoGraphQL/pull/2765))

It is now possible to create, update and delete post tags, with the newly-added mutations:

- `Root.createPostTag`
- `Root.updatePostTag`
- `Root.deletePostTag`
- `PostTag.update`
- `PostTag.delete`

And also custom tags, with the newly-added mutations:

- `Root.createTag`
- `Root.updateTag`
- `Root.deleteTag`
- `GenericTag.update`
- `GenericTag.delete`

This query creates, updates and deletes post category terms:

```graphql
mutation CreateUpdateDeletePostTags {
  createPostTag(input: {
    name: "Some name"
    slug: "Some slug"
    description: "Some description"
  }) {
    status
    errors {
      __typename
      ...on ErrorPayload {
        message
      }
    }
    category {
      ...PostTagData
    }
  }

  updatePostTag(input: {
    id: 1
    name: "Some updated name"
    slug: "Some updated slug"
    description: "Some updated description"
  }) {
    status
    errors {
      __typename
      ...on ErrorPayload {
        message
      }
    }
    category {
      ...PostTagData
    }
  }

  deletePostTag(input: {
    id: 1
  }) {
    status
    errors {
      __typename
      ...on ErrorPayload {
        message
      }
    }
  }
}

fragment PostTagData on PostTag {
  id
  name
  slug
  description
}
```

This query creates, updates and deletes category terms for a custom `some-tag-taxonomy` category:

```graphql
mutation CreateUpdateDeleteTags {
  createTag(input: {
    taxonomy: "some-tag-taxonomy",
    name: "Some name"
    slug: "Some slug"
    description: "Some description"
  }) {
    status
    errors {
      __typename
      ...on ErrorPayload {
        message
      }
    }
    category {
      ...TagData
    }
  }

  updateTag(input: {
    id: 1
    taxonomy: "some-tag-taxonomy"
    name: "Some updated name"
    slug: "Some updated slug"
    description: "Some updated description"
  }) {
    status
    errors {
      __typename
      ...on ErrorPayload {
        message
      }
    }
    category {
      ...TagData
    }
  }

  deleteTag(input: {
    id: 1
    taxonomy: "some-tag-taxonomy"
  }) {
    status
    errors {
      __typename
      ...on ErrorPayload {
        message
      }
    }
  }
}

fragment TagData on Tag {
  id
  name
  slug
  description
}
```

## [PRO] Improvements

### Define the Polylang language on tag and category mutations

With the **Polylang integration**, when creating a tag or category (see above), we can pass `polylangLanguageBy` input to already define its language.

For instance, this query creates a post category, and defines its language as Spanish:

```graphql
mutation {
  createPostCategory(input: {
    name: "Noticias"
    polylangLanguageBy: { code: "es" }
  }) {
    status
    errors {
      __typename
      ...on ErrorPayload {
        message
      }
    }
    category {
      polylangLanguage {
        locale
      }
      name
    }
  }
}
```

### Automation: Store the GraphQL response in the info logs

The complete GraphQL response for an automation execution (for both WP-Cron and Automation Rules, whether the execution was successful or not) is logged under file `wp-content/gatographql/logs/info.log`.

### Added Polylang Mutations for Media Items

PRO module **Polylang Mutations** provides mutations for the integration with the [Polylang](https://wordpress.org/plugins/polylang/) plugin.

The GraphQL schema has been augmented with mutations to:

- Establish the language for media items, and
- Define associations among them (i.e. indicate that a set of media items is a translation for each other).

| Mutation | Description |
| --- | --- |
| `polylangSetMediaItemLanguage` | Set the language of the media item. |
| `polylangSaveMediaItemTranslationAssociation` | Set the translation association for the media item. |

For instance, the following query defines the language for 3 media items (to English, Spanish and French), and then defines that these 3 media items are a translation of each other:

```graphql
mutation {
  mediaItem1: polylangSetMediaItemLanguage(input: {id: 1007, languageBy: { code: "en" }}) {
    status
    errors {
      __typename
      ...on ErrorPayload {
        message
      }
    }
  }
  mediaItem2: polylangSetMediaItemLanguage(input: {id: 204, languageBy: { code: "es" }}) {
    status
    errors {
      __typename
      ...on ErrorPayload {
        message
      }
    }
  }
  mediaItem3: polylangSetMediaItemLanguage(input: {id: 377, languageBy: { code: "fr" }}) {
    status
    errors {
      __typename
      ...on ErrorPayload {
        message
      }
    }
  }
  polylangSaveMediaItemTranslationAssociation(input: {
    ids: [1007, 204, 377]
  }) {
    status
    errors {
      __typename
      ...on ErrorPayload {
        message
      }
    }
  }
}
```

### Map additional WordPress hooks for Automation

WordPress hooks that create, update and delete meta values have been mapped to Gato GraphQL automation hooks, containing the meta key as part of the hook name, so they can be referenced directly within an automation rule.

This makes it easier to capture and automate specific events, such as the assigning of a featured image to a post, which is based on meta key `_thumbnail_id`. Then, the automation can be triggered on event `gatographql:updated_post_meta:_thumbnail_id`.

In addition, `set_object_terms` was mapped, including the `taxonomy` as part of the hook name.

These are the added hook mappings:

| WordPress hook | Mapped hook by Gato GraphQL |
| --- | --- |
| [`added_{$meta_type}_meta`](https://developer.wordpress.org/reference/hooks/added_meta_type_meta/) | `gatographql:added_{$meta_type}_meta:{$meta_key}` |
| [`updated_{$meta_type}_meta`](https://developer.wordpress.org/reference/hooks/updated_meta_type_meta/) | `gatographql:updated_{$meta_type}_meta:{$meta_key}` |
| [`deleted_{$meta_type}_meta`](https://developer.wordpress.org/reference/hooks/deleted_meta_type_meta/) | `gatographql:deleted_{$meta_type}_meta:{$meta_key}` |
| [`set_object_terms`](https://developer.wordpress.org/reference/hooks/set_object_terms/) | `gatographql:set_object_terms:{$taxonomy}` |

### [PRO] Filter entities by Polylang's DEFAULT language

It's now possible to filter entities by default language set on Polylang, by providing the `DEFAULT` enum value on the `polylangLanguagesBy` filter:

```graphql
{
  posts(
    filter: {
      polylangLanguagesBy: {
        predefined: DEFAULT
      }
    }
  ) {
    title
    polylangLanguage {
      code
    }
  }

  pages(
    filter: {
      polylangLanguagesBy: {
        predefined: DEFAULT
      }
    }
  ) {
    title
    polylangLanguage {
      code
    }
  }

  customPosts(
    filter: {
      polylangLanguagesBy: {
        predefined: DEFAULT
      }
      customPostTypes: "dummy-cpt"
    }
  ) {
    title
    polylangLanguage {
      code
    }
  }
}
```