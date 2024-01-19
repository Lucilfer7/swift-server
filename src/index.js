import app from "./middleware.js";
import authorRouter from "./routes/authors.routes.js";
import collectionRouter from "./routes/collection.routes.js";
import genreRouter from "./routes/genre.routes.js";
import publisherRouter from "./routes/publisher.routes.js";
const PORT = 8080;

app.use(authorRouter);
app.use(collectionRouter);
app.use(genreRouter);
app.use(publisherRouter);

app.listen(PORT, () => {
  console.log(`El servidor Express está funcionando en el puerto ${PORT}`);
});
