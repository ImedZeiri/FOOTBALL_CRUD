# Football CRUD Application

This is a full-stack application with Symfony backend and Angular frontend for managing football players.

## Prerequisites

- PHP 7.4
- Composer
- Symfony CLI
- Node.js 18
- Angular CLI
- MySQL/MariaDB

## Backend Setup

1. Navigate to the backend directory:
```bash
cd Backend_Server
```

2. Install dependencies:
```bash
composer install
```

3. Configure database connection in `.env`:
```dotenv
DATABASE_URL="mysql://root:@127.0.0.1:3306/football_crud_db?serverVersion=mariadb-10.4.11"
```

4. Create database (if not exists):
```bash
php bin/console doctrine:database:create
```

5. Run migrations:
```bash
php bin/console doctrine:migrations:migrate
```

6. Start Symfony server:
```bash
symfony server:start
```

The backend will be available at: `http://localhost:8000`

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd Client_App
```

2. Install dependencies:
```bash
npm install
```

3. Start Angular development server:
```bash
ng serve
```


The frontend will be available at: `http://localhost:4200`

## Environment Variables

Backend requires these JWT variables in `.env`:
```dotenv
JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
JWT_PASSPHRASE=your_passphrase_here
```


