# special-chainsaw

Backend Engineer test

## 📞 Requests

Inside the code there's a file called `Insomnia_2022-07-31.json`.

Import it in [Insomnia](https://insomnia.rest). It's a REST client like Postman... but better 😆.

## 🚀 Running the code

Copy and paste the `.env` file. Replace the values with one that works for you.

### 🛠 Development

- Make sure you have an instance of MongoDB running and put the connection URI into the `.env` file. 🍃

- Install the dependencies. 📦

```sh
npm i
```

- Run the app. 🏎

```sh
npm run dev
```

### 🐳 Docker

Just run:

```sh
docker compose up
```

> 🗑 If you experience problems try to delete previous images. `docker system prune -a`
