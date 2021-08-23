DabbleLab Assignment Setup Steps
===============================
1. Clone this repository or download zip file from main/master branch
2. Run **npm install** in project root directory
3. Run **npm install -g nodemon** to install nodemon globally
4. Copy .env.example to .env and change password to new password(provided in email)
5. Run **nodemon index.js** to start server
6. Visit **http://localhost:3477/graphql** to test assignment

Demo Video
===============================
Link -- https://nimb.ws/2LJq3X

Sample Test Exmaple
===============================
- Get all Entries
```
{
  populations
}
```
- Fetch by Country Name
```
{
  populationByCountry(country:"Albania")
}
```
- Fetch by Year
```
{
  populationByYear(year:"2021")
}
```
- Add new Entry
```
mutation{
  addPopulation(country:"India", year:"2020", area_km:"1234", total_population:"4321")
}
```