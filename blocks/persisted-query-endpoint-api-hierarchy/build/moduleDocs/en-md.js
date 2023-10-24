(window.webpackJsonpGatoGraphQLPersistedQueryEndpointAPIHierarchy=window.webpackJsonpGatoGraphQLPersistedQueryEndpointAPIHierarchy||[]).push([[2],{51:function(e,i){e.exports='<h1 id="api-hierarchy">API Hierarchy</h1> <p>Persisted queries and custom endpoints can declare a parent, from which it can inherit its properties:</p> <ul> <li>Its schema configuration</li> </ul> <p>For persisted queries, it will also inherit:</p> <ul> <li>Its GraphQL query</li> <li>The query variables, but these can also be independently overriden</li> </ul> <p>The child custom endpoint and persisted query will include, within their endpoint, the full path of its ancestor endpoint(s), such as <code>/graphql-query/posts/mobile-app/</code>.</p> <h2 id="description">Description</h2> <p>Inheritance is useful for creating a hierarchy of API endpoints, such as:</p> <ul> <li><code>/graphql-query/posts/mobile-app/</code></li> <li><code>/graphql-query/posts/website/</code></li> </ul> <p>The number of levels is unlimited, so we can also create:</p> <ul> <li><code>/graphql-query/posts/mobile-app/english/</code></li> <li><code>/graphql-query/posts/mobile-app/french/</code></li> <li><code>/graphql-query/posts/website/english/</code></li> <li><code>/graphql-query/posts/website/french/</code></li> </ul> <p>Children persisted queries can override variables defined in the parent query. For instance, variable <code>$limit</code> is defined in the parent, and overriden in the child:</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/1.0.11/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/api-hierarchy/../../images/parent-persisted-query.png" alt="Parent persisted query" title="Parent persisted query"></p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/1.0.11/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/api-hierarchy/../../images/child-persisted-query.png" alt="Child persisted query" title="Child persisted query"></p> <h2 id="how-to-use">How to use</h2> <p>In the custom endpoint or persisted query, in the Document settings, there is section <code>Page Attributes</code> with a dropdown of all other entities, to select as the parent:</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/1.0.11/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/api-hierarchy/../../images/api-inheritance.png" alt="API inheritance" title="API inheritance"></p> <p>When selected, in the Options of the persisted query we can choose to inherit the parent&#39;s query:</p> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/1.0.11/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/api-hierarchy/../../images/api-inheritance.gif" alt="API inheritance" title="API inheritance"></p> <p>Different strategies can be applied to create the API hierarchy.</p> <p>For persisted queries, we can define the GraphQL query only on the parent (in this case, called <code>posts</code>), and then each child persisted query (in this case, <code>mobile-app</code> and <code>website</code>) will obtain the query from the parent, and define only the schema configuration:</p> <ul> <li><code>/graphql-query/posts/mobile-app/</code></li> <li><code>/graphql-query/posts/website/</code></li> </ul> <p>Alternatively, we can declare the configuration at the parent level, and then all children implement only the GraphQL query:</p> <ul> <li><code>/graphql-query/mobile-app/posts/</code></li> <li><code>/graphql-query/mobile-app/users/</code></li> <li><code>/graphql-query/website/posts/</code></li> <li><code>/graphql-query/website/users/</code></li> </ul> \x3c!-- ## Resources\n\nVideo showing how to create an API hierarchy, and override the variables defined in the parent query: <a href="https://vimeo.com/413503010" target="_blank">vimeo.com/413503010</a>. --\x3e '}}]);