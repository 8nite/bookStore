<p class="has-line-data" data-line-start="0" data-line-end="1">Do not expose order-api and book-api for public access, should only be called by user-api</p>
<p class="has-line-data" data-line-start="2" data-line-end="7">Note<br>
- This project is not production ready<br>
- usually .env is included in gitignore but for non production purposes will keep it here for convenience<br>
- there are no schema checking for mongo, alternatively I have used test cases for schema ensure. (faster development when new attributes need to be added)<br>
- usually will have each micro-services in each single repo</p>
<p class="has-line-data" data-line-start="8" data-line-end="16">Nice to have features…<br>
- add signature from FE to BE calls, prevents other parties calling<br>
- user journey (ie: login, preferences, liked books…)<br>
- more loggings (for product support)<br>
- keep transactions in our own DB<br>
- cornjob for payment status checking<br>
- swagger page (for openAPI)<br>
- etc.</p>
<p class="has-line-data" data-line-start="17" data-line-end="21"><mark><mark><mark><mark><mark><mark><mark><mark><mark>ARCHITECTURE</mark></mark></mark></mark></mark></mark></mark></mark></mark><br>
FE -&gt; user-api  -&gt; ordert-api   -&gt; DB (transactions)<br>
                                                     -&gt; stripe payment system<br>
                            -&gt; book-api     -&gt; DB (books)</p>
<p class="has-line-data" data-line-start="23" data-line-end="26"><mark><mark><mark><mark><mark><mark><mark><mark><mark>QUICK START</mark></mark></mark></mark></mark></mark></mark></mark></mark><br>
PREREQUISITE<br>
- node v16.15.1</p>
<p class="has-line-data" data-line-start="27" data-line-end="30">/book-api<br>
- yarn install<br>
- yarn start</p>
<p class="has-line-data" data-line-start="31" data-line-end="34">/order-api<br>
- yarn install<br>
- yarn start</p>
<p class="has-line-data" data-line-start="35" data-line-end="38">/user-api<br>
- yarn install<br>
- yarn start</p>
<p class="has-line-data" data-line-start="39" data-line-end="42">/FE<br>
- yarn install<br>
- yarn start</p>
<p class="has-line-data" data-line-start="43" data-line-end="44">after, go to <a href="http://localhost:3000">http://localhost:3000</a> in browser</p>
<p class="has-line-data" data-line-start="45" data-line-end="46">NOTE: for production please build and use serve to start</p>