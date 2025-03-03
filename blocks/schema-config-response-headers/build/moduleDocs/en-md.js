(globalThis.webpackChunkschema_config_response_headers=globalThis.webpackChunkschema_config_response_headers||[]).push([[882],{409:e=>{e.exports='<h1 id="response-headers">Response Headers</h1> <p>Provide custom headers to add to the API response.</p> <h2 id="description">Description</h2> <p>Configure what custom headers will be added to the GraphQL response, including:</p> <ul> <li><code>Access-Control-Allow-Origin</code> to support CORS</li> <li><code>Access-Control-Allow-Headers</code> to support clients providing data via headers</li> <li>any other</li> </ul> <h2 id="defining-the-response-headers">Defining the Response Headers</h2> <p>The response headers can be configured in 2 places.</p> <p>In the Schema Configuration applied to the endpoint under block &quot;Response Headers&quot;, by selecting option <code>&quot;Use custom configuration&quot;</code> and then providing the desired headers (at one entry per line), with format <code>{header name}: {header value}</code>.</p> <p>For instance, provide value:</p> <pre><code class="hljs language-apacheconf"><span class="hljs"><span class="hljs-attribute">Access</span>-Control-<span class="hljs-literal">Allow</span>-Origin: https://mysite.com\n<span class="hljs-attribute">Access</span>-Control-<span class="hljs-literal">Allow</span>-Headers: content-type,content-length,accept</span></code></pre> <div class="img-width-610" markdown="1"> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/11.1.0/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/response-headers/../../images/schema-configuration-response-headers.png" alt="Providing Response Headers in the Schema Configuration" title="Providing Response Headers in the Schema Configuration"></p> </div> <p>Otherwise, the value defined in the Settings page for <code>Response Headers</code> is used:</p> <div class="img-width-1024" markdown="1"> <p><img src="https://raw.githubusercontent.com/GatoGraphQL/GatoGraphQL/11.1.0/layers/GatoGraphQLForWP/plugins/gatographql/docs/modules/response-headers/../../images/settings-response-headers.webp" alt="Providing Response Headers in the Settings" title="Providing Response Headers in the Settings"></p> </div> '}}]);