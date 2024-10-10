# Backend Intern Assignment

## File Structure
<!-- <details> -->
  <!-- <summary>Click to expand file structure</summary> -->

  ```plaintext
  backend-mvc/
  ├── .github/
  │   └── workflows/
  │       ├── build.yml
  │       └── deploy.yml
  ├── dist/
  ├── node_modules/
  ├── src/
  │   ├── db/
  │   │   └── index.ts
  │   ├── routes/
  │   │   ├── background-job.ts
  │   │   ├── index.ts
  │   │   └── jobs.ts
  │   └── index.ts
  ├── .env
  ├── .gitignore
  ├── docker-compose.yml
  ├── dockerfile
  ├── package.json
  ├── README.md
  └── tsconfig.json
 ```
 <br>
 
## Route for task 2
```python
https://assignment1.sudheer.tech/api/vi/jobs/stats?coin=<coin_id>
```
replace <coin_id> with specific coin id

## Route for task 3
```python
https://assignment1.sudheer.tech/api/vi/jobs/deviation?coin=<coin_id>
```
replace <coin_id> with specific coin id
