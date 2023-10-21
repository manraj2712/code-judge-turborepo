# CodeStreax - Turborepo of a leetcode clone

The Online Code Execution and Assessment Platform for coding practice and automated code assessment. It provides users with a secure and isolated environment to write, execute, and assess code in real-time.

![Screenshot (52)](https://github.com/manraj2712/code-judge-turborepo/assets/65106261/df2d2b51-7e5b-44ea-892d-ff53e5bec0a9)

## Technologies Used

- **Front-end:** Next.js 13
- **Styling:** Tailwind
- **User Authentication:** NextAuth.js
- **Database:** PostgreSQL with Prisma as the ORM
- **Backend:** Node.js and Express.js
- **Containerization:** Docker

## Getting Started

To get a local copy up and running, please follow these simple steps.

**Prerequisites**

Here is what you need to be able to run CodeStreax

- Node.js (Version: >=18.x)
- PostgreSQL
- Yarn (recommended)

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/manraj2712/code-judge-turborepo.git
   ```

2. **Install Dependencies:**
   ```bash
   cd code-judge-turborepo
   yarn install
    ```
3. **Set Up Environment Variables:**
   ```bash
   cp .env.example .env
    ```
4. **Quick start with** `yarn dx`

> - **Requires Docker and Docker Compose to be installed**
> - Will start a local Postgres instance with a few test users - the credentials will be logged in the console

```sh
yarn dx
```



